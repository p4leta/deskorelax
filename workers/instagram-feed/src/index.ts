type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

type Env = {
  INSTAGRAM_ACCESS_TOKEN: string;
  ADMIN_SYNC_SECRET: string;
  ALLOWED_ORIGINS?: string;
  INSTAGRAM_FEED_KV: KVNamespaceLike;
  INSTAGRAM_MEDIA_BUCKET: R2BucketLike;
};

type KVNamespaceLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

type R2BucketLike = {
  get(key: string): Promise<R2ObjectBodyLike | null>;
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string; cacheControl?: string } }): Promise<void>;
};

type R2ObjectBodyLike = {
  body: ReadableStream;
  httpMetadata?: {
    contentType?: string;
    cacheControl?: string;
  };
};

type InstagramApiItem = {
  id: string;
  caption?: string;
  media_type?: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

type InstagramPost = {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

type PublicFeed = {
  posts: InstagramPost[];
  stale: boolean;
  error?: string;
  meta: {
    source: "cache" | "instagram" | "empty";
    stale: boolean;
    syncedAt: string | null;
    error?: string;
  };
};

type TokenState = {
  accessToken: string;
  refreshedAt: string;
  expiresAt: string | null;
};

const FEED_KEY = "instagram:public-feed";
const TOKEN_KEY = "instagram:token";
const MEDIA_PREFIX = "instagram-media";
const MEDIA_LIMIT = 16;
const INSTAGRAM_REFRESH_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";
const INSTAGRAM_MEDIA_URL = "https://graph.instagram.com/me/media";
const INSTAGRAM_MEDIA_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

const getAllowedOrigins = (env: Env) =>
  (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const getCorsHeaders = (request: Request, env: Env) => {
  const requestOrigin = request.headers.get("Origin") ?? "";
  const allowedOrigins = getAllowedOrigins(env);
  const allowAny = allowedOrigins.includes("*");
  const allowedOrigin = allowAny ? "*" : allowedOrigins.includes(requestOrigin) ? requestOrigin : "";

  return {
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin } : {}),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const json = (request: Request, env: Env, body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getCorsHeaders(request, env),
      ...(init?.headers ?? {}),
    },
  });

const handleOptions = (request: Request, env: Env) =>
  new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, env),
  });

const getBearerToken = (request: Request) => {
  const authorization = request.headers.get("Authorization")?.trim() ?? "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
};

const assertAdmin = (request: Request, env: Env) => {
  if (!env.ADMIN_SYNC_SECRET || getBearerToken(request) !== env.ADMIN_SYNC_SECRET) {
    return json(request, env, { error: "Unauthorized" }, { status: 401 });
  }

  return null;
};

const parseJson = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const getCachedFeed = async (env: Env) => parseJson<PublicFeed>(await env.INSTAGRAM_FEED_KV.get(FEED_KEY));

const saveFeed = async (env: Env, feed: PublicFeed) => {
  await env.INSTAGRAM_FEED_KV.put(FEED_KEY, JSON.stringify(feed));
};

const getStoredToken = async (env: Env) => {
  const tokenState = parseJson<TokenState>(await env.INSTAGRAM_FEED_KV.get(TOKEN_KEY));
  return tokenState?.accessToken || env.INSTAGRAM_ACCESS_TOKEN;
};

const getExpiryTimestamp = (expiresIn?: number) => {
  if (!expiresIn) {
    return null;
  }

  return new Date(Date.now() + expiresIn * 1000).toISOString();
};

const refreshLongLivedToken = async (env: Env, accessToken: string) => {
  const url = new URL(INSTAGRAM_REFRESH_TOKEN_URL);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram token refresh failed: ${await response.text()}`);
  }

  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  const refreshedToken = payload.access_token || accessToken;

  await env.INSTAGRAM_FEED_KV.put(
    TOKEN_KEY,
    JSON.stringify({
      accessToken: refreshedToken,
      refreshedAt: new Date().toISOString(),
      expiresAt: getExpiryTimestamp(payload.expires_in),
    } satisfies TokenState),
  );

  return refreshedToken;
};

const fetchInstagramMedia = async (accessToken: string) => {
  const url = new URL(INSTAGRAM_MEDIA_URL);
  url.searchParams.set("fields", INSTAGRAM_MEDIA_FIELDS);
  url.searchParams.set("limit", String(MEDIA_LIMIT));
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram media request failed: ${await response.text()}`);
  }

  const payload = (await response.json()) as { data?: InstagramApiItem[] };

  return (payload.data ?? [])
    .filter((item) => item.id && item.permalink && (item.thumbnail_url || item.media_url))
    .slice(0, MEDIA_LIMIT);
};

const getExtension = (contentType: string | null, mediaUrl: string) => {
  if (contentType?.includes("png")) {
    return "png";
  }

  if (contentType?.includes("webp")) {
    return "webp";
  }

  if (contentType?.includes("gif")) {
    return "gif";
  }

  const pathnameExtension = new URL(mediaUrl).pathname.split(".").pop()?.toLowerCase();
  if (pathnameExtension && ["jpg", "jpeg", "png", "webp", "gif"].includes(pathnameExtension)) {
    return pathnameExtension === "jpeg" ? "jpg" : pathnameExtension;
  }

  return "jpg";
};

