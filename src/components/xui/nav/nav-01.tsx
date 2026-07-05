"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Command,
  Layers,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavProductItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  href?: string;
};

const PRODUCT_ITEMS: NavProductItem[] = [
  {
    icon: Sparkles,
    title: "Studio",
    description: "Visual editor with live theming controls.",
    accent:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  {
    icon: Layers,
    title: "Components",
    description: "Production-ready blocks for React apps.",
    accent: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Ship design tokens straight to your repo.",
    accent:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

const Nav_01 = ({
  brand = "xui",
  links = ["Docs", "Pricing", "Changelog"],
  productItems = PRODUCT_ITEMS,
  onSignIn,
  onGetStarted,
  className,
}: {
  brand?: string;
  links?: string[];
  productItems?: NavProductItem[];
  onSignIn?: () => void;
  onGetStarted?: () => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        "relative w-full max-w-3xl rounded-2xl border border-zinc-200/80 bg-white/70 backdrop-blur-xl shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:border-white/[0.08] dark:bg-zinc-950/60 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <nav
        aria-label="Main"
        className="flex h-14 items-center gap-1 px-3 sm:px-5"
      >
        {/* Logo */}
        <a
          href="#"
          className="mr-2 flex min-w-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900">
            <Command className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {brand}
          </span>
        </a>

        {/* Product dropdown trigger */}
        {productItems.length > 0 && (
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                open
                  ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50"
              )}
            >
              Product
              <ChevronDown
                aria-hidden
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                  className="absolute left-0 top-full z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top-left rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)]"
                >
                  {productItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href ?? "#"}
                      className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-white/[0.05]"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          item.accent
                        )}
                      >
                        <item.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </span>
                        <span className="block text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Plain links */}
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="hidden rounded-lg px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:block dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50"
          >
            {link}
          </a>
        ))}

        {/* Right side */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onSignIn}
            className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:px-3 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50"
          >
            Sign in
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onGetStarted}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:px-3.5 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400"
          >
            Get started
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Nav_01;
