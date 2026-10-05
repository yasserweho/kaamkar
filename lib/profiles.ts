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

function token() {
  return process.env.BLOB_READ_WRITE_TOKEN || "";
}

async function blobUrl() {
  const response = await fetch(`https://blob.vercel-storage.com?prefix=${PATH}`, {
    headers: { authorization: `Bearer ${token()}` },
  });
  if (!response.ok) return "";
  const data = await response.json();
  return data.blobs?.[0]?.url || "";
}

export async function readProfiles(): Promise<Profile[]> {
  if (!token()) return [];
  const url = await blobUrl();
  if (!url) return [];
  const response = await fetch(url, { headers: { authorization: `Bearer ${token()}` } });
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function saveProfile(profile: Profile) {
  if (!token()) throw new Error("Profile storage is not connected.");
  const people = await readProfiles();
  const next = [profile, ...people.filter((person) => person.email !== profile.email)].slice(0, 100);
  const response = await fetch(`https://blob.vercel-storage.com/${PATH}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token()}`,
      "x-api-version": "7",
      "x-content-type": "application/json",
      "x-allow-overwrite": "1",
    },
    body: JSON.stringify(next),
  });
  if (!response.ok) throw new Error(await response.text());
  return next;
}
