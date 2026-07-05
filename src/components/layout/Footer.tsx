import Link from "next/link";
import XIcon from "../icons/x-icon";
import Logo from "@/components/landing/Logo";
import { siteConfig } from "@/config/site";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Installation", href: "/docs" },
      { label: "Hooks", href: "/docs/hooks/use-auto-resize-textarea" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "X (Twitter)", href: siteConfig.links.twitter },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
];

// Every component category, mirrored from the docs sidebar.
const allComponents: { label: string; slug: string }[] = [
  { label: "Action Search Bar", slug: "action-search-bar" },
  { label: "AI Tooling", slug: "ai" },
  { label: "Alerts", slug: "alert" },
  { label: "Avatar Picker", slug: "avatar-picker" },
  { label: "Background Circles", slug: "background-circles" },
  { label: "Background Paths", slug: "background-paths" },
  { label: "Beams Background", slug: "beams-background" },
  { label: "Bento Grid", slug: "bento-grid" },
  { label: "Buttons", slug: "button" },
  { label: "Cards", slug: "card" },
  { label: "Chat", slug: "chat" },
  { label: "FAQ", slug: "faq" },
  { label: "Flow", slug: "flow" },
  { label: "Glass", slug: "glass" },
  { label: "Headers", slug: "header" },
  { label: "Inputs", slug: "input" },
  { label: "Lists", slug: "list" },
  { label: "Loaders", slug: "loader" },
  { label: "Media", slug: "media" },
  { label: "Modals", slug: "modal" },
  { label: "Navigation", slug: "nav" },
  { label: "Notifications", slug: "notification" },
  { label: "Onboarding", slug: "onboarding" },
  { label: "Payment", slug: "payment" },
  { label: "Profiles", slug: "profile" },
  { label: "Commerce", slug: "shop" },
  { label: "Stats", slug: "stat" },
  { label: "Status", slug: "status" },
  { label: "SVG", slug: "svg" },
  { label: "Tables & Data", slug: "table" },
  { label: "Testimonials", slug: "testimonial" },
  { label: "Toolbar", slug: "toolbar" },
  { label: "Tweet Card", slug: "tweet-card" },
  { label: "User Menu", slug: "user" },
  { label: "Widgets", slug: "widget" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white dark:border-zinc-800/70 dark:bg-black">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                xUI
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Modern, interactive React + Tailwind components. Copy the source,
              make it yours, and ship — code you fully own.
            </p>
            <div className="mt-5 flex gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              >
                <XIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* All components */}
        <div className="mt-12 border-t border-zinc-100 pt-8 dark:border-zinc-900">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
            Components
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allComponents.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/docs/components/${c.slug}`}
                  className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-900 sm:flex-row">
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
