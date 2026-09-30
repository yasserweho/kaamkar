import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaamkar — Jobs in Pakistan & the Gulf",
  description:
    "Find local and overseas jobs across Pakistan, UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain. Office, trades, driving, hospitality and healthcare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
