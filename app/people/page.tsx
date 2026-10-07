"use client";

import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";

type Person = {
  name: string;
  role: "seeker" | "employer";
  phone: string;
  city: string;
  title: string;
  email: string;
  about: string;
};

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profiles")
      .then((response) => response.json())
      .then((data) => setPeople(Array.isArray(data) ? data : []))
      .catch(() => setPeople([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell>
      <div className="wrap section">
        <div className="page-head">
          <h1>People</h1>
          <p className="meta">Job seekers and employers posted on Kaamkar.</p>
        </div>
        {loading ? (
          <p className="meta">Loading…</p>
        ) : people.length === 0 ? (
          <p className="meta">No profiles yet. <a href="/account">Post yourself</a>.</p>
        ) : (
          people.map((person) => (
            <article className="panel stack" key={`${person.email}-${person.phone}`}>
              <strong>{person.name}</strong>
              <p className="meta">{person.role === "employer" ? "Employer" : "Job seeker"} · {person.title} · {person.city}</p>
              <p>{person.about}</p>
              <p className="meta">WhatsApp {person.phone} · {person.email}</p>
            </article>
          ))
        )}
      </div>
    </Shell>
  );
}
