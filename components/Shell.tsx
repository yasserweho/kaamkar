"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ur";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (ur: string, en: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (_ur, en) => en,
});

export function useLang() {
  return useContext(Ctx);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("kaamkar_lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("ur", lang === "ur");
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    localStorage.setItem("kaamkar_lang", lang);
  }, [lang]);
  const t = (ur: string, en: string) => (lang === "ur" ? ur : en);

  return (
    <Ctx.Provider value={{ lang, setLang, t }}>
      <header className="topbar">
        <div className="wrap nav">
          <Link className="brand" href="/">
            <span className="mark">ک</span>
            Kaamkar
          </Link>
          <nav className="nav-links">
            <Link href="/jobs">{t("نوکریاں", "Jobs")}</Link>
            <Link href="/post">{t("نوکری لگائیں", "Post a job")}</Link>
            <Link href="/account">{t("اکاؤنٹ", "Account")}</Link>
          </nav>
          <button className="chip" onClick={() => setLang(lang === "en" ? "ur" : "en")}>
            {lang === "en" ? "اردو" : "EN"}
          </button>
        </div>
      </header>
      {children}
      <footer className="foot">
        <div className="wrap">
          Kaamkar · {t("پاکستان، ایشیا اور مشرق وسطیٰ کی نوکریاں", "Jobs for Pakistan, Asia & the Middle East")} · kaamkar.com
        </div>
      </footer>
    </Ctx.Provider>
  );
}
