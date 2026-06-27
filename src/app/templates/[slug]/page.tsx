import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { getTemplate, templates } from "@/lib/templates";
import { siteConfig } from "@/config/site";
import TemplateStudio from "@/components/templates/TemplateStudio";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getTemplate(slug);
  if (!t) return { title: "Template" };
  const url = `${siteConfig.url}/templates/${slug}`;
  return {
    title: `${t.title} template`,
    description: t.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${t.title} template`,
      description: t.description,
      url,
      type: "website",
    },
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

  return <TemplateStudio slug={slug} title={template.title} source={source} />;
}
