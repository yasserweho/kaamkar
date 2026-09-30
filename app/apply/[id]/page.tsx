"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { SEED_JOBS, type Job } from "@/lib/jobs";
import { Shell, useLang } from "@/components/Shell";

function findJob(id: string | undefined): Job | undefined {
  if (!id || typeof window === "undefined") {
    return SEED_JOBS.find((j) => j.id === id);
  }
  try {
    const extra: Job[] = JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
    return [...extra, ...SEED_JOBS].find((j) => j.id === id);
  } catch {
    return SEED_JOBS.find((j) => j.id === id);
  }
}

export default function ApplyPage() {
  return (
    <Shell>
      <Form />
    </Shell>
  );
}

function Form() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();
  const job = findJob(id);
  const [done, setDone] = useState(false);

  if (!job) {
    return <div className="wrap page-head">{t("نوکری نہیں ملی", "Job not found.")}</div>;
  }

  const listing = job;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const raw = localStorage.getItem("kaamkar_apps") || "[]";
    const apps: Array<Record<string, unknown>> = JSON.parse(raw);
    apps.unshift({
      ...data,
      jobId: listing.id,
      title: listing.title,
      at: new Date().toISOString(),
    });
    localStorage.setItem("kaamkar_apps", JSON.stringify(apps));
    setDone(true);
  }

  return (
    <div className="wrap" style={{ maxWidth: 640, paddingBottom: 64 }}>
      <div className="page-head">
        <h1>
          {t("اپلائی", "Apply")} — {listing.title}
        </h1>
      </div>
      {done ? (
        <div className="ok">
          {t(
            "درخواست محفوظ ہو گئی۔ ایمپلائر کو واٹس ایپ یا ای میل سے بھی بھیج سکتے ہیں۔",
            "Application saved on this device. Also message the employer on WhatsApp or email if listed.",
          )}
        </div>
      ) : (
        <form className="form panel" onSubmit={onSubmit}>
          <label>{t("پورا نام", "Full name")}</label>
          <input name="name" required />
          <label>{t("فون / واٹس ایپ", "Phone / WhatsApp")}</label>
          <input name="phone" required placeholder="92…" />
          <label>Email</label>
          <input name="email" type="email" />
          <label>{t("شہر", "City")}</label>
          <input name="city" />
          <label>{t("تجربہ", "Experience")}</label>
          <input name="experience" placeholder="e.g. 3 years HTV" />
          <label>{t("تعارف", "Short note")}</label>
          <textarea name="note" rows={4} />
          <button className="go" type="submit">
            {t("جمع کرائیں", "Submit application")}
          </button>
        </form>
      )}
    </div>
  );
}
