"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Hexagon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Header_02Props {
  brand?: string;
  announcement?: string;
  announcementCta?: string;
  leftLinks?: { label: string; href: string }[];
  rightLinks?: { label: string; href: string }[];
  onNavigate?: (href: string) => void;
  className?: string;
}

const defaultLeft = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

const defaultRight = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Header_02 = ({
  brand = "Meridian",
  announcement = "v2.0 is out — faster builds, new CLI",
  announcementCta = "Read the changelog",
  leftLinks = defaultLeft,
  rightLinks = defaultRight,
  onNavigate,
  className,
}: Header_02Props) => {
  const [showBar, setShowBar] = useState(true);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate?.(href);
  };

  const linkCls =
    "rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] dark:text-zinc-400 dark:hover:text-zinc-100";

  return (
    <div
      className={cn(
        "w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Announcement bar — collapses in height on dismiss */}
      <AnimatePresence initial={false}>
        {showBar && (
          <motion.div
            initial={false}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="overflow-hidden"
          >
            <div className="relative flex items-center justify-center gap-2 bg-zinc-900 px-10 py-2 text-center dark:bg-zinc-100">
              <p className="min-w-0 truncate text-xs text-zinc-300 dark:text-zinc-600">
                <span className="hidden font-medium text-white sm:inline dark:text-zinc-900">
                  {announcement}
                </span>
                <span className="font-medium text-white sm:hidden dark:text-zinc-900">v2.0 is out</span>
              </p>
              <a
                href="#"
                onClick={(e) => go(e, "/changelog")}
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded text-xs font-medium text-amber-400 underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:text-amber-600"
              >
                {announcementCta}
                <ArrowRight aria-hidden className="h-3 w-3" />
              </a>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={() => setShowBar(false)}
                className="absolute right-3 rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 dark:text-zinc-500 dark:hover:bg-zinc-900/10 dark:hover:text-zinc-900"
              >
                <X aria-hidden className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered-logo header */}
      <header className="relative border-b border-zinc-200 dark:border-zinc-800">
        <nav
          aria-label="Main"
          className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4"
        >
          <div className="hidden items-center justify-end gap-1 pr-4 sm:flex">
            {leftLinks.map((l) => (
              <a key={l.href} href="#" onClick={(e) => go(e, l.href)} className={linkCls}>
                {l.label}
              </a>
            ))}
          </div>
          <span aria-hidden className="sm:hidden" />

          <a
            href="#"
            onClick={(e) => go(e, "/")}
            className="group flex items-center gap-2 justify-self-center rounded-md px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <Hexagon
              aria-hidden
              className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:rotate-[30deg]"
              strokeWidth={2.2}
            />
            <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {brand}
            </span>
          </a>

          <div className="flex items-center justify-end gap-1 sm:justify-start sm:pl-4">
            {rightLinks.map((l) => (
              <a
                key={l.href}
                href="#"
                onClick={(e) => go(e, l.href)}
                className={cn(linkCls, "hidden sm:block")}
              >
                {l.label}
              </a>
            ))}
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate?.("/signup")}
              className="rounded-full border border-zinc-300 px-3.5 py-1.5 text-xs font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 sm:hidden dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              Sign up
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Faux page strip */}
      <div aria-hidden className="bg-zinc-50/60 px-6 py-7 dark:bg-zinc-900/30">
        <div className="mx-auto h-5 w-3/5 max-w-72 rounded bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="mx-auto mt-3 h-3 w-4/5 max-w-sm rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
        <div className="mx-auto mt-2 h-3 w-2/3 max-w-xs rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
        <div className="mx-auto mt-5 h-8 w-32 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
      </div>
    </div>
  );
};

export default Header_02;
