import { Shell } from "@/components/Shell";
import Link from "next/link";

export const metadata = {
  title: "Job search guides for Pakistan and the Gulf",
  description: "How to search jobs, write a CV and hire on Kaamkar across Pakistan, UAE and Saudi Arabia.",
  alternates: { canonical: "https://kaamkar.com/guides" },
};

export default function GuidesPage() {
  return (
    <Shell>
      <article className="wrap section prose">
        <h1>Guides for job seekers and employers</h1>
        <p>
          Kaamkar lists office, trade, driving and visa jobs from Pakistan to the Gulf. These pages are written so candidates and hiring teams can share a direct link.
        </p>
        <h2>Search jobs by city</h2>
        <p>
          Open <Link href="/jobs?location=Lahore">jobs in Lahore</Link>, <Link href="/jobs?location=Karachi">jobs in Karachi</Link>, <Link href="/jobs?location=Islamabad">jobs in Islamabad</Link>, <Link href="/jobs?location=Dubai">jobs in Dubai</Link> or <Link href="/jobs?location=Riyadh">jobs in Riyadh</Link>.
        </p>
        <h2>Build a CV before you apply</h2>
        <p>
          Use the <Link href="/cv">CV builder</Link>, then apply with your expected salary. Save a search on the <Link href="/alerts">alerts</Link> page so new matching roles stay in one list.
        </p>
        <h2>Hire without waiting for applications</h2>
        <p>
          Employers can <Link href="/post">post a job</Link>, review the <Link href="/hire/inbox">applicant inbox</Link>, or run a <Link href="/hire/search">CV search</Link>. Campus drives are listed under <Link href="/campus">campus hiring</Link>.
        </p>
      </article>
    </Shell>
  );
}
