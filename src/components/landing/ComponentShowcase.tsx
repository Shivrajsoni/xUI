import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

import Card02 from "@/components/xui/card/card-02";
import Card_05 from "@/components/xui/card/card-05";
import Profile01 from "@/components/xui/profile/profile-01";
import Profile02 from "@/components/xui/profile/profile-02";
import Alert02 from "@/components/xui/alert/alert-02";
import Loader01 from "@/components/xui/loader/loader-01";
import Btn03 from "@/components/xui/button/btn-03";

interface Tile {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

const tiles: Tile[] = [
  {
    title: "Card",
    href: "/docs/components/card",
    children: <Card02 />,
  },
  {
    title: "Profile",
    href: "/docs/components/profile",
    children: <Profile02 />,
  },
  {
    title: "Alert",
    href: "/docs/components/alert",
    children: <Alert02 />,
  },
  {
    title: "Profile",
    href: "/docs/components/profile",
    children: <Profile01 />,
  },
  {
    title: "Button",
    href: "/docs/components/button",
    children: <Btn03 className="w-44 py-5" />,
  },
  {
    title: "Loader",
    href: "/docs/components/loader",
    children: <Loader01 />,
  },
];

function ShowcaseTile({ title, href, className, children }: Tile) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {title}
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          View
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}

export default function ComponentShowcase() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          A growing library of components
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Interactive, accessible, and themeable. Every component ships as
          copy-paste source you fully own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, i) => (
          <ShowcaseTile key={`${tile.title}-${i}`} {...tile} />
        ))}
      </div>

      {/* Wide text-reveal showcase */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 px-4 py-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            Text reveal card
          </span>
          <Link
            href="/docs/components/card"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            View
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex items-center justify-center overflow-x-auto bg-zinc-950 p-6">
          <Card_05 text="Hover over me" revealText="You found me" />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/studio"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Customize in Studio
        </Link>
        <Link
          href="/docs"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          Explore all components
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
