import { config, getFeedForPublicRequest, handleOptions, json } from "./_lib/instagram";

export { config };

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return handleOptions();
  }

  try {
    const result = await getFeedForPublicRequest();

    return json(
      {
        posts: result.posts,
        meta: {
          configured: result.configured,
          source: result.source,
          stale: result.stale,
          syncedAt: result.syncedAt,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": result.stale
            ? "public, s-maxage=300, stale-while-revalidate=86400"
            : "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Instagram feed request failed";
    return json(
      {
        error: message,
        posts: [],
        meta: {
          configured: true,
          source: "empty",
          stale: true,
          syncedAt: null,
        },
      },
      { status: 503 },
    );
  }
}
