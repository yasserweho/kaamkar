"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { loadJson, saveJson } from "@/lib/portal";

const empty = { name: "", title: "", city: "Islamabad", phone: "", email: "", cnic: "", salary: "", education: "", experience: "", skills: "", about: "", cover: "" };

export default function CvPage() {
  return <Shell><Builder /></Shell>;
}

function Builder() {
  const [cv, setCv] = useState(empty);
  const [saved, setSaved] = useState(false);
  useEffect(() => setCv({ ...empty, ...loadJson("kaamkar_cv", {}) }), []);

  function set(key: string, value: string) {
    setCv((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  return (
    <div className="wrap section">
      <div className="page-head">
        <h1>CV and cover letter</h1>
        <p className="meta">Stored on this device and reused when you apply.</p>
      </div>
      <div className="detail">
        <form className="form panel" onSubmit={(e) => { e.preventDefault(); saveJson("kaamkar_cv", cv); setSaved(true); }}>
          {(["name", "title", "city", "phone", "email", "cnic", "salary", "education", "skills"] as const).map((key) => (
            <span key={key}>
              <label>{key}</label>
              <input value={cv[key]} onChange={(e) => set(key, e.target.value)} />
            </span>
          ))}
          <label>Experience</label>
          <textarea rows={3} value={cv.experience} onChange={(e) => set("experience", e.target.value)} />
          <label>About</label>
          <textarea rows={3} value={cv.about} onChange={(e) => set("about", e.target.value)} />
          <label>Cover letter</label>
          <textarea rows={4} value={cv.cover} onChange={(e) => set("cover", e.target.value)} placeholder="I am applying because…" />
          <button className="go" type="submit">Save CV</button>
          {saved && <p className="ok">Saved.</p>}
        </form>
        <aside className="panel">
          <strong>{cv.name || "Your name"}</strong>
          <p className="meta">{cv.title || "Job title"} · {cv.city}</p>
          <p>{cv.about || "Short profile appears here."}</p>
          <p className="meta">{cv.education}</p>
          <p className="meta">{cv.experience}</p>
          <p className="meta">{cv.skills}</p>
          <p>{cv.cover}</p>
        </aside>
      </div>
    </div>
  );
}
