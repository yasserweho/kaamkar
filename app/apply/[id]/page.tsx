"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SEED_JOBS, type Job } from "@/lib/jobs";
import { Shell, useLang } from "@/components/Shell";
function findJob(id: string): Job | undefined {
  const extra: Job[] = typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
  return [...extra, ...SEED_JOBS].find((j) => j.id === id);
}
export default function ApplyPage() { return <Shell><Form /></Shell>; }
function Form() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();
  const job = findJob(id);
  const [done, setDone] = useState(false);
  if (!job) return <div className="wrap page-head">{t("نوکری نہیں ملی", "Job not found.")}</div>;
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const apps = JSON.parse(localStorage.getItem("kaamkar_apps") || "[]");
    apps.unshift({ ...data, jobId: job.id, title: job.title, at: new Date().toISOString() });
    localStorage.setItem("kaamkar_apps", JSON.stringify(apps));
    setDone(true);
  }
  return (
    <div className="wrap" style={{ maxWidth: 640, paddingBottom: 64 }}>
      <div className="page-head"><h1>{t("اپلائی", "Apply")} — {job.title}</h1></div>
      {done ? <div className="ok">{t("درخواست محفوظ ہو گئی۔", "Application saved on this device.")}</div> : (
        <form className="form panel" onSubmit={onSubmit}>
          <label>{t("پورا نام", "Full name")}</label><input name="name" required />
          <label>{t("فون / واٹس ایپ", "Phone / WhatsApp")}</label><input name="phone" required />
          <label>Email</label><input name="email" type="email" />
          <label>{t("شہر", "City")}</label><input name="city" />
          <label>{t("تجربہ", "Experience")}</label><input name="experience" />
          <label>{t("تعارف", "Short note")}</label><textarea name="note" rows={4} />
          <button className="go" type="submit">{t("جمع کرائیں", "Submit application")}</button>
        </form>
      )}
    </div>
  );
}
