import { useEffect, useState } from "react";
import { fetchInstagramFeed, type InstagramFeedResponse, type InstagramPost } from "@/lib/instagram-feed";

type FeedState =
  | { status: "loading"; feed: null; error: null }
  | { status: "ready"; feed: InstagramFeedResponse; error: null }
  | { status: "error"; feed: null; error: string };

const badgeLabels: Partial<Record<InstagramPost["mediaType"], string>> = {
  VIDEO: "VIDEO",
  CAROUSEL_ALBUM: "CAROUSEL",
};

const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

const InstagramGallerySkeleton = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
    {skeletonItems.map((item) => (
      <div
        key={item}
        className="aspect-square animate-pulse rounded-[1rem] border border-[rgba(32,110,175,0.12)] bg-white/45 shadow-[0_18px_50px_rgba(19,32,51,0.08)] md:rounded-[1.25rem]"
      />
    ))}
  </div>
);

const InstagramGalleryFallback = ({ message }: { message: string }) => (
  <div className="rounded-[1rem] border border-[rgba(32,110,175,0.16)] bg-[rgba(255,255,255,0.72)] p-5 text-center shadow-[0_20px_60px_rgba(19,32,51,0.1)] backdrop-blur-md md:rounded-[1.25rem] md:p-8">
    <p className="font-heading text-xl font-semibold tracking-normal text-[#132033] md:text-2xl">
      Nie udało się załadować galerii.
    </p>
    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#536274] md:text-base">
      {message}
    </p>
  </div>
);

const InstagramTile = ({ post }: { post: InstagramPost }) => {
  const badge = badgeLabels[post.mediaType];

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-[1rem] border border-[rgba(32,110,175,0.16)] bg-[rgba(255,255,255,0.72)] shadow-[0_20px_60px_rgba(19,32,51,0.1)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[rgba(227,111,44,0.28)] hover:shadow-[0_22px_70px_rgba(227,111,44,0.14)] md:rounded-[1.25rem]"
      aria-label={post.caption ? `Zobacz post na Instagramie: ${post.caption}` : "Zobacz post na Instagramie"}
    >
      <img
        src={post.mediaUrl}
        alt={post.caption || "Zdjęcie z Instagrama Deskorelax"}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {badge ? (
        <span className="absolute right-3 top-3 rounded-full border border-white/45 bg-[#132033]/78 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-white backdrop-blur">
          {badge}
        </span>
      ) : null}
    </a>
  );
};

const InstagramGallery = () => {
  const [state, setState] = useState<FeedState>({ status: "loading", feed: null, error: null });

  useEffect(() => {
    let isMounted = true;

    fetchInstagramFeed()
      .then((feed) => {
        if (isMounted) {
          setState({ status: "ready", feed, error: null });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({
            status: "error",
            feed: null,
            error: error instanceof Error ? error.message : "Instagram feed request failed",
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (state.status === "loading") {
    return <InstagramGallerySkeleton />;
  }

  if (state.status === "error") {
    return <InstagramGalleryFallback message={state.error} />;
  }

  if (!state.feed.posts.length) {
    return <InstagramGalleryFallback message="Galeria jest jeszcze pusta. Uruchom synchronizację Instagrama w panelu Worker." />;
  }

  return (
    <div className="space-y-4">
      {state.feed.stale ? (
        <div className="rounded-full border border-[rgba(227,111,44,0.22)] bg-[rgba(255,255,255,0.62)] px-4 py-2 text-sm text-[#536274] backdrop-blur">
          Pokazujemy ostatnio zapisaną galerię. {state.feed.error ? state.feed.error : null}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {state.feed.posts.map((post) => (
          <InstagramTile key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default InstagramGallery;
