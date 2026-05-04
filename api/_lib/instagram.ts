type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type SupabaseMethod = "GET" | "POST" | "PATCH";

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

type InstagramConnectionRow = {
  id: string;
  instagram_user_id: string | null;
  access_token: string | null;
  token_expires_at: string | null;
  last_refreshed_at: string | null;
  last_media_sync_at: string | null;
  last_sync_error: string | null;
  created_at?: string;
  updated_at?: string;
};

type InstagramFeedItemRow = {
  instagram_media_id: string;
  caption: string | null;
  media_type: string | null;
  media_url: string | null;
  permalink: string | null;
  posted_at: string | null;
  sort_timestamp: string | null;
  raw_payload: JsonValue | null;
  fetched_at: string;
  is_active: boolean;
};

type InstagramApiMediaItem = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
};

type TokenResponse = {
  access_token: string;
  user_id?: number;
  expires_in?: number;
};

type SyncResult = {
  configured: boolean;
  posts: InstagramPost[];
  source: "cache" | "instagram" | "empty";
  stale: boolean;
  syncedAt: string | null;
};

const SUPABASE_CONNECTION_ID = "primary";
const INSTAGRAM_MEDIA_LIMIT = 16;
const FEED_STALE_MS = 30 * 60 * 1000;
const TOKEN_REFRESH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const INSTAGRAM_OAUTH_AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize";
const INSTAGRAM_OAUTH_ACCESS_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const INSTAGRAM_LONG_LIVED_TOKEN_URL = "https://graph.instagram.com/access_token";
const INSTAGRAM_REFRESH_TOKEN_URL = "https://graph.instagram.com/refresh_access_token";
const INSTAGRAM_MEDIA_URL = "https://graph.instagram.com/me/media";

const INSTAGRAM_MEDIA_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
].join(",");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Secret",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export const config = {
  runtime: "edge",
};

const env = (name: string) => process.env[name]?.trim() || "";

export const getRequiredEnv = (name: string) => {
  const value = env(name);

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
};

const getOptionalEnv = (name: string) => env(name);

export const json = (body: JsonValue, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
      ...(init?.headers ?? {}),
    },
  });

export const redirect = (location: string, status = 302) =>
  new Response(null, {
    status,
    headers: {
      Location: location,
      ...corsHeaders,
    },
  });

export const handleOptions = () =>
  new Response(null, {
    status: 204,
    headers: corsHeaders,
  });

export const getBaseUrl = (request: Request) => {
  const configured = getOptionalEnv("SITE_URL");

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
};

const getAdminSecret = () => getOptionalEnv("INSTAGRAM_ADMIN_SECRET");
const getCronSecret = () => getOptionalEnv("CRON_SECRET");

export const isAuthorizedAdminRequest = (request: Request) => {
  const providedQuerySecret = new URL(request.url).searchParams.get("admin_secret")?.trim() || "";
  const providedHeaderSecret = request.headers.get("x-admin-secret")?.trim() || "";
  const authorization = request.headers.get("authorization")?.trim() || "";
  const bearerSecret = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";

  const acceptedSecrets = [getAdminSecret(), getCronSecret()].filter(Boolean);

  if (!acceptedSecrets.length) {
    return false;
  }

  return acceptedSecrets.some(
    (secret) => secret === providedQuerySecret || secret === providedHeaderSecret || secret === bearerSecret,
  );
};

export const assertAuthorizedAdminRequest = (request: Request) => {
  if (!isAuthorizedAdminRequest(request)) {
    throw new Error("Unauthorized admin request");
  }
};

const createStateSignature = async (payload: string) => {
  const signingSecret = getRequiredEnv("INSTAGRAM_APP_SECRET");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
};

export const createOAuthState = async () => {
  const nonce = crypto.randomUUID();
  const timestamp = Date.now().toString();
  const payload = `${nonce}.${timestamp}`;
  const signature = await createStateSignature(payload);
  return `${payload}.${signature}`;
};

export const assertValidOAuthState = async (state: string | null) => {
  if (!state) {
    throw new Error("Missing OAuth state");
  }

  const [nonce, timestamp, signature] = state.split(".");

  if (!nonce || !timestamp || !signature) {
    throw new Error("Invalid OAuth state");
  }

  const payload = `${nonce}.${timestamp}`;
  const expectedSignature = await createStateSignature(payload);

  if (signature !== expectedSignature) {
    throw new Error("OAuth state signature mismatch");
  }

  const issuedAt = Number(timestamp);

  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > 15 * 60 * 1000) {
    throw new Error("OAuth state expired");
  }
};

const getSupabaseHeaders = () => {
  const apiKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  };
};

