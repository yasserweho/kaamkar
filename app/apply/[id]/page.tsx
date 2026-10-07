"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SEED_JOBS, type Job } from "@/lib/jobs";
import { Shell } from "@/components/Shell";
import { loadJson } from "@/lib/portal";
import { jobSlug } from "@/lib/site";

function findJob(id: string | undefined): Job | undefined {
  if (!id) return undefined;
  let extra: Job[] = [];
  if (typeof window !== "undefined") {
    try { extra = JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]"); } catch { extra = []; }
  }
  return [...extra, ...SEED_JOBS].find((j) => j.id === id || jobSlug(j.title, j.city) === id);
}

export default function ApplyPage() {
  return <Shell><Form /></Shell>;
}

function Form() {
  const { id } = useParams<{ id: string }>();
  const job = findJob(id);
  const [done, setDone] = useState(false);
  const [cv, setCv] = useState<Record<string, string>>({});
  const priority = typeof window !== "undefined" && localStorage.getItem("kaamkar_priority") === "1";

  useEffect(() => {
    setCv(loadJson("kaamkar_cv", {}));
  }, []);

  if (!job) return <div className="wrap page-head">Job not found.</div>;
  const listing = job;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const apps = loadJson<Array<Record<string, unknown>>>("kaamkar_apps", []);
    apps.unshift({ ...data, jobId: listing.id, title: listing.title, company: listing.company, priority, at: new Date().toISOString(), status: "Submitted" });
    localStorage.setItem("kaamkar_apps", JSON.stringify(apps));
    setDone(true);
  }

  return (
    <div className="wrap narrow section">
      <div className="page-head">
        <h1>Apply — {listing.title}</h1>
        <p className="meta">{listing.company} · {listing.city}. {priority ? "Priority applicant is on." : "Standard application."}</p>
      </div>
      {done ? (
        <div className="ok">Application saved. Track it under <Link href="/applications">My applications</Link>.</div>
      ) : (
        <form className="form panel" onSubmit={onSubmit}>
          <label>Full name</label>
          <input name="name" required defaultValue={cv.name || ""} />
          <label>Phone / WhatsApp</label>
          <input name="phone" required placeholder="92…" defaultValue={cv.phone || ""} />
          <label>Email</label>
          <input name="email" type="email" defaultValue={cv.email || ""} />
          <label>CNIC</label>
          <input name="cnic" required placeholder="35202-1234567-1" defaultValue={cv.cnic || ""} />
          <label>Expected salary</label>
          <input name="salary" required placeholder="PKR 80,000" defaultValue={cv.salary || ""} />
          <label>City</label>
          <input name="city" defaultValue={cv.city || ""} />
          <label>Cover letter</label>
          <textarea name="cover" rows={5} defaultValue={cv.cover || ""} placeholder="Why you fit this role" />
          <p className="meta">No CV yet? <Link href="/cv">Build one</Link>. Want the top of the pile? <Link href="/priority">Priority applicant</Link>.</p>
          <button className="go" type="submit">Submit application</button>
        </form>
      )}
    </div>
  );
}
