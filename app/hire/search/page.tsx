"use client";

import { useMemo, useState } from "react";
import { Shell } from "@/components/Shell";
import { CANDIDATES } from "@/lib/portal";

export default function SearchPage() {
  return <Shell><Search /></Shell>;
}

function Search() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const rows = useMemo(() => CANDIDATES.filter((c) => {
    const hay = `${c.name} ${c.title} ${c.skills.join(" ")} ${c.about}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (city && c.city !== city) return false;
    return true;
  }), [q, city]);
  return (
    <div className="wrap section">
      <div className="page-head"><h1>CV search</h1><p className="meta">Search candidates who may not have applied. Download is a preview.</p></div>
      <div className="filters">
        <input className="chip" aria-label="Skill or title" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Skill or title" />
        <input className="chip" aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
      </div>
      <div className="grid">
        {rows.map((c) => (
          <article className="card" key={c.id}>
            <strong>{c.name}</strong>
            <p className="meta">{c.title} · {c.city} · {c.experience}</p>
            <p>{c.about}</p>
            <p className="meta">{c.skills.join(", ")} · {c.salary}</p>
            <a className="chip" href={`https://wa.me/${c.phone}`}>WhatsApp</a>
          </article>
        ))}
      </div>
    </div>
  );
}
