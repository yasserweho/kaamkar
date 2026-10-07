import { Shell } from "@/components/Shell";
import { SEED_JOBS } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { SITE } from "@/lib/site";

const CITIES = ["lahore", "karachi", "islamabad", "dubai", "riyadh"] as const;

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const name = city[0].toUpperCase() + city.slice(1);
  return {
    title: `Jobs in ${name} for office, trades and Gulf hiring`,
    description: `Browse open jobs in ${name}. Apply with a CV, set an alert, or post a role on Kaamkar.`,
    alternates: { canonical: `${SITE}/locations/${city}` },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const name = city[0].toUpperCase() + city.slice(1);
  const jobs = SEED_JOBS.filter((job) => job.city.toLowerCase() === city);
  return (
    <Shell>
      <article className="wrap section prose">
        <h1>Jobs in {name}</h1>
        <p>
          Kaamkar lists current openings in {name} for office staff, skilled trades, driving and visa roles. Save a search, build a CV, then apply with your expected salary.
        </p>
        <h2>Open roles in {name}</h2>
        <div className="grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {jobs.length === 0 && <p>No seeded roles in {name} yet. Search all jobs and set an alert.</p>}
        <h2>How to apply</h2>
        <p>
          Open a role, check the salary and visa notes, then send a short cover letter. Employers in {name} can post a job and search the candidate list.
        </p>
      </article>
    </Shell>
  );
}
