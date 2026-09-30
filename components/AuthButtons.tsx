"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons({ compact = false }: { compact?: boolean }) {
  const { data, status } = useSession();

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

  return (
    <div className={compact ? "auth-compact" : "auth-actions"}>
      <button className="oauth google" type="button" onClick={() => signIn("google", { callbackUrl: "/account" })}>
        Continue with Gmail
      </button>
      <button className="oauth x" type="button" onClick={() => signIn("twitter", { callbackUrl: "/account" })}>
        Continue with X
      </button>
    </div>
  );
}
