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

  useEffect(() => {
    setPeople(JSON.parse(localStorage.getItem("kaamkar_people") || "[]"));
  }, []);

  return (
    <Shell>
      <div className="wrap" style={{ paddingBottom: 64 }}>
        <div className="page-head">
          <h1>People</h1>
          <p className="meta">Job seekers and employers saved from this browser.</p>
        </div>
        {people.length === 0 ? (
          <p className="meta">No profiles yet. <a href="/account">Post yourself</a>.</p>
        ) : (
          people.map((person) => (
            <article className="panel" key={`${person.email}-${person.phone}`} style={{ marginBottom: 12 }}>
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
