import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const add = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" = "monthly"
  ) => {
    const url = `${base}${path}`;
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, changeFrequency, priority });
  };

  // Core routes
  add("", 1, "weekly");
  add("/docs", 0.9, "weekly");

  // Docs pages
  for (const page of source.getPages()) add(page.url, 0.7);

  return entries;
}
