import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Tracking } from "@/components/Tracking";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Kaamkar — Jobs in Pakistan, UAE, Saudi Arabia and the Gulf";
const description =
  "Search jobs in Lahore, Karachi, Islamabad, Dubai and Riyadh. Build a CV, set alerts and apply, or post a job and shortlist candidates on Kaamkar.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaamkar.com"),
  title: { default: title, template: "%s | Kaamkar" },
  description,
  keywords: ["jobs in Pakistan", "Gulf jobs", "jobs in Lahore", "jobs in Dubai", "CV builder Pakistan", "hire in Pakistan"],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://kaamkar.com",
    siteName: "Kaamkar",
    type: "website",
    images: [{ url: "/hero-mix2.jpg", width: 1176, height: 784, alt: "Pakistani job seekers and graduates" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/hero-mix2.jpg"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kaamkar",
      url: "https://kaamkar.com",
      email: "hello@kaamkar.com",
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    },
    {
      "@type": "WebSite",
      name: "Kaamkar",
      url: "https://kaamkar.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kaamkar.com/jobs?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "Kaamkar",
      url: "https://kaamkar.com",
      email: "hello@kaamkar.com",
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      areaServed: ["PK", "AE", "SA", "QA", "OM", "KW", "BH"],
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
