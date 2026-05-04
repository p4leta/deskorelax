import {
  assertAuthorizedAdminRequest,
  buildInstagramAuthorizeUrl,
  config,
  createOAuthState,
  handleOptions,
  json,
  redirect,
} from "../../_lib/instagram";

export { config };

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return handleOptions();
  }

  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    assertAuthorizedAdminRequest(request);
    const state = await createOAuthState();
    const { authorizeUrl } = buildInstagramAuthorizeUrl(request, state);
    return redirect(authorizeUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start Instagram connect flow";
    return json({ error: message }, { status: message === "Unauthorized admin request" ? 401 : 500 });
  }
}
