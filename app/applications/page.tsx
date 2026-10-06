"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { SEED_JOBS } from "@/lib/jobs";
import { loadJson } from "@/lib/portal";

export default function ApplicationsPage() {
  return <Shell><List /></Shell>;
}

function List() {
  const [apps, setApps] = useState<Array<Record<string, string>>>([]);
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    setApps(loadJson("kaamkar_apps", []));
    setSaved(loadJson("kaamkar_saved", []));
  }, []);
  const savedJobs = SEED_JOBS.filter((j) => saved.includes(j.id));
  return (
    <div className="wrap section">
      <div className="page-head"><h1>Applications and saved jobs</h1></div>
      <div className="grid">
        {apps.map((a, i) => (
          <div className="card" key={i}>
            <strong>{a.title}</strong>
            <p className="meta">{a.company} · {a.status || "Submitted"}{a.priority ? " · Priority" : ""}</p>
            <p className="meta">{a.salary} · {a.cnic}</p>
          </div>
        ))}
        {apps.length === 0 && <p className="meta">No applications yet.</p>}
      </div>
      <h2>Saved</h2>
      <div className="grid">
        {savedJobs.map((j) => <Link className="card" key={j.id} href={`/jobs/${j.id}`}><strong>{j.title}</strong><p className="meta">{j.company}</p></Link>)}
      </div>
    </div>
  );
}
