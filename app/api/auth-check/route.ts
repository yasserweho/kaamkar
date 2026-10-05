import { NextResponse } from "next/server";

function clean(value?: string) {
  return (value || "").replace(/\s+/g, "");
}

export async function GET() {
  const id = clean(process.env["AUTH_GOOGLE_ID"]);
  const secret = clean(process.env["AUTH_GOOGLE_SECRET"]);
  const body = new URLSearchParams({
    code: "invalid",
    client_id: id,
    client_secret: secret,
    redirect_uri: "https://www.kaamkar.com/api/auth/callback/google",
    grant_type: "authorization_code",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body });
  const json = await response.json().catch(() => ({}));
  return NextResponse.json({
    googleError: json.error || "",
    googleDesc: json.error_description || "",
    secretLooksValid: secret.startsWith("GOCSPX-") && secret.length >= 24,
    authSecretLength: clean(process.env["AUTH_SECRET"]).length,
  });
}
