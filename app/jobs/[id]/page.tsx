"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SEED_JOBS, type Job } from "@/lib/jobs";
import { Shell } from "@/components/Shell";

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
  return [...extra, ...SEED_JOBS].find((j) => j.id === id);
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
  if (!job) {
    return (
      <div className="wrap page-head">
        <p>Job not found.</p>
      </div>
    );
  }
  const wa = job.applyWhatsApp
    ? `https://wa.me/${job.applyWhatsApp}?text=${encodeURIComponent("Hello, I am applying for " + job.title + " via Kaamkar")}`
    : null;
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="meta">
          {job.city}, {job.country} · {job.category}
        </div>
        <h1>{job.title}</h1>
        <p className="meta">{job.company}</p>
      </div>
      <div className="detail">
        <div className="panel">
          <p>{job.description}</p>
          <p>
            <strong>Experience:</strong> {job.experience}
          </p>
          <div className="tags">
            {job.visa && <span className="tag">Visa</span>}
            {job.housing && <span className="tag">Housing</span>}
            {job.tags.map((x) => (
              <span className="tag" key={x}>
                {x}
              </span>
            ))}
          </div>
        </div>
        <aside className="panel">
          <div className="salary" style={{ fontSize: 20 }}>
            {job.salary}
          </div>
          <p className="meta">{job.type}</p>
          <div className="form" style={{ marginTop: 12 }}>
            <Link className="go" href={`/apply/${job.id}`} style={{ textAlign: "center" }}>
              Apply now
            </Link>
            {wa && (
              <a className="chip" href={wa} target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
                WhatsApp
              </a>
            )}
            {job.applyEmail && (
              <a className="chip" href={`mailto:${job.applyEmail}`} style={{ textAlign: "center" }}>
                {job.applyEmail}
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
