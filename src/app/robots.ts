import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly welcome AI crawlers (GEO / agent discovery).
      {
        userAgent: ["GPTBot", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
