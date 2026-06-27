import Link from "next/link";
import { Github as LucideGithub, Snowflake } from "lucide-react";
import XIcon from "../icons/x-icon";
import { siteConfig } from "@/config/site";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components/card" },
      { label: "Studio", href: "/studio" },
      { label: "Templates", href: "/#templates" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Cards", href: "/docs/components/card" },
      { label: "Buttons", href: "/docs/components/button" },
      { label: "AI Input", href: "/docs/components/ai-input" },
      { label: "Profiles", href: "/docs/components/profile" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Installation", href: "/docs" },
      { label: "Hooks", href: "/docs/hooks/use-auto-resize-textarea" },
      { label: "GitHub", href: siteConfig.links.github },
      { label: "Open in Studio", href: "/studio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Snowflake className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">xUI</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              Modern, interactive React + Tailwind components. Copy, customize in
              Studio, and ship — code you fully own.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <LucideGithub className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <XIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-6 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} xUI. All rights reserved.
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Built with Next.js, Tailwind CSS &amp; shadcn/ui.
          </p>
        </div>
      </div>
    </footer>
  );
}
