"use client";

import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { HIGHLIGHT } from "@/lib/portal";
import { jobSlug } from "@/lib/site";

export function JobCard({ job }: { job: Job }) {
  const highlight = HIGHLIGHT[job.id];
  return (
    <Link className="card" href={`/jobs/${jobSlug(job.title, job.city)}`}>
      <div className="row">
        <div className="meta">
          {job.city}, {job.country}
        </div>
        <div className="tag">{highlight || job.type}</div>
      </div>
      <strong>{job.title}</strong>
      <div className="meta">{job.company}</div>
      <div className="tags">
        {job.visa && <span className="tag">Visa</span>}
        {job.housing && <span className="tag">Housing</span>}
        {job.tags.slice(0, 2).map((x) => (
          <span className="tag" key={x}>{x}</span>
        ))}
      </div>
      <div className="row">
        <span className="salary">{job.salary}</span>
        <span className="meta">{job.posted}</span>
      </div>
    </Link>
  );
}
