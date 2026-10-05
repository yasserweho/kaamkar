"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Shell } from "@/components/Shell";
import { AuthButtons } from "@/components/AuthButtons";

type Profile = { name: string; role: "seeker" | "employer"; phone: string; city: string };

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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [apps, setApps] = useState<Array<{ title: string; at: string }>>([]);

  useEffect(() => {
    const p = localStorage.getItem("kaamkar_profile");
    if (p) setProfile(JSON.parse(p));
    setApps(JSON.parse(localStorage.getItem("kaamkar_apps") || "[]"));
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Profile = {
      name: String(f.get("name") || ""),
      role: String(f.get("role") || "seeker") as Profile["role"],
      phone: String(f.get("phone") || ""),
      city: String(f.get("city") || ""),
    };
    localStorage.setItem("kaamkar_profile", JSON.stringify(next));
    setProfile(next);
  }

  return (
    <div className="wrap" style={{ maxWidth: 640, paddingBottom: 64 }}>
      <div className="page-head">
        <h1>Account</h1>
        <p className="meta">Sign in with Gmail or X, then save your seeker or employer details.</p>
      </div>
      {authError && (
        <p className="meta" style={{ color: "#9b2c2c" }}>
          Google sign-in failed ({authError}). {detail || "Try again in a private window on www.kaamkar.com."}
        </p>
      )}
      <div className="panel" style={{ marginBottom: 16 }}>
        <AuthButtons />
      </div>
      {data?.user && (
        <form className="form panel" onSubmit={onSubmit}>
          <label>Name</label>
          <input name="name" defaultValue={profile?.name || data.user.name || ""} required />
          <label>I am</label>
          <select name="role" defaultValue={profile?.role || "seeker"}>
            <option value="seeker">Job seeker</option>
            <option value="employer">Employer</option>
          </select>
          <label>WhatsApp</label>
          <input name="phone" defaultValue={profile?.phone} />
          <label>City</label>
          <input name="city" defaultValue={profile?.city} />
          <button className="go" type="submit">
            Save profile
          </button>
        </form>
      )}
      {apps.length > 0 && (
        <div className="panel" style={{ marginTop: 16 }}>
          <strong>Applications</strong>
          {apps.map((a, i) => (
            <p className="meta" key={i}>
              {a.title} · {new Date(a.at).toLocaleString()}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