const supabaseRequest = async <T>(
  table: string,
  method: SupabaseMethod,
  options?: {
    body?: JsonValue;
    query?: Record<string, string>;
    prefer?: string;
  },
) => {
  const baseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const url = new URL(`${baseUrl}/rest/v1/${table}`);

  Object.entries(options?.query ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    method,
    headers: {
      ...getSupabaseHeaders(),
      "Content-Type": "application/json",
      ...(options?.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase ${table} ${method} failed: ${errorText}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
};

export const getConnection = async () => {
  const rows = await supabaseRequest<InstagramConnectionRow[]>("instagram_connections", "GET", {
    query: {
      select: "*",
      id: `eq.${SUPABASE_CONNECTION_ID}`,
      limit: "1",
    },
  });

  return rows?.[0] ?? null;
};

const upsertConnection = async (values: Partial<InstagramConnectionRow>) => {
  const payload = [
    {
      id: SUPABASE_CONNECTION_ID,
      ...values,
    },
  ];

  await supabaseRequest<InstagramConnectionRow[]>("instagram_connections", "POST", {
    body: payload,
    query: {
      on_conflict: "id",
      select: "*",
    },
    prefer: "resolution=merge-duplicates,return=representation",
  });
};

export const getActiveFeedItems = async () => {
  const rows = await supabaseRequest<InstagramFeedItemRow[]>("instagram_feed_items", "GET", {
    query: {
      select: "instagram_media_id,caption,media_type,media_url,permalink,posted_at,sort_timestamp",
      is_active: "eq.true",
      order: "sort_timestamp.desc",
      limit: String(INSTAGRAM_MEDIA_LIMIT),
    },
  });

  return (rows ?? [])
    .filter((row) => row.media_url && row.permalink)
    .map((row) => ({
      id: row.instagram_media_id,
      caption: row.caption ?? "",
      mediaType: row.media_type ?? "IMAGE",
      mediaUrl: row.media_url ?? "",
      permalink: row.permalink ?? "",
      timestamp: row.posted_at ?? "",
    }));
};

const deactivateAllFeedItems = async () => {
  await supabaseRequest<null>("instagram_feed_items", "PATCH", {
    body: {
      is_active: false,
    },
    query: {
      is_active: "eq.true",
    },
  });
};

const upsertFeedItems = async (items: InstagramFeedItemRow[]) => {
  if (!items.length) {
    return;
  }

  await supabaseRequest<InstagramFeedItemRow[]>("instagram_feed_items", "POST", {
    body: items,
    query: {
      on_conflict: "instagram_media_id",
      select: "instagram_media_id",
    },
    prefer: "resolution=merge-duplicates,return=representation",
  });
};

const fetchInstagramMedia = async (accessToken: string) => {
  const url = new URL(INSTAGRAM_MEDIA_URL);
  url.searchParams.set("fields", INSTAGRAM_MEDIA_FIELDS);
  url.searchParams.set("limit", String(INSTAGRAM_MEDIA_LIMIT));
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Instagram media request failed: ${errorText}`);
  }

  const payload = (await response.json()) as { data?: InstagramApiMediaItem[] };

  return (payload.data ?? [])
    .map((item) => ({
      id: item.id,
      caption: item.caption ?? "",
      mediaType: item.media_type ?? "IMAGE",
      mediaUrl: item.thumbnail_url || item.media_url || "",
      permalink: item.permalink ?? "",
      timestamp: item.timestamp ?? "",
      rawPayload: item as JsonValue,
    }))
    .filter((item) => item.mediaUrl && item.permalink)
    .slice(0, INSTAGRAM_MEDIA_LIMIT);
};

const isTokenNearExpiry = (connection: InstagramConnectionRow | null) => {
  if (!connection?.token_expires_at) {
    return false;
  }

  const expiresAt = Date.parse(connection.token_expires_at);

  if (Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt - Date.now() < TOKEN_REFRESH_WINDOW_MS;
};

const exchangeCodeForShortLivedToken = async (code: string, redirectUri: string) => {
  const body = new URLSearchParams({
    client_id: getRequiredEnv("INSTAGRAM_APP_ID"),
    client_secret: getRequiredEnv("INSTAGRAM_APP_SECRET"),
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch(INSTAGRAM_OAUTH_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Instagram short-lived token exchange failed: ${errorText}`);
  }

  return (await response.json()) as TokenResponse;
};

const exchangeForLongLivedToken = async (shortLivedToken: string) => {
  const url = new URL(INSTAGRAM_LONG_LIVED_TOKEN_URL);
  url.searchParams.set("grant_type", "ig_exchange_token");
  url.searchParams.set("client_secret", getRequiredEnv("INSTAGRAM_APP_SECRET"));
  url.searchParams.set("access_token", shortLivedToken);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Instagram long-lived token exchange failed: ${errorText}`);
  }

  return (await response.json()) as TokenResponse;
};

export const refreshLongLivedToken = async (accessToken: string) => {
  const url = new URL(INSTAGRAM_REFRESH_TOKEN_URL);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Instagram token refresh failed: ${errorText}`);
  }

  return (await response.json()) as TokenResponse;
};

const getExpiryTimestamp = (expiresIn?: number) => {
  if (!expiresIn) {
    return null;
  }

  return new Date(Date.now() + expiresIn * 1000).toISOString();
};

