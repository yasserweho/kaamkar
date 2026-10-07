import { Shell } from "@/components/Shell";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Email authentication records for Kaamkar",
  description: "SPF and DMARC records for hello@kaamkar.com.",
  alternates: { canonical: `${SITE}/email-auth` },
};

export default function EmailAuthPage() {
  return (
    <Shell>
      <article className="wrap section prose">
        <h1>Mail authentication</h1>
        <p>Add these DNS records at the domain host for kaamkar.com. They stop other servers spoofing the domain. No mailbox is claimed until these are live.</p>
        <h2>SPF</h2>
        <p>Host: @ · Type: TXT · Value: v=spf1 include:_spf.google.com ~all</p>
        <h2>DMARC</h2>
        <p>Host: _dmarc · Type: TXT · Value: v=DMARC1; p=none; rua=mailto:hello@kaamkar.com</p>
      </article>
    </Shell>
  );
}
