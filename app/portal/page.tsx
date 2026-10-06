"use client";

import { Shell } from "@/components/Shell";
import { SEED_JOBS } from "@/lib/jobs";

export default function PortalPage() {
  const jobs = SEED_JOBS.slice(0, 4);
  return (
    <Shell>
      <div className="wrap section">
        <div className="page-head">
          <h1>Career portal preview</h1>
          <p className="meta">A branded careers page you can later embed on a company site.</p>
        </div>
        <div className="panel" style={{ background: "#0f3d2c", color: "#fff" }}>
          <p className="meta" style={{ color: "#d7efe3" }}>Yasser & Co. careers</p>
          <h2>Work with us</h2>
          <div className="grid">
            {jobs.map((j) => (
              <div className="card" key={j.id} style={{ color: "#12201a" }}>
                <strong>{j.title}</strong>
                <p className="meta">{j.city} · {j.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
