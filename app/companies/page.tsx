"use client";

import Link from "next/link";
import { Shell } from "@/components/Shell";
import { COMPANIES } from "@/lib/portal";

export default function CompaniesPage() {
  return (
    <Shell>
      <div className="wrap section">
        <div className="page-head"><h1>Top employers</h1><p className="meta">Company pages with open roles.</p></div>
        <div className="grid">
          {COMPANIES.map((c) => (
            <Link className="card" key={c.slug} href={`/companies/${c.slug}`}>
              <strong>{c.name}</strong>
              <p className="meta">{c.city} · {c.industry}</p>
              <p>{c.about}</p>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
