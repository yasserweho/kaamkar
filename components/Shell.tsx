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
          <Link href="/" aria-label="kaamkar.com home">
            <Logo />
          </Link>
          <nav className="nav-links">
            <Link href="/jobs">Jobs</Link>
            <Link href="/cv">CV</Link>
            <Link href="/alerts">Alerts</Link>
            <Link href="/hire">Hire</Link>
            <Link href="/account">{data?.user ? data.user.name?.split(" ")[0] || "Account" : "Sign in"}</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="foot">
        <div className="wrap foot-grid">
          <div>
            <strong>Kaamkar</strong>
            <p>Jobs for Pakistan, Asia and the Middle East.</p>
          </div>
          <div>
            <Link href="/jobs">Search jobs</Link>
            <Link href="/cv">CV builder</Link>
            <Link href="/applications">My applications</Link>
            <Link href="/coach">Career coach</Link>
          </div>
          <div>
            <Link href="/companies">Top employers</Link>
            <Link href="/hire/packages">Hiring packages</Link>
            <Link href="/hire/search">CV search</Link>
            <Link href="/campus">Campus hiring</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
