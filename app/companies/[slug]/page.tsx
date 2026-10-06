"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Shell } from "@/components/Shell";
import { COMPANIES } from "@/lib/portal";
import { SEED_JOBS } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";

export default function CompanyPage() {
  return <Shell><View /></Shell>;
}

function View() {
  const { slug } = useParams<{ slug: string }>();
  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) return <div className="wrap page-head">Company not found. <Link href="/companies">All employers</Link></div>;
  const jobs = SEED_JOBS.filter((j) => j.company.toLowerCase().includes(company.name.split(" ")[0].toLowerCase()));
  return (
    <div className="wrap section">
      <div className="page-head">
        <h1>{company.name}</h1>
        <p className="meta">{company.city} · {company.industry}{company.top ? " · Top employer" : ""}</p>
        <p>{company.about}</p>
      </div>
      <div className="grid">{jobs.map((j) => <JobCard key={j.id} job={j} />)}</div>
      {jobs.length === 0 && <p className="meta">No open roles right now.</p>}
    </div>
  );
}
