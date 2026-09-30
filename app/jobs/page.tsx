"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, CITIES, SEED_JOBS, filterJobs, type Job } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { Shell } from "@/components/Shell";

function extras(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
  } catch {
    return [];
  }
}

export default function JobsPage() {
  return (
    <Shell>
      <Suspense fallback={<div className="wrap page-head">Loading…</div>}>
        <List />
      </Suspense>
    </Shell>
  );
}

function List() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [gulf, setGulf] = useState(false);
  const extra = extras();
  const jobs = useMemo(
    () => filterJobs([...extra, ...SEED_JOBS], q, category, location, gulf),
    [q, category, location, gulf, extra.length],
  );
  return (
    <div className="wrap section">
      <div className="page-head">
        <h1>All jobs</h1>
      </div>
      <div className="filters">
        <input className="chip" style={{ minWidth: 200 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
        <select className="chip" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="chip" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Location</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className="chip" onClick={() => setGulf((v) => !v)}>
          {gulf ? "All markets" : "Gulf only"}
        </button>
      </div>
      <div className="grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
