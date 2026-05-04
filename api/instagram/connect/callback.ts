import {
  assertValidOAuthState,
  bootstrapConnectionFromCode,
  buildInstagramAuthorizeUrl,
  config,
  getConnectSuccessRedirect,
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
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const errorDescription = url.searchParams.get("error_description");

    if (errorDescription) {
      return json({ error: errorDescription }, { status: 400 });
    }

    if (!code) {
      return json({ error: "Missing Instagram authorization code" }, { status: 400 });
    }

    await assertValidOAuthState(url.searchParams.get("state"));
    const { redirectUri } = buildInstagramAuthorizeUrl(request, "ignored");
    await bootstrapConnectionFromCode(code, redirectUri);

    return redirect(getConnectSuccessRedirect(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Instagram connect callback failed";
    return json({ error: message }, { status: 500 });
  }
}
