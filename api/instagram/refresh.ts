import {
  assertAuthorizedAdminRequest,
  config,
  handleOptions,
  json,
  syncInstagramFeed,
} from "../_lib/instagram";

export { config };

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return handleOptions();
  }

  if (request.method !== "GET" && request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    assertAuthorizedAdminRequest(request);
    const result = await syncInstagramFeed();

    return json({
      ok: true,
      configured: result.configured,
      count: result.posts.length,
      source: result.source,
      stale: result.stale,
      syncedAt: result.syncedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Instagram refresh failed";
    return json({ ok: false, error: message }, { status: message === "Unauthorized admin request" ? 401 : 500 });
  }
}
