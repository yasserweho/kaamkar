import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Tracking } from "@/components/Tracking";
import { SITE, SOCIAL } from "@/lib/site";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Kaamkar jobs in Pakistan, Lahore, Karachi, Dubai and the Gulf";
const description =
  "Find jobs in Pakistan and the Gulf. Search Lahore, Karachi, Islamabad, Dubai and Riyadh roles, build a CV, set alerts, or post a job and shortlist candidates on Kaamkar.";

export async function generateMetadata(): Promise<Metadata> {
  const path = (await headers()).get("x-pathname") || "/";
  const canonical = path === "/" ? SITE : `${SITE}${path}`;
  return {
    metadataBase: new URL(SITE),
    title: { default: title, template: "%s | Kaamkar jobs" },
    description,
    keywords: [
      "jobs in Pakistan",
      "Gulf jobs",
      "jobs in Lahore",
      "jobs in Karachi",
      "jobs in Islamabad",
      "jobs in Dubai",
      "jobs in Riyadh",
      "CV builder Pakistan",
      "hire in Pakistan",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Kaamkar",
      type: "website",
      locale: "en_PK",
      images: [{ url: "/hero-mix2.jpg", width: 1176, height: 784, alt: "Pakistani graduates and professionals seeking jobs" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero-mix2.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Kaamkar",
      url: SITE,
      email: "hello@kaamkar.com",
      logo: `${SITE}/icon.svg`,
      sameAs: Object.values(SOCIAL),
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Kaamkar",
      url: SITE,
      publisher: { "@id": `${SITE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE}/jobs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#local`,
      name: "Kaamkar",
      url: SITE,
      image: `${SITE}/hero-mix2.jpg`,
      email: "hello@kaamkar.com",
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      areaServed: ["Pakistan", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Providers>{children}</Providers>
        <Tracking />
      </body>
    </html>
  );
}
