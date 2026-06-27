import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    template: "%s | xUI — React + Tailwind UI components",
    default: "Documentation | xUI — React + Tailwind UI components",
  },
  description:
    "Copy, paste, and customize modern React + Tailwind CSS components, with full source and a live Studio.",
  alternates: { canonical: `${siteConfig.url}/docs` },
  openGraph: {
    title: "Documentation — xUI",
    description: "Explore and copy xUI components with full source code.",
    url: `${siteConfig.url}/docs`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "xUI" }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
