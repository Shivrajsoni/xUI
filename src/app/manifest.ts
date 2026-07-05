import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { META_THEME_COLORS } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: META_THEME_COLORS.light,
    theme_color: META_THEME_COLORS.light,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
