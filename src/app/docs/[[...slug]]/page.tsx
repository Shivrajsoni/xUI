import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import Preview from '@/components/mdx/preview';
import PreviewClient from "@/components/mdx/previewClient";
import { siteConfig } from '@/config/site';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return notFound();

  const MDX = page.data.body;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    description: page.data.description,
    url: `${siteConfig.url}${page.url}`,
    author: { "@type": "Person", name: siteConfig.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{
          ...defaultMdxComponents,
          Preview,
          PreviewClient
        }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const url = `${siteConfig.url}${page.url}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url,
      type: "article",
    },
  };
}