export const bootstrapConnectionFromCode = async (code: string, redirectUri: string) => {
  const shortLived = await exchangeCodeForShortLivedToken(code, redirectUri);
  const longLived = await exchangeForLongLivedToken(shortLived.access_token);
  const accessToken = longLived.access_token || shortLived.access_token;
  const userId = longLived.user_id ?? shortLived.user_id;
  const expiresAt = getExpiryTimestamp(longLived.expires_in ?? shortLived.expires_in);

  await upsertConnection({
    instagram_user_id: userId ? String(userId) : null,
    access_token: accessToken,
    token_expires_at: expiresAt,
    last_refreshed_at: new Date().toISOString(),
    last_sync_error: null,
  });

  return {
    accessToken,
    instagramUserId: userId ? String(userId) : null,
    tokenExpiresAt: expiresAt,
  };
};

const refreshConnectionTokenIfNeeded = async (connection: InstagramConnectionRow) => {
  if (!connection.access_token || !isTokenNearExpiry(connection)) {
    return connection;
  }

  const refreshed = await refreshLongLivedToken(connection.access_token);
  const nextConnection = {
    ...connection,
    access_token: refreshed.access_token,
    token_expires_at: getExpiryTimestamp(refreshed.expires_in),
    last_refreshed_at: new Date().toISOString(),
    last_sync_error: null,
  };

  await upsertConnection(nextConnection);

  return nextConnection;
};

const persistFeed = async (items: Awaited<ReturnType<typeof fetchInstagramMedia>>) => {
  const now = new Date().toISOString();

  await deactivateAllFeedItems();
  await upsertFeedItems(
    items.map((item) => ({
      instagram_media_id: item.id,
      caption: item.caption,
      media_type: item.mediaType,
      media_url: item.mediaUrl,
      permalink: item.permalink,
      posted_at: item.timestamp,
      sort_timestamp: item.timestamp,
      raw_payload: item.rawPayload,
      fetched_at: now,
      is_active: true,
    })),
  );

  await upsertConnection({
    last_media_sync_at: now,
    last_sync_error: null,
  });
};

const isFeedStale = (connection: InstagramConnectionRow | null) => {
  if (!connection?.last_media_sync_at) {
    return true;
  }

  const syncedAt = Date.parse(connection.last_media_sync_at);

  if (Number.isNaN(syncedAt)) {
    return true;
  }

  return Date.now() - syncedAt > FEED_STALE_MS;
};

export const syncInstagramFeed = async () => {
  const connection = await getConnection();

  if (!connection?.access_token) {
    const cachedPosts = await getActiveFeedItems();
    return {
      configured: false,
      posts: cachedPosts,
      source: cachedPosts.length ? "cache" : "empty",
      stale: true,
      syncedAt: connection?.last_media_sync_at ?? null,
    } satisfies SyncResult;
  }

  const refreshedConnection = await refreshConnectionTokenIfNeeded(connection);
  const instagramItems = await fetchInstagramMedia(refreshedConnection.access_token as string);
  await persistFeed(instagramItems);

  return {
    configured: true,
    posts: instagramItems.map(({ id, caption, mediaType, mediaUrl, permalink, timestamp }) => ({
      id,
      caption,
      mediaType,
      mediaUrl,
      permalink,
      timestamp,
    })),
    source: "instagram",
    stale: false,
    syncedAt: new Date().toISOString(),
  } satisfies SyncResult;
};

export const getFeedForPublicRequest = async () => {
  const connection = await getConnection();
  const cachedPosts = await getActiveFeedItems();

  if (!connection?.access_token) {
    return {
      configured: false,
      posts: cachedPosts,
      source: cachedPosts.length ? "cache" : "empty",
      stale: true,
      syncedAt: connection?.last_media_sync_at ?? null,
    } satisfies SyncResult;
  }

  if (!cachedPosts.length || isFeedStale(connection)) {
    try {
      return await syncInstagramFeed();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Instagram sync failed";
      await upsertConnection({
        last_sync_error: message,
      });

      if (cachedPosts.length) {
        return {
          configured: true,
          posts: cachedPosts,
          source: "cache",
          stale: true,
          syncedAt: connection.last_media_sync_at,
        } satisfies SyncResult;
      }

      throw error;
    }
  }

  return {
    configured: true,
    posts: cachedPosts,
    source: "cache",
    stale: false,
    syncedAt: connection.last_media_sync_at,
  } satisfies SyncResult;
};

export const buildInstagramAuthorizeUrl = (request: Request, state: string) => {
  const redirectUri =
    getOptionalEnv("INSTAGRAM_REDIRECT_URI") || `${getBaseUrl(request)}/api/instagram/connect/callback`;
  const url = new URL(INSTAGRAM_OAUTH_AUTHORIZE_URL);

  url.searchParams.set("client_id", getRequiredEnv("INSTAGRAM_APP_ID"));
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", getOptionalEnv("INSTAGRAM_SCOPE") || "user_profile,user_media");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);

  return {
    authorizeUrl: url.toString(),
    redirectUri,
  };
};

export const getConnectSuccessRedirect = (request: Request) => {
  const configured = getOptionalEnv("INSTAGRAM_CONNECT_SUCCESS_URL");

  if (configured) {
    return configured;
  }

  return `${getBaseUrl(request)}/galeria?instagram=connected`;
};
