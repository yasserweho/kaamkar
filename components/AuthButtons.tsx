"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Providers = Record<string, { id: string; name: string }>;

export function AuthButtons({ compact = false }: { compact?: boolean }) {
  const { data, status } = useSession();
  const [providers, setProviders] = useState<Providers | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((r) => r.json())
      .then((p) => setProviders(p || {}))
      .catch(() => setProviders({}));
  }, []);

  if (status === "loading" || providers === null) {
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
      setError(
        provider === "google"
          ? "Gmail is not configured on this deploy. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET in Vercel, then redeploy."
          : "X is not configured on this deploy. Add AUTH_TWITTER_ID and AUTH_TWITTER_SECRET in Vercel, then redeploy.",
      );
      return;
    }
    const res = await signIn(provider, { callbackUrl: "/account", redirect: false });
    if (res?.error) setError(res.error);
    else if (res?.url) window.location.href = res.url;
  }

  return (
    <div className={compact ? "auth-compact" : "auth-actions"}>
      <button className="oauth google" type="button" onClick={() => start("google")}>
        Continue with Gmail
      </button>
      <button className="oauth x" type="button" onClick={() => start("twitter")}>
        Continue with X
      </button>
      {error && <p className="meta">{error}</p>}
      {!providers.google && !providers.twitter && (
        <p className="meta">
          Sign-in is off until the Google and X client keys are saved in Vercel. The buttons cannot start OAuth without them.
        </p>
      )}
    </div>
  );
}
