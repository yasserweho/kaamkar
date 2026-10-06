"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { SEED_JOBS } from "@/lib/jobs";
import { loadJson, saveJson } from "@/lib/portal";

type Alert = { q: string; city: string; channel: string };

export default function AlertsPage() {
  return <Shell><Alerts /></Shell>;
}

function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [channel, setChannel] = useState("Email");
  useEffect(() => setAlerts(loadJson("kaamkar_alerts", [])), []);

  function add(e: React.FormEvent) {
    e.preventDefault();
    const next = [{ q, city, channel }, ...alerts];
    setAlerts(next);
    saveJson("kaamkar_alerts", next);
    setQ("");
  }

  const hits = SEED_JOBS.filter((j) => alerts.some((a) => {
    const text = `${j.title} ${j.company} ${j.category}`.toLowerCase();
    return (!a.q || text.includes(a.q.toLowerCase())) && (!a.city || j.city === a.city);
  }));

  return (
    <div className="wrap section">
      <div className="page-head">
        <h1>Job alerts</h1>
        <p className="meta">Email, SMS, and app-style alerts. Matches show here on this device.</p>
      </div>
      <form className="filters" onSubmit={add}>
        <input className="chip" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Keyword, e.g. driver" />
        <input className="chip" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        <select className="chip" value={channel} onChange={(e) => setChannel(e.target.value)}>
          <option>Email</option>
          <option>SMS</option>
          <option>App push</option>
        </select>
        <button className="go" type="submit">Save alert</button>
      </form>
      <div className="grid">
        {alerts.map((a, i) => (
          <div className="card" key={i}><strong>{a.q || "All jobs"}</strong><p className="meta">{a.city || "Any city"} · {a.channel}</p></div>
        ))}
      </div>
      <h2 style={{ marginTop: 28 }}>Matching now</h2>
      <div className="grid">
        {hits.map((j) => (
          <Link className="card" key={j.id} href={`/jobs/${j.id}`}><strong>{j.title}</strong><p className="meta">{j.company} · {j.city}</p></Link>
        ))}
      </div>
    </div>
  );
}
