"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";

export default function CoachPage() {
  return <Shell><Coach /></Shell>;
}

function Coach() {
  const [title, setTitle] = useState("Company driver");
  const [note, setNote] = useState("");
  function run(e: React.FormEvent) {
    e.preventDefault();
    setNote([
      `Tailor the first line of your CV to “${title}”.`,
      "Add city, licence or certificate, and expected salary.",
      "Keep the cover letter under 120 words and name the company.",
      "Practice: tell me about a problem you solved on the job, in 45 seconds.",
      "For Gulf roles, mention passport, trade test, and visa status.",
    ].join(" "));
  }
  return (
    <div className="wrap section" style={{ maxWidth: 720 }}>
      <h1>Career coach</h1>
      <p className="meta">CV tips, a job-fit check, and a short interview drill. This is an on-site guide, not a live chat model.</p>
      <form className="form panel" onSubmit={run}>
        <label>Role you want</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="go" type="submit">Prepare me</button>
      </form>
      {note && <p className="panel" style={{ marginTop: 16 }}>{note}</p>}
    </div>
  );
}
