import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/account"],
    },
    sitemap: "https://kaamkar.com/sitemap.xml",
    host: "https://kaamkar.com",
  };
}
