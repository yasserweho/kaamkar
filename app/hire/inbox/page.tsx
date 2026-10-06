"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { loadJson, saveJson } from "@/lib/portal";

type App = Record<string, string> & { rating?: number; folder?: string; note?: string };

export default function InboxPage() {
  return <Shell><Inbox /></Shell>;
}

function Inbox() {
  const [apps, setApps] = useState<App[]>([]);
  useEffect(() => setApps(loadJson("kaamkar_apps", [])), []);
  function update(i: number, patch: Partial<App>) {
    const next = apps.map((a, idx) => (idx === i ? { ...a, ...patch } : a));
    setApps(next);
    saveJson("kaamkar_apps", next);
  }
  return (
    <div className="wrap section">
      <div className="page-head"><h1>Applicant inbox</h1><p className="meta">{apps.length} applications on this device.</p></div>
      <div className="grid">
        {apps.map((a, i) => (
          <div className="card" key={i}>
            <strong>{a.name || "Applicant"} — {a.title}</strong>
            <p className="meta">{a.city} · {a.salary} · {a.phone}</p>
            <p>{a.cover || a.note}</p>
            <div className="filters">
              <button className="chip" onClick={() => update(i, { folder: "Shortlist" })}>Shortlist</button>
              <button className="chip" onClick={() => update(i, { rating: String(Number(a.rating || 0) + 1) })}>Rate {a.rating || 0}</button>
              <button className="chip" onClick={() => update(i, { note: "Viewed cover letter" })}>Mark viewed</button>
            </div>
            <p className="meta">{a.folder || "Inbox"} {a.note ? `· ${a.note}` : ""}</p>
          </div>
        ))}
        {apps.length === 0 && <p className="meta">Apply to a job in this browser to see it here.</p>}
      </div>
    </div>
  );
}
