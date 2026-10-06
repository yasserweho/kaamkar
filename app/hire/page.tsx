"use client";

import Link from "next/link";
import { Shell } from "@/components/Shell";

const items = [
  ["/post", "Post a job", "Create a listing in a few minutes."],
  ["/hire/inbox", "Applicant inbox", "Shortlist, rate, and message applicants."],
  ["/hire/search", "CV search", "Find people who did not apply."],
  ["/hire/match", "InstaMatch", "Suggested candidates for a job."],
  ["/hire/packages", "Packages", "Featured, Top, Premium, CV search, career portal."],
  ["/hire/tools", "Hiring tools", "Interview slots, tests, evaluation forms."],
  ["/campus", "Campus hiring", "Internships across universities."],
  ["/portal", "Career portal", "Branded careers page preview."],
];

export default function HirePage() {
  return (
    <Shell>
      <div className="wrap section">
        <div className="page-head">
          <h1>Hire on Kaamkar</h1>
          <p className="meta">Post, screen, search CVs, and run campus drives. Paid products are previews until checkout is connected.</p>
        </div>
        <div className="grid">
          {items.map(([href, title, text]) => (
            <Link className="card" key={href} href={href}><strong>{title}</strong><p className="meta">{text}</p></Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
