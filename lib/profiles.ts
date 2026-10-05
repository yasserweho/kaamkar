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

export async function readProfiles(): Promise<Profile[]> {
  if (!token()) return [];
  const listed = await fetch(`https://blob.vercel-storage.com?prefix=${PATH}`, {
    headers: { authorization: `Bearer ${token()}` },
  });
  if (!listed.ok) return [];
  const data = await listed.json();
  const url = data.blobs?.[0]?.url || "";
  if (!url) return [];
  const file = await fetch(url, { headers: { authorization: `Bearer ${token()}` } });
  if (!file.ok) return [];
  const people = await file.json();
  return Array.isArray(people) ? people : [];
}

export async function saveProfile(profile: Profile) {
  if (!token()) throw new Error("Storage token is missing on this deployment.");
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
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 180);
    throw new Error(`Storage rejected the save (${response.status}): ${detail}`);
  }
  return next;
}
