import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findEntryBySlug, importPathFor, loadCatalog } from "@/lib/studio/catalog";
import StudioWorkspace from "@/components/studio/StudioWorkspace";

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
  return {
    title: `${entry.title} — Studio`,
    description: `Customize the ${entry.title} component live and export production-ready code.`,
  };
}

export default async function StudioComponentPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await props.params;
  const entry = await findEntryBySlug(slug);
  if (!entry) return notFound();

  return (
    <StudioWorkspace
      entry={{
        name: entry.name,
        category: entry.category,
        title: entry.title,
        importPath: importPathFor(entry),
      }}
    />
  );
}
