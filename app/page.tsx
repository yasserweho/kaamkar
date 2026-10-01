"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, CITIES, SEED_JOBS, filterJobs, type Job } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { Shell } from "@/components/Shell";

function loadExtra(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
  } catch {
    return [];
  }
}

export default function HomePage() {
  return (
    <Shell>
      <Home />
    </Shell>
  );
}

function Home() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [gulf, setGulf] = useState(false);
  const extras = typeof window === "undefined" ? [] : loadExtra();
  const jobs = useMemo(
    () => filterJobs([...extras, ...SEED_JOBS], q, category, location, gulf),
    [q, category, location, gulf, extras.length],
  );

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Find work from Pakistan to the Gulf</h1>
          <p>Office roles, skilled trades, driving, and visa jobs across Pakistan and the Gulf — in one board.</p>
          <div className="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job, skill, company…" />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">City / country</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option>Pakistan</option>
              <option>UAE</option>
              <option>Saudi Arabia</option>
              <option>Qatar</option>
            </select>
            <Link className="go" href={`/jobs?q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}`} style={{ textAlign: "center" }}>
              Search
            </Link>
          </div>
          <div className="pills">
            <button className="pill" onClick={() => setGulf((v) => !v)}>
              {gulf ? "All jobs" : "Gulf / visa only"}
            </button>
            {CATEGORIES.slice(0, 6).map((c) => (
              <button key={c} className="pill" onClick={() => setCategory(category === c ? "" : c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="row" style={{ marginBottom: 14 }}>
            <strong>{jobs.length} open roles</strong>
            <Link href="/post">Post a job</Link>
          </div>
          <div className="grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
