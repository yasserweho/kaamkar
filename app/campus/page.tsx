"use client";

import { Shell } from "@/components/Shell";
import { CAMPUSES } from "@/lib/portal";
import { SEED_JOBS } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";

export default function CampusPage() {
  const internships = SEED_JOBS.filter((j) => /junior|fresh|no experience/i.test(`${j.title} ${j.experience}`));
  return (
    <Shell>
      <div className="wrap section">
        <div className="page-head">
          <h1>Campus hiring</h1>
          <p className="meta">Internships and trainee roles for students and fresh graduates.</p>
        </div>
        <div className="pills">{CAMPUSES.map((c) => <span className="pill" key={c}>{c}</span>)}</div>
        <div className="grid" style={{ marginTop: 18 }}>
          {internships.map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      </div>
    </Shell>
  );
}
