"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { CANDIDATES } from "@/lib/portal";
import { SEED_JOBS } from "@/lib/jobs";

export default function MatchPage() {
  return <Shell><Match /></Shell>;
}

function Match() {
  const [id, setId] = useState(SEED_JOBS[0].id);
  const job = SEED_JOBS.find((j) => j.id === id)!;
  const ranked = CANDIDATES.map((c) => {
    const score = c.skills.filter((s) => `${job.title} ${job.tags.join(" ")} ${job.category}`.toLowerCase().includes(s.toLowerCase())).length;
    return { c, score };
  }).sort((a, b) => b.score - a.score);
  return (
    <div className="wrap section">
      <div className="page-head"><h1>InstaMatch</h1><p className="meta">Suggested candidates for a posting. Invite is saved as a note on this device.</p></div>
      <select className="chip" value={id} onChange={(e) => setId(e.target.value)}>
        {SEED_JOBS.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
      </select>
      <div className="grid stack">
        {ranked.map(({ c, score }) => (
          <article className="card" key={c.id}>
            <strong>{c.name}</strong>
            <p className="meta">{c.title} · match {score}</p>
            <p>{c.about}</p>
            <button className="chip" onClick={() => alert(`Invite queued for ${c.name} on ${job.title}`)}>Invite</button>
          </article>
        ))}
      </div>
    </div>
  );
}
