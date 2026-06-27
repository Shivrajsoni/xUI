import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { siteConfig } from "@/config/site";
import { loadCatalog } from "@/lib/studio/catalog";
import { templates } from "@/lib/templates";

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
  add("/studio", 0.8, "weekly");
  add("/templates", 0.8, "weekly");

  // Docs pages
  for (const page of source.getPages()) add(page.url, 0.7);

  // Template previews
  for (const t of templates) add(`/templates/${t.slug}`, 0.6);

  // Studio per-component editors (agent + SEO discovery of every component)
  const catalog = await loadCatalog();
  for (const c of catalog) add(`/studio/${c.category}/${c.name}`, 0.5);

  return entries;
}
