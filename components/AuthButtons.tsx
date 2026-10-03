"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Providers = Record<string, { id: string; name: string }>;

export function AuthButtons({ compact = false }: { compact?: boolean }) {
  const { data, status } = useSession();
  const [providers, setProviders] = useState<Providers | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((r) => r.json())
      .then((p) => setProviders(p || {}))
      .catch(() => setProviders({}));
  }, []);

  if (status === "loading") {
    return <span className="meta">Checking login…</span>;
  }

  if (data?.user) {
    return (
      <div className={compact ? "auth-compact" : "auth-box"}>
        {data.user.image && <img className="avatar" src={data.user.image} alt="" width={32} height={32} />}
        {!compact && (
          <div>
            <strong>{data.user.name || "Signed in"}</strong>
            {data.user.email && <div className="meta">{data.user.email}</div>}
          </div>
        )}
        <button className="chip" type="button" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </button>
      </div>
    );
  }

  async function start(provider: "google" | "twitter") {
    setError("");
    if (!providers?.[provider]) {
      setError("Gmail and X are not connected yet. Use email below — that signs you in now.");
      return;
    }
    const res = await signIn(provider, { callbackUrl: "/account", redirect: false });
    if (res?.error) setError(res.error);
    else if (res?.url) window.location.href = res.url;
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await signIn("credentials", { email, callbackUrl: "/account", redirect: false });
    setBusy(false);
    if (!res || res.error) {
      setError("Enter a valid email, then try again.");
      return;
    }
    window.location.href = res.url || "/account";
  }

  return (
    <div className={compact ? "auth-compact" : "auth-actions"}>
      <form className="form" onSubmit={onEmail} style={{ width: "100%" }}>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="go" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Continue with email"}
        </button>
      </form>
      <button className="oauth google" type="button" onClick={() => start("google")}>
        Continue with Gmail
      </button>
      <button className="oauth x" type="button" onClick={() => start("twitter")}>
        Continue with X
      </button>
      {error && <p className="meta">{error}</p>}
    </div>
  );
}
