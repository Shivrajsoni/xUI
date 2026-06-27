import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findEntryBySlug, importPathFor, loadCatalog } from "@/lib/studio/catalog";
import StudioWorkspace from "@/components/studio/StudioWorkspace";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  const items = await loadCatalog();
  return items.map((item) => ({ slug: [item.category, item.name] }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = await findEntryBySlug(slug);
  if (!entry) return { title: "Studio" };
  const url = `${siteConfig.url}/studio/${slug.join("/")}`;
  const description = `Customize the ${entry.title} component live — edit text, colors, and size, then copy production-ready code.`;
  return {
    title: `${entry.title} — Studio`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${entry.title} — Studio`, description, url, type: "website" },
  };
}

export default async function StudioComponentPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await props.params;
  const entry = await findEntryBySlug(slug);
  if (!entry) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: entry.title,
    description: entry.description || `${entry.title} React component`,
    url: `${siteConfig.url}/studio/${slug.join("/")}`,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    codeRepository: siteConfig.links.github,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudioWorkspace
        entry={{
          name: entry.name,
          category: entry.category,
          title: entry.title,
          importPath: importPathFor(entry),
        }}
      />
    </>
  );
}
