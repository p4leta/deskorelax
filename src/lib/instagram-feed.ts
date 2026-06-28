export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

export type InstagramFeedResponse = {
  posts: InstagramPost[];
  stale: boolean;
  error?: string;
  meta?: {
    source?: "cache" | "instagram" | "empty";
    stale?: boolean;
    syncedAt?: string | null;
    error?: string;
  };
};

type RawInstagramPost = {
  id?: string;
  caption?: string;
  mediaType?: string;
  media_type?: string;
  mediaUrl?: string;
  media_url?: string;
  permalink?: string;
  timestamp?: string;
};

type RawInstagramFeedResponse = {
  posts?: RawInstagramPost[];
  stale?: boolean;
  error?: string;
  meta?: InstagramFeedResponse["meta"];
};

export const INSTAGRAM_RENDER_LIMIT = 16;

export const getInstagramFeedUrl = () => import.meta.env.VITE_INSTAGRAM_FEED_URL?.trim() || "";

export const resolveInstagramMediaUrl = (mediaUrl: string, feedUrl: string) => {
  if (!mediaUrl) {
    return "";
  }

  return new URL(mediaUrl, feedUrl).toString();
};

const normalizeMediaType = (mediaType?: string): InstagramMediaType => {
  if (mediaType === "VIDEO" || mediaType === "CAROUSEL_ALBUM") {
    return mediaType;
  }

  return "IMAGE";
};

export const normalizeInstagramFeed = (
  payload: RawInstagramFeedResponse,
  feedUrl: string,
  limit = INSTAGRAM_RENDER_LIMIT,
): InstagramFeedResponse => {
  const posts = Array.isArray(payload.posts) ? payload.posts : [];

  return {
    posts: posts
      .filter((post) => post.id && (post.mediaUrl || post.media_url) && post.permalink)
      .slice(0, limit)
      .map((post) => ({
        id: post.id as string,
        caption: post.caption ?? "",
        mediaType: normalizeMediaType(post.mediaType ?? post.media_type),
        mediaUrl: resolveInstagramMediaUrl((post.mediaUrl ?? post.media_url) as string, feedUrl),
        permalink: post.permalink as string,
        timestamp: post.timestamp ?? "",
      })),
    stale: Boolean(payload.stale ?? payload.meta?.stale),
    error: payload.error ?? payload.meta?.error,
    meta: payload.meta,
  };
};

export const fetchInstagramFeed = async (): Promise<InstagramFeedResponse> => {
  const feedUrl = getInstagramFeedUrl();

  if (!feedUrl) {
    throw new Error("Instagram feed URL is not configured");
  }

  const response = await fetch(feedUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram feed request failed with ${response.status}`);
  }

  return normalizeInstagramFeed((await response.json()) as RawInstagramFeedResponse, feedUrl);
};
