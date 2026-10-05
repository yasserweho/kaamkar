import { get, put } from "@vercel/blob";

export type Profile = {
  name: string;
  role: "seeker" | "employer";
  phone: string;
  city: string;
  title: string;
  email: string;
  about: string;
  savedAt: string;
};

const PATH = "profiles.json";

export async function readProfiles(): Promise<Profile[]> {
  const result = await get(PATH, { access: "private" }).catch(() => null);
  if (!result || result.statusCode === 404 || !result.stream) return [];
  const text = await new Response(result.stream).text();
  const data = JSON.parse(text || "[]");
  return Array.isArray(data) ? data : [];
}

export async function saveProfile(profile: Profile) {
  const people = await readProfiles();
  const next = [profile, ...people.filter((person) => person.email !== profile.email)].slice(0, 100);
  await put(PATH, JSON.stringify(next), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return next;
}
