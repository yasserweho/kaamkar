import { NextResponse } from "next/server";
import { readProfiles, saveProfile, type Profile } from "@/lib/profiles";

export async function GET() {
  try {
    return NextResponse.json(await readProfiles());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load profiles.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile: Profile = {
      name: String(body.name || "").trim(),
      role: body.role === "employer" ? "employer" : "seeker",
      phone: String(body.phone || "").trim(),
      city: String(body.city || "").trim(),
      title: String(body.title || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      about: String(body.about || "").trim(),
      savedAt: new Date().toISOString(),
    };
    if (!profile.name || !profile.phone || !profile.email || !profile.title || !profile.about) {
      return NextResponse.json({ error: "Fill in name, title, city, WhatsApp, email and about." }, { status: 400 });
    }
    const people = await saveProfile(profile);
    return NextResponse.json({ ok: true, profile, count: people.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
