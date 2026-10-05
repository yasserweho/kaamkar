import { NextResponse } from "next/server";

function clean(value?: string) {
  return (value || "").replace(/\s+/g, "");
}

export function GET() {
  const id = clean(process.env["AUTH_GOOGLE_ID"]);
  const secret = clean(process.env["AUTH_GOOGLE_SECRET"]);
  const authSecret = clean(process.env["AUTH_SECRET"]);
  return NextResponse.json({
    authUrl: process.env["AUTH_URL"] || "",
    googleIdEnds: id.slice(-28),
    googleIdLength: id.length,
    secretLength: secret.length,
    secretLooksValid: secret.startsWith("GOCSPX-") && secret.length >= 24,
    authSecretLength: authSecret.length,
  });
}
