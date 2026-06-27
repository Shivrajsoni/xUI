import type { Metadata } from "next";
import { Snowflake } from "lucide-react";
import { Link } from "next-view-transitions";
import ThemeToggle from "@/lib/ThemeToggle";
import { siteConfig } from "@/config/site";

const description =
  "Open any xUI component in a live editor, tweak text, colors and size with controls, and export production-ready code. No setup required.";

export const metadata: Metadata = {
  title: "Studio — Customize components live",
  description,
  alternates: { canonical: `${siteConfig.url}/studio` },
  openGraph: {
    title: "xUI Studio — Customize components live",
    description,
    url: `${siteConfig.url}/studio`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "xUI Studio" }],
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span className="font-semibold">xUI</span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            Studio
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Docs
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
