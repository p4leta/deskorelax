import { describe, expect, it } from "vitest";
import { normalizeInstagramFeed, resolveInstagramMediaUrl } from "./instagram-feed";

const feedUrl = "https://worker.example.com/instagram/feed";

const createPost = (index: number) => ({
  id: `post-${index}`,
  caption: `Post ${index}`,
  mediaType: "IMAGE",
  mediaUrl: `/instagram/media/post-${index}.jpg`,
  permalink: `https://www.instagram.com/p/post-${index}/`,
  timestamp: "2026-06-14T10:00:00Z",
});

describe("instagram feed normalization", () => {
  it("limits rendered feed items to 16", () => {
    const feed = normalizeInstagramFeed(
      {
        posts: Array.from({ length: 20 }, (_, index) => createPost(index)),
      },
      feedUrl,
    );

    expect(feed.posts).toHaveLength(16);
    expect(feed.posts.at(-1)?.id).toBe("post-15");
  });

  it("resolves relative media URLs against the Worker feed URL", () => {
    expect(resolveInstagramMediaUrl("/instagram/media/abc.jpg", feedUrl)).toBe(
      "https://worker.example.com/instagram/media/abc.jpg",
    );

    expect(resolveInstagramMediaUrl("media/abc.jpg", feedUrl)).toBe(
      "https://worker.example.com/instagram/media/abc.jpg",
    );
  });
});
