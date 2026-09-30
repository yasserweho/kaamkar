"use client";
import { useEffect, useState } from "react";
import { Shell, useLang } from "@/components/Shell";
type Profile = { name: string; role: "seeker" | "employer"; phone: string; city: string };
export default function AccountPage() { return <Shell><Account /></Shell>; }
function Account() {
  const { t } = useLang();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [apps, setApps] = useState<Array<{ title: string; at: string }>>([]);
  useEffect(() => {
    const p = localStorage.getItem("kaamkar_profile");
    if (p) setProfile(JSON.parse(p));
    setApps(JSON.parse(localStorage.getItem("kaamkar_apps") || "[]"));
  }, []);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Profile = { name: String(f.get("name") || ""), role: String(f.get("role") || "seeker") as Profile["role"], phone: String(f.get("phone") || ""), city: String(f.get("city") || "") };
    localStorage.setItem("kaamkar_profile", JSON.stringify(next));
    setProfile(next);
  }
  return (
    <div className="wrap" style={{ maxWidth: 640, paddingBottom: 64 }}>
      <div className="page-head"><h1>{t("اکاؤنٹ", "Account")}</h1></div>
      <form className="form panel" onSubmit={onSubmit}>
        <label>{t("نام", "Name")}</label><input name="name" defaultValue={profile?.name} required />
        <label>{t("کردار", "I am")}</label>
        <select name="role" defaultValue={profile?.role || "seeker"}>
          <option value="seeker">{t("جاب سیکر", "Job seeker")}</option>
          <option value="employer">{t("ایمپلائر", "Employer")}</option>
        </select>
        <label>WhatsApp</label><input name="phone" defaultValue={profile?.phone} />
        <label>{t("شہر", "City")}</label><input name="city" defaultValue={profile?.city} />
        <button className="go" type="submit">{t("محفوظ کریں", "Save profile")}</button>
      </form>
      {apps.length > 0 && (
        <div className="panel" style={{ marginTop: 16 }}>
          <strong>{t("درخواستیں", "Applications")}</strong>
          {apps.map((a, i) => <p className="meta" key={i}>{a.title} · {new Date(a.at).toLocaleString()}</p>)}
        </div>
      )}
    </div>
  );
}
