import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  if (host === "kaamkar.com") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "www.kaamkar.com";
    return NextResponse.redirect(url, 308);
  }
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