const copyMediaToR2 = async (env: Env, item: InstagramApiItem) => {
  const sourceUrl = item.media_type === "VIDEO" ? item.thumbnail_url || item.media_url : item.media_url || item.thumbnail_url;

  if (!sourceUrl) {
    throw new Error(`Instagram item ${item.id} has no downloadable media URL`);
  }

  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Instagram media download failed for ${item.id}: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type") || "image/jpeg";
  const extension = getExtension(contentType, sourceUrl);
  const mediaFileName = `${item.id}.${extension}`;
  const r2Key = `${MEDIA_PREFIX}/${mediaFileName}`;
  const body = await response.arrayBuffer();

  await env.INSTAGRAM_MEDIA_BUCKET.put(r2Key, body, {
    httpMetadata: {
      contentType,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return `/instagram/media/${mediaFileName}`;
};

const buildStaleFeed = (cachedFeed: PublicFeed | null, error: string): PublicFeed => ({
  posts: cachedFeed?.posts ?? [],
  stale: true,
  error,
  meta: {
    source: cachedFeed?.posts?.length ? "cache" : "empty",
    stale: true,
    syncedAt: cachedFeed?.meta?.syncedAt ?? null,
    error,
  },
});

const syncInstagramFeed = async (env: Env) => {
  const cachedFeed = await getCachedFeed(env);

  try {
    const storedToken = await getStoredToken(env);

    if (!storedToken) {
      throw new Error("Missing INSTAGRAM_ACCESS_TOKEN");
    }

    const accessToken = await refreshLongLivedToken(env, storedToken);
    const mediaItems = await fetchInstagramMedia(accessToken);

    const posts: InstagramPost[] = [];
    for (const item of mediaItems) {
      posts.push({
        id: item.id,
        caption: item.caption ?? "",
        mediaType: item.media_type ?? "IMAGE",
        mediaUrl: await copyMediaToR2(env, item),
        permalink: item.permalink ?? "",
        timestamp: item.timestamp ?? "",
      });
    }

    const feed: PublicFeed = {
      posts,
      stale: false,
      meta: {
        source: "instagram",
        stale: false,
        syncedAt: new Date().toISOString(),
      },
    };

    await saveFeed(env, feed);
    return feed;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Instagram sync failed";
    const staleFeed = buildStaleFeed(cachedFeed, message);
    await saveFeed(env, staleFeed);
    return staleFeed;
  }
};

const handleFeed = async (request: Request, env: Env) => {
  const feed = (await getCachedFeed(env)) ?? {
    posts: [],
    stale: true,
    meta: {
      source: "empty",
      stale: true,
      syncedAt: null,
      error: "Instagram feed has not been synced yet",
    },
  };

  return json(request, env, feed, {
    headers: {
      "Cache-Control": feed.stale
        ? "public, max-age=300, stale-while-revalidate=86400"
        : "public, max-age=1800, stale-while-revalidate=86400",
    },
  });
};

const handleMedia = async (request: Request, env: Env, mediaId: string) => {
  const safeMediaId = decodeURIComponent(mediaId).replace(/[^a-zA-Z0-9._-]/g, "");
  const object = await env.INSTAGRAM_MEDIA_BUCKET.get(`${MEDIA_PREFIX}/${safeMediaId}`);

  if (!object) {
    return new Response("Not found", {
      status: 404,
      headers: getCorsHeaders(request, env),
    });
  }

  return new Response(object.body, {
    headers: {
      ...getCorsHeaders(request, env),
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": object.httpMetadata?.cacheControl ?? "public, max-age=31536000, immutable",
    },
  });
};

const handleAdminSync = async (request: Request, env: Env) => {
  const unauthorized = assertAdmin(request, env);
  if (unauthorized) {
    return unauthorized;
  }

  const feed = await syncInstagramFeed(env);
  return json(request, env, feed, { status: feed.stale ? 207 : 200 });
};

const routeRequest = async (request: Request, env: Env) => {
  if (request.method === "OPTIONS") {
    return handleOptions(request, env);
  }

  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/instagram/feed") {
    return handleFeed(request, env);
  }

  if (request.method === "GET" && url.pathname.startsWith("/instagram/media/")) {
    return handleMedia(request, env, url.pathname.replace("/instagram/media/", ""));
  }

  if (request.method === "POST" && url.pathname === "/admin/sync") {
    return handleAdminSync(request, env);
  }

  return json(request, env, { error: "Not found" }, { status: 404 });
};

export default {
  fetch: routeRequest,
  scheduled(_event: unknown, env: Env, ctx: { waitUntil(promise: Promise<unknown>): void }) {
    ctx.waitUntil(syncInstagramFeed(env));
  },
};
