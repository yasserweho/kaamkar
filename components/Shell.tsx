"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useSession } from "next-auth/react";

export function Shell({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  return (
    <>
      <header className="topbar">
        <div className="wrap nav">
          <Link href="/" aria-label="Kaamkar home">
            <Logo />
          </Link>
          <nav className="nav-links">
            <Link href="/jobs">Jobs</Link>
            <Link href="/post">Post a job</Link>
            <Link href="/account">{data?.user ? data.user.name?.split(" ")[0] || "Account" : "Sign in"}</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="foot">
        <div className="wrap">Kaamkar · Jobs for Pakistan, Asia and the Middle East · kaamkar.com</div>
      </footer>
    </>
  );
}
