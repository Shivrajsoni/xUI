"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Layers,
  Menu,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MegaMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export interface Header_01Props {
  brand?: string;
  links?: { label: string; href: string }[];
  menuItems?: MegaMenuItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

const defaultMenuItems: MegaMenuItem[] = [
  {
    title: "Analytics",
    description: "Real-time dashboards for every team",
    icon: <BarChart3 aria-hidden className="h-4 w-4" />,
    href: "/product/analytics",
  },
  {
    title: "Automations",
    description: "Ship workflows without writing glue code",
    icon: <Workflow aria-hidden className="h-4 w-4" />,
    href: "/product/automations",
  },
  {
    title: "Integrations",
    description: "Connect 120+ tools in a few clicks",
    icon: <Layers aria-hidden className="h-4 w-4" />,
    href: "/product/integrations",
  },
  {
    title: "Edge API",
    description: "Sub-50ms responses from 30 regions",
    icon: <Zap aria-hidden className="h-4 w-4" />,
    href: "/product/api",
  },
];

const defaultLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
  { label: "Docs", href: "/docs" },
];

const Header_01 = ({
  brand = "Northbeam",
  links = defaultLinks,
  menuItems = defaultMenuItems,
  onNavigate,
  className,
}: Header_01Props) => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  const go = (href: string) => {
    setMegaOpen(false);
    setMobileOpen(false);
    onNavigate?.(href);
  };

  const linkCls =
    "rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] dark:text-zinc-400 dark:hover:text-zinc-100";

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <header className="relative z-10 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <nav aria-label="Main" className="flex h-14 items-center gap-1 px-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              go("/");
            }}
            className="mr-2 flex shrink-0 items-center gap-2 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              <Zap className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {brand}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center md:flex">
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(linkCls, "flex items-center gap-1", megaOpen && "text-zinc-900 dark:text-zinc-100")}
            >
              Product
              <ChevronDown
                aria-hidden
                className={cn("h-3.5 w-3.5 transition-transform duration-200", megaOpen && "rotate-180")}
              />
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className={linkCls}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("/signin")}
              className="hidden rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] sm:block dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              Sign in
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => go("/signup")}
              className="rounded-md bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 dark:ring-offset-zinc-950"
            >
              Get started
            </motion.button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              {mobileOpen ? (
                <X aria-hidden className="h-4.5 w-4.5" />
              ) : (
                <Menu aria-hidden className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile slide-down sheet */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="overflow-hidden border-t border-zinc-200 md:hidden dark:border-zinc-800"
            >
              <div className="space-y-0.5 px-3 py-3">
                {[{ label: "Product", href: "/product" }, ...links].map((l) => (
                  <a
                    key={l.href}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className="block rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("/signin");
                  }}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Sign in
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega dropdown */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="absolute inset-x-3 top-full z-20 mt-2 hidden origin-top rounded-xl border border-zinc-200 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.35)] md:grid md:grid-cols-[1fr_220px] md:gap-2 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
            >
              <div className="grid grid-cols-2 gap-1">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-900"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:group-hover:border-zinc-700 dark:group-hover:text-zinc-100">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-500">
                        {item.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* What's new side card */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("/changelog");
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-emerald-500/20 bg-emerald-50/60 p-4 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06] dark:hover:bg-emerald-500/10"
              >
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <Sparkles aria-hidden className="h-3 w-3" />
                    What&apos;s new
                  </span>
                  <p className="mt-2.5 text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                    Introducing scheduled reports
                  </p>
                  <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-400">
                    Deliver dashboards to Slack or email on any cadence.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Read the announcement
                  <ArrowRight
                    aria-hidden
                    className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Faux page strip */}
      <div aria-hidden className="space-y-3 bg-zinc-50/60 px-6 py-6 dark:bg-zinc-900/30">
        <div className="h-5 w-2/3 max-w-64 rounded bg-zinc-200/80 dark:bg-zinc-800" />
        <div className="h-3 w-full max-w-sm rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
        <div className="h-3 w-4/5 max-w-xs rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="h-16 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
          <div className="h-16 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
          <div className="h-16 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
};

export default Header_01;
