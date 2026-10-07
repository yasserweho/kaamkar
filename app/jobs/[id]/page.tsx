"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SEED_JOBS, type Job } from "@/lib/jobs";
import { Shell } from "@/components/Shell";
import { HIGHLIGHT, loadJson, saveJson } from "@/lib/portal";
import { jobSlug } from "@/lib/site";

function findJob(id: string | undefined): Job | undefined {
  if (!id) return undefined;
  let extra: Job[] = [];
  if (typeof window !== "undefined") {
    try {
      extra = JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
    } catch {
      extra = [];
    }
  }
  return [...extra, ...SEED_JOBS].find((j) => j.id === id || jobSlug(j.title, j.city) === id);
}

export default function JobPage() {
  return (
    <Shell>
      <Detail />
    </Shell>
  );
}

function Detail() {
  const { id } = useParams<{ id: string }>();
  const job = findJob(id);
  const [saved, setSaved] = useState(false);
  if (!job) return <div className="wrap page-head"><p>Job not found.</p></div>;
  const wa = job.applyWhatsApp
    ? `https://wa.me/${job.applyWhatsApp}?text=${encodeURIComponent("Hello, I am applying for " + job.title + " via Kaamkar")}`
    : null;
  const highlight = HIGHLIGHT[job.id];

  function save() {
    const ids = loadJson<string[]>("kaamkar_saved", []);
    if (!ids.includes(job!.id)) ids.unshift(job!.id);
    saveJson("kaamkar_saved", ids);
    setSaved(true);
  }

  return (
    <div className="wrap">
      <div className="page-head">
        <div className="meta">{job.city}, {job.country} · {job.category}{highlight ? ` · ${highlight}` : ""}</div>
        <h1>{job.title}</h1>
        <p className="meta"><Link href={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}>{job.company}</Link></p>
      </div>
      <div className="detail">
        <div className="panel">
          <p>{job.description}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <div className="tags">
            {job.visa && <span className="tag">Visa</span>}
            {job.housing && <span className="tag">Housing</span>}
            {job.tags.map((x) => <span className="tag" key={x}>{x}</span>)}
          </div>
        </div>
        <aside className="panel">
          <div className="salary salary salary-lg">{job.salary}</div>
          <p className="meta">{job.type} · {job.posted}</p>
          <div className="form stack">
            <Link className="go center-link" href={`/apply/${job.id}`}>Apply now</Link>
            <button className="chip" onClick={save}>{saved ? "Saved" : "Save job"}</button>
            <Link className="chip center-link" href="/alerts">Alert me</Link>
            {wa && <a className="chip center-link" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>}
            {job.applyEmail && <a className="chip center-link" href={`mailto:${job.applyEmail}`}>{job.applyEmail}</a>}
          </div>
        </aside>
      </div>
    </div>
  );
}
