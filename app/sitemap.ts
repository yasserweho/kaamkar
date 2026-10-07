import type { MetadataRoute } from "next";
import { SEED_JOBS } from "@/lib/jobs";
import { COMPANIES } from "@/lib/portal";

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
    "/post",
    "/people",
  ];
  return [
    ...staticPaths.map((path) => ({
      url: `https://kaamkar.com${path}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...SEED_JOBS.map((job) => ({
      url: `https://kaamkar.com/jobs/${job.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...COMPANIES.map((company) => ({
      url: `https://kaamkar.com/companies/${company.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
