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
      <form className="form full" onSubmit={onEmail}>
        <label htmlFor="signin-email">Email</label>
        <input
          id="signin-email"
          type="email"
          aria-label="Email"
          required
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="go" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Continue with email"}
        </button>
      </form>
      <div className="oauth-row">
        <button className="oauth google" type="button" onClick={() => start("google")}>
          <GoogleMark />
          Google
        </button>
        <button className="oauth x" type="button" onClick={() => start("twitter")}>
          <XMark />
          X
        </button>
      </div>
      {error && <p className="meta">{error}</p>}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M9.3 6.77 14.7 1h-1.28L8.73 5.98 4.86 1H.5l5.66 8.24L.5 15h1.28l4.95-5.76L11.14 15h4.36L9.3 6.77Zm-1.75 2.04-.57-.82L2.24 1.91h1.96l3.68 5.27.57.82 4.79 6.85h-1.96L7.55 8.81Z" />
    </svg>
  );
}
