"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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

export default function ApplyPage() {
  return (
    <Shell>
      <Form />
    </Shell>
  );
}

function Form() {
  const { id } = useParams<{ id: string }>();
  const job = findJob(id);
  const [done, setDone] = useState(false);

  if (!job) {
    return <div className="wrap page-head">Job not found.</div>;
  }

  const listing = job;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const apps: Array<Record<string, unknown>> = JSON.parse(localStorage.getItem("kaamkar_apps") || "[]");
    apps.unshift({
      ...data,
      jobId: listing.id,
      title: listing.title,
      at: new Date().toISOString(),
    });
    localStorage.setItem("kaamkar_apps", JSON.stringify(apps));
    setDone(true);
  }

  return (
    <div className="wrap" style={{ maxWidth: 640, paddingBottom: 64 }}>
      <div className="page-head">
        <h1>Apply — {listing.title}</h1>
      </div>
      {done ? (
        <div className="ok">Application saved on this device. Also message the employer on WhatsApp or email if listed.</div>
      ) : (
        <form className="form panel" onSubmit={onSubmit}>
          <label>Full name</label>
          <input name="name" required />
          <label>Phone / WhatsApp</label>
          <input name="phone" required placeholder="92…" />
          <label>Email</label>
          <input name="email" type="email" />
          <label>City</label>
          <input name="city" />
          <label>Experience</label>
          <input name="experience" placeholder="e.g. 3 years HTV" />
          <label>Short note</label>
          <textarea name="note" rows={4} />
          <button className="go" type="submit">
            Submit application
          </button>
        </form>
      )}
    </div>
  );
}
