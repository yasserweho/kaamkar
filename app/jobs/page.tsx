"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, CITIES, SEED_JOBS, filterJobs, type Job } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { Shell } from "@/components/Shell";

const TYPES = ["", "Full-time", "Contract", "Daily wage", "Overseas"];

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
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [gulf, setGulf] = useState(false);
  const extra = extras();
  const jobs = useMemo(() => {
    return filterJobs([...extra, ...SEED_JOBS], q, category, location, gulf).filter((j) => {
      if (type && j.type !== type) return false;
      if (level === "senior" && !/manager|senior|head|consultant/i.test(j.title)) return false;
      if (level === "fresh" && !/fresh|junior|no experience/i.test(`${j.title} ${j.experience}`)) return false;
      return true;
    });
  }, [q, category, location, gulf, type, level, extra.length]);

  return (
    <div className="wrap section">
      <div className="page-head">
        <h1>All jobs</h1>
        <p className="meta">Filter by city, industry, type, and experience. {jobs.length} matches.</p>
      </div>
      <div className="filters">
        <input className="chip" style={{ minWidth: 200 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Keyword" />
        <select className="chip" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Industry</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="chip" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">City</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="chip" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t || "Job type"}</option>
          ))}
        </select>
        <select className="chip" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Experience</option>
          <option value="fresh">Fresh / junior</option>
          <option value="senior">Senior / management</option>
        </select>
        <button className="chip" onClick={() => setGulf((v) => !v)}>{gulf ? "All markets" : "Gulf only"}</button>
      </div>
      <div className="grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
