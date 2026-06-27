import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { getTemplate, templates } from "@/lib/templates";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import TemplatePreviewBar from "@/components/templates/TemplatePreviewBar";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getTemplate(slug);
  if (!t) return { title: "Template" };
  return {
    title: `${t.title} template`,
    description: t.description,
  };
}

export default async function TemplatePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const template = getTemplate(slug);
  if (!template) return notFound();

  let source = "";
  try {
    source = await fs.readFile(path.join(process.cwd(), template.file), "utf-8");
  } catch {
    source = "// source unavailable";
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <TemplatePreviewBar title={template.title} source={source} />
      {/* Templates are inspiration starting points — no Studio editing here. */}
      <TemplateRenderer slug={slug} />
    </div>
  );
}
