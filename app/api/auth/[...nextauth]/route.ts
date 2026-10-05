import { NextRequest, NextResponse } from "next/server";
import { handlers, lastAuthError } from "@/auth";

export const runtime = "nodejs";

async function finish(req: NextRequest, res: Response) {
  const location = res.headers.get("location") || "";
  if (!location.includes("error=")) return res;
  const url = new URL(location, req.url);
  if (lastAuthError) url.searchParams.set("detail", lastAuthError);
  const headers = new Headers(res.headers);
  headers.set("location", url.toString());
  return new NextResponse(res.body, { status: res.status, headers });
}

export async function GET(req: NextRequest) {
  return finish(req, await handlers.GET(req));
}

export async function POST(req: NextRequest) {
  return finish(req, await handlers.POST(req));
}
