import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/docs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const seen = new Set(staticRoutes.map((r) => r.url));

  const docPages: MetadataRoute.Sitemap = source
    .getPages()
    .map((page) => `${base}${page.url}`)
    .filter((url) => !seen.has(url))
    .map((url) => ({
      url,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...docPages];
}
