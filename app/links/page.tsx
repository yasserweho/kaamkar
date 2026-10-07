import { Shell } from "@/components/Shell";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Link to Kaamkar jobs in Pakistan and the Gulf",
  description: "Citation details, embed code and directory targets for linking to Kaamkar.",
  alternates: { canonical: `${SITE}/links` },
};

export default function LinksPage() {
  return (
    <Shell>
      <article className="wrap section prose">
        <h1>Link to Kaamkar</h1>
        <p>
          Kaamkar is a job board for Pakistan and the Gulf. Publishers, universities and employers can cite the site with the details below.
        </p>
        <h2>Preferred citation</h2>
        <p>Kaamkar. Jobs in Pakistan and the Gulf. Islamabad. https://www.kaamkar.com</p>
        <h2>Pages worth linking</h2>
        <ul>
          <li><a href="/jobs">All jobs</a></li>
          <li><a href="/locations/lahore">Jobs in Lahore</a></li>
          <li><a href="/locations/karachi">Jobs in Karachi</a></li>
          <li><a href="/locations/dubai">Jobs in Dubai</a></li>
          <li><a href="/cv">CV builder</a></li>
          <li><a href="/hire">Hiring tools</a></li>
          <li><a href="/guides">Job search guides</a></li>
        </ul>
        <h2>Embed</h2>
        <pre>{`<a href="https://www.kaamkar.com">Jobs in Pakistan and the Gulf — Kaamkar</a>`}</pre>
        <h2>Where to submit the site</h2>
        <p>
          Google Business Profile for Islamabad, university career pages, and employer career portals. Each listing should use the homepage or a city page, not a tracking link.
        </p>
      </article>
    </Shell>
  );
}
