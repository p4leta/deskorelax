export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

export type InstagramFeedResponse = {
  posts: InstagramPost[];
  meta?: {
    configured?: boolean;
    source?: "cache" | "instagram" | "empty";
    stale?: boolean;
    syncedAt?: string | null;
  };
};

const INSTAGRAM_FEED_ENDPOINT = "/api/instagram-feed";

export const fetchInstagramFeed = async (): Promise<InstagramFeedResponse> => {
  const response = await fetch(INSTAGRAM_FEED_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram feed request failed with ${response.status}`);
  }

  const payload = (await response.json()) as InstagramFeedResponse;

  if (!payload.posts || !Array.isArray(payload.posts)) {
    throw new Error("Instagram feed response is invalid");
  }

  return payload;
};
