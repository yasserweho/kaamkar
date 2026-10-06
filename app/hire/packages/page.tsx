"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PACKAGES, saveJson, loadJson } from "@/lib/portal";

export default function PackagesPage() {
  return <Shell><Packs /></Shell>;
}

function Packs() {
  const [sent, setSent] = useState("");
  function ask(name: string) {
    const leads = loadJson<string[]>("kaamkar_leads", []);
    leads.unshift(name);
    saveJson("kaamkar_leads", leads);
    setSent(name);
  }
  return (
    <div className="wrap section">
      <div className="page-head"><h1>Hiring packages</h1><p className="meta">Same product types as a full job board. Request is saved locally until billing is connected.</p></div>
      <div className="grid">
        {PACKAGES.map((p) => (
          <article className="card" key={p.name}>
            <strong>{p.name}</strong>
            <p className="salary">{p.price}</p>
            {p.points.map((x) => <p className="meta" key={x}>{x}</p>)}
            <button className="go" onClick={() => ask(p.name)}>Request</button>
          </article>
        ))}
      </div>
      {sent && <p className="ok" style={{ marginTop: 16 }}>Request saved for {sent}.</p>}
    </div>
  );
}
