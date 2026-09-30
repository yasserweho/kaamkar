"use client";
import { useState } from "react";
import { CATEGORIES, CITIES, type Job } from "@/lib/jobs";
import { Shell, useLang } from "@/components/Shell";
export default function PostPage() { return <Shell><Post /></Shell>; }
function Post() {
  const { t } = useLang();
  const [done, setDone] = useState<string | null>(null);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") || "");
    const country = String(f.get("country") || "Pakistan");
    const job: Job = {
      id: "user-" + Date.now(), title, titleUr: title, company: String(f.get("company") || ""),
      city: String(f.get("city") || ""), country, countryCode: country === "Pakistan" ? "PK" : "AE",
      category: String(f.get("category") || "Sales & Marketing"), type: String(f.get("type") || "Full-time") as Job["type"],
      salary: String(f.get("salary") || "Negotiable"), visa: f.get("visa") === "on", housing: f.get("housing") === "on",
      experience: String(f.get("experience") || "Not specified"), posted: "Just now", tags: ["Employer post"],
      description: String(f.get("description") || ""), descriptionUr: String(f.get("description") || ""),
      applyWhatsApp: String(f.get("whatsapp") || "") || undefined, applyEmail: String(f.get("email") || "") || undefined,
    };
    const jobs: Job[] = JSON.parse(localStorage.getItem("kaamkar_jobs") || "[]");
    jobs.unshift(job);
    localStorage.setItem("kaamkar_jobs", JSON.stringify(jobs));
    setDone(job.id);
  }
  return (
    <div className="wrap" style={{ maxWidth: 720, paddingBottom: 64 }}>
      <div className="page-head"><h1>{t("نوکری لگائیں", "Post a job")}</h1></div>
      {done ? <div className="ok">{t("نوکری لگ گئی۔", "Job posted.")} <a href={`/jobs/${done}`}>{t("دیکھیں", "View")}</a></div> : (
        <form className="form panel" onSubmit={onSubmit}>
          <label>{t("عہدہ", "Job title")}</label><input name="title" required />
          <label>{t("کمپنی", "Company")}</label><input name="company" required />
          <label>{t("کیٹگری", "Category")}</label><select name="category">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <label>{t("قسم", "Type")}</label><select name="type"><option>Full-time</option><option>Contract</option><option>Daily wage</option><option>Overseas</option></select>
          <label>{t("شہر", "City")}</label><select name="city">{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
          <label>{t("ملک", "Country")}</label><select name="country"><option>Pakistan</option><option>UAE</option><option>Saudi Arabia</option><option>Qatar</option><option>Oman</option><option>Kuwait</option><option>Bahrain</option></select>
          <label>{t("تنخواہ", "Salary")}</label><input name="salary" />
          <label>{t("تجربہ", "Experience")}</label><input name="experience" />
          <label><input type="checkbox" name="visa" /> Visa</label>
          <label><input type="checkbox" name="housing" /> Housing</label>
          <label>WhatsApp</label><input name="whatsapp" />
          <label>Email</label><input name="email" type="email" />
          <label>{t("تفصیل", "Description")}</label><textarea name="description" rows={5} required />
          <button className="go" type="submit">{t("پوسٹ کریں", "Publish job")}</button>
        </form>
      )}
    </div>
  );
}
