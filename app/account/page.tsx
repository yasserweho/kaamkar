"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Shell } from "@/components/Shell";
import { AuthButtons } from "@/components/AuthButtons";

type Profile = {
  name: string;
  role: "seeker" | "employer";
  phone: string;
  city: string;
  title: string;
  email: string;
  about: string;
  savedAt: string;
};

const empty: Profile = {
  name: "",
  role: "seeker",
  phone: "",
  city: "Islamabad",
  title: "",
  email: "",
  about: "",
  savedAt: "",
};

export default function AccountPage() {
  return (
    <Shell>
      <Suspense fallback={<p className="meta">Loading account…</p>}>
        <Account />
      </Suspense>
    </Shell>
  );
}

function Account() {
  const { data } = useSession();
  const params = useSearchParams();
  const authError = params.get("error");
  const detail = params.get("detail");
  const [profile, setProfile] = useState<Profile>(empty);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kaamkar_profile");
    const next = stored ? { ...empty, ...JSON.parse(stored) } : empty;
    if (!next.email && data?.user?.email) next.email = data.user.email;
    if (!next.name && data?.user?.name) next.name = data.user.name;
    setProfile(next);
    setSaved(Boolean(stored));
  }, [data?.user?.email, data?.user?.name]);

  function update(key: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const next = { ...profile, email: profile.email.trim().toLowerCase() };
    localStorage.setItem("kaamkar_profile", JSON.stringify(next));
    const response = await fetch("/api/profiles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next),
    });
    const result = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      setMessage(result.error || "Could not save. Try again.");
      return;
    }
    setProfile(result.profile || next);
    setSaved(true);
    setMessage("Saved on kaamkar.com.");
  }

  return (
    <div className="wrap narrow section">
      <div className="page-head">
        <h1>Account</h1>
        <p className="meta">Post yourself as a job seeker or an employer. This stays on the site.</p>
      </div>
      {authError && (
        <p className="meta error">
          Google sign-in failed ({authError}). {detail || "You can still save your profile below."}
        </p>
      )}
      <div className="panel stack">
        <AuthButtons />
      </div>
      <form className="form panel" onSubmit={onSubmit}>
        <label>I am</label>
        <select value={profile.role} onChange={(e) => update("role", e.target.value)}>
          <option value="seeker">Job seeker</option>
          <option value="employer">Employer</option>
        </select>
        <label>Name</label>
        <input value={profile.name} onChange={(e) => update("name", e.target.value)} required />
        <label>{profile.role === "employer" ? "Company or trade" : "Job title"}</label>
        <input value={profile.title} onChange={(e) => update("title", e.target.value)} required placeholder={profile.role === "employer" ? "Al Kabir Builders" : "Electrician"} />
        <label>City</label>
        <input value={profile.city} onChange={(e) => update("city", e.target.value)} required />
        <label>WhatsApp</label>
        <input value={profile.phone} onChange={(e) => update("phone", e.target.value)} required placeholder="03xx" />
        <label>Email</label>
        <input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} required />
        <label>About</label>
        <textarea value={profile.about} onChange={(e) => update("about", e.target.value)} rows={4} required />
        <button className="go" type="submit" disabled={busy}>{busy ? "Saving…" : "Save profile"}</button>
      </form>
      {message && <p className="meta stack">{message}</p>}
      {saved && (
        <div className="panel stack">
          <strong>Saved.</strong>
          <p className="meta">
            {profile.name} is posted as {profile.role === "employer" ? "an employer" : "a job seeker"}
            {profile.title ? `, ${profile.title}` : ""} in {profile.city}.
          </p>
          <p className="meta">WhatsApp {profile.phone} · {profile.email}</p>
          <p><a href="/people">View people</a></p>
        </div>
      )}
    </div>
  );
}
