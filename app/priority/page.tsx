"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";

export default function PriorityPage() {
  return <Shell><Box /></Shell>;
}

function Box() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(localStorage.getItem("kaamkar_priority") === "1"), []);
  function toggle() {
    const next = !on;
    setOn(next);
    localStorage.setItem("kaamkar_priority", next ? "1" : "0");
  }
  return (
    <div className="wrap section narrow">
      <h1>Priority applicant</h1>
      <p className="meta">Puts your application at the top of the employer inbox and marks when the cover letter is viewed. Preview only — no card is charged.</p>
      <div className="panel">
        <strong>6 months · PKR 15,000 preview</strong>
        <p className="meta">Status: {on ? "On for applications from this browser" : "Off"}</p>
        <button className="go" onClick={toggle}>{on ? "Turn off" : "Turn on preview"}</button>
      </div>
    </div>
  );
}
