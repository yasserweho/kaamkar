"use client";
import { useMemo, useState } from "react";
import { CATEGORIES, CITIES, SEED_JOBS, filterJobs, type Job } from "@/lib/jobs";
import { Shell, useLang } from "@/components/Shell";
import { JobCard } from "../page";
function extras(): Job[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]"); } catch { return []; }
}
export default function JobsPage() { return <Shell><List /></Shell>; }
function List() {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [gulf, setGulf] = useState(false);
  const extra = extras();
  const jobs = useMemo(() => filterJobs([...extra, ...SEED_JOBS], q, category, location, gulf), [q, category, location, gulf, extra.length]);
  return (
    <div className="wrap section">
      <div className="page-head"><h1>{t("تمام نوکریاں", "All jobs")}</h1></div>
      <div className="filters">
        <input className="chip" style={{ minWidth: 200 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("تلاش", "Search")} />
        <select className="chip" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{t("کیٹگری", "Category")}</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="chip" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">{t("مقام", "Location")}</option>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="chip" onClick={() => setGulf((v) => !v)}>{gulf ? t("تمام", "All markets") : t("گلف", "Gulf only")}</button>
      </div>
      <div className="grid">{jobs.map((job) => <JobCard key={job.id} job={job} ur={lang === "ur"} />)}</div>
    </div>
  );
}
