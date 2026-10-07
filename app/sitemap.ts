import type { MetadataRoute } from "next";
import { SEED_JOBS } from "@/lib/jobs";
import { COMPANIES } from "@/lib/portal";
import { SITE, jobSlug } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/jobs",
    "/cv",
    "/alerts",
    "/hire",
    "/hire/packages",
    "/hire/search",
    "/companies",
    "/campus",
    "/coach",
    "/guides",
    "/links",
    "/email-auth",
    "/locations/lahore",
    "/locations/karachi",
    "/locations/islamabad",
    "/locations/dubai",
    "/locations/riyadh",
    "/post",
    "/people",
  ];
  return [
    ...staticPaths.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...SEED_JOBS.map((job) => ({
      url: `${SITE}/jobs/${jobSlug(job.title, job.city)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...COMPANIES.map((company) => ({
      url: `${SITE}/companies/${company.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
