import type { Metadata } from "next";
import Templates from "@/components/landing/Templates";
import { templates } from "@/lib/templates";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Templates — full-page layouts to start from",
  description:
    "Production-ready page templates built from xUI components — including real-time three.js 3D pages. Preview, copy the source, and make it yours.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "xUI Templates",
    description:
      "Production-ready page templates, including real-time three.js 3D pages.",
    url: `${siteConfig.url}/templates`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "xUI Templates" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "xUI Templates",
  description:
    "Production-ready page templates built from xUI components, including real-time three.js 3D pages.",
  url: `${siteConfig.url}/templates`,
  hasPart: templates.map((t) => ({
    "@type": "CreativeWork",
    name: t.title,
    abstract: t.description,
    url: `${siteConfig.url}/templates/${t.slug}`,
  })),
};

export default function TemplatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Templates />
    </>
  );
}
