"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CATEGORIES, CITIES, SEED_JOBS, filterJobs, type Job } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { Shell } from "@/components/Shell";
import { COMPANIES, HIGHLIGHT } from "@/lib/portal";

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
  const premium = SEED_JOBS.filter((j) => HIGHLIGHT[j.id] === "Premium" || HIGHLIGHT[j.id] === "Top");
  const senior = SEED_JOBS.filter((j) => /manager|senior|head|consultant/i.test(j.title));

  return (
    <>
      <section className="hero hero-stage">
        <Image className="hero-bg" src="/hero-mix2.jpg" alt="Pakistani graduates and professionals of different ages looking for jobs" width={1176} height={784} priority />
        <div className="hero-shade" />
        <div className="wrap hero-copy">
          <p className="eyebrow">Kaamkar · Pakistan & the Gulf</p>
          <h1>Find work from Pakistan to the Gulf</h1>
          <p>Search, apply, build a CV, and get alerts. Employers can post, shortlist, and search candidates.</p>
          <div className="search search-over">
            <input aria-label="Job, skill or company" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job, skill, company…" />
            <select aria-label="City or country" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">City / country</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option>Pakistan</option>
              <option>UAE</option>
              <option>Saudi Arabia</option>
              <option>Qatar</option>
            </select>
            <Link className="go search-go" href={`/jobs?q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}`}>
              Search
            </Link>
          </div>
          <div className="pills">
            <button className="pill" onClick={() => setGulf((v) => !v)}>{gulf ? "All jobs" : "Gulf / visa only"}</button>
            {CATEGORIES.slice(0, 6).map((c) => (
              <button key={c} className="pill" onClick={() => setCategory(category === c ? "" : c)}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="row section-head">
            <h2>Premium and top jobs</h2>
            <Link href="/hire/packages">Highlight a job</Link>
          </div>
          <div className="grid">
            {premium.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="row section-head">
            <h2>Top employers</h2>
            <Link href="/companies">View all</Link>
          </div>
          <div className="pills">
            {COMPANIES.filter((c) => c.top).map((c) => (
              <Link className="pill" key={c.slug} href={`/companies/${c.slug}`}>{c.name}</Link>
            ))}
          </div>
          <div className="row section-head">
            <h2>{jobs.length} open roles</h2>
            <Link href="/post">Post a job</Link>
          </div>
          <div className="grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="row section-head">
            <h2>Senior management jobs</h2>
            <Link href="/jobs?q=manager">View senior roles</Link>
          </div>
          <div className="grid">
            {senior.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="prose">
            <h2>Jobs across Pakistan and the Gulf</h2>
            <p>
              Kaamkar lists office roles, skilled trades, driving and visa jobs. Search by city and industry, save a role, and apply with a CV. Employers can post a job, search candidates and shortlist applicants.
            </p>
            <p>
              Start with <a href="/jobs?location=Lahore">Lahore jobs</a>, <a href="/jobs?location=Karachi">Karachi jobs</a>, <a href="/jobs?location=Dubai">Dubai jobs</a>, or read the <a href="/guides">job search guides</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
