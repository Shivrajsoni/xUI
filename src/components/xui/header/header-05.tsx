"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { Orbit } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Header_05Props {
  brand?: string;
  links?: string[];
  cta?: string;
  onNavigate?: (link: string) => void;
  onCtaClick?: () => void;
  className?: string;
}

const Header_05 = ({
  brand = "Lumen",
  links = ["Product", "Method", "Pricing"],
  cta = "Join beta",
  onNavigate,
  onCtaClick,
  className,
}: Header_05Props) => {
  const [active, setActive] = useState(links[0] ?? "Product");
  const [scrolled, setScrolled] = useState(false);
  const pillId = useId();

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      {/* Gradient demo backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-indigo-950 dark:via-zinc-950 dark:to-cyan-950"
      />
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 h-48 w-96 max-w-full -translate-x-1/2 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-500/20"
      />

      <div className="relative flex flex-col items-center px-4 pb-5 pt-4">
        {/* Floating glass header */}
        <motion.header
          animate={{ paddingTop: scrolled ? 4 : 8, paddingBottom: scrolled ? 4 : 8 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="w-full max-w-xl"
        >
          <motion.nav
            aria-label="Main"
            animate={{
              backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
            }}
            transition={{ duration: 0.35 }}
            className={cn(
              "flex w-full items-center gap-1 rounded-full border pl-3 pr-1.5 transition-[background-color,box-shadow,border-color] duration-300",
              scrolled
                ? "border-white/60 bg-white/75 py-1 shadow-[0_10px_35px_-12px_rgba(24,24,27,0.28)] dark:border-white/15 dark:bg-zinc-900/70 dark:shadow-[0_10px_35px_-10px_rgba(0,0,0,0.7)]"
                : "border-white/50 bg-white/50 py-1.5 shadow-[0_16px_50px_-20px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)]"
            )}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("home");
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Orbit aria-hidden className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {brand}
              </span>
            </a>

            <div className="mx-auto flex min-w-0 items-center">
              {links.map((link) => (
                <button
                  key={link}
                  type="button"
                  aria-current={active === link ? "page" : undefined}
                  onClick={() => {
                    setActive(link);
                    onNavigate?.(link);
                  }}
                  className={cn(
                    "relative rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 sm:px-3.5 sm:text-sm",
                    active === link
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                >
                  {active === link && (
                    <motion.span
                      layoutId={pillId}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-white/15 dark:ring-white/10"
                    />
                  )}
                  <span className="relative">{link}</span>
                </button>
              ))}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onCtaClick?.()}
              className="shrink-0 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-[0_4px_18px_-4px_rgba(99,102,241,0.65)] transition-[background-color,box-shadow] duration-200 hover:bg-indigo-500 hover:shadow-[0_6px_24px_-4px_rgba(99,102,241,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-4 sm:text-sm dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {cta}
            </motion.button>
          </motion.nav>
        </motion.header>

        {/* Backdrop copy so the glass has something to blur */}
        <div className="pointer-events-none mt-6 select-none text-center" aria-hidden>
          <p className="bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text font-serif text-2xl italic text-transparent sm:text-3xl dark:from-white dark:to-zinc-500">
            Design at the speed of thought
          </p>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            A canvas that keeps up with your ideas — sketch, iterate and ship from one
            surface.
          </p>
        </div>

        {/* Scroll-state demo switch */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={scrolled}
            aria-label="Toggle scrolled header state"
            onClick={() => setScrolled((v) => !v)}
            className={cn(
              "relative h-5 w-9 rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              scrolled
                ? "border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500"
                : "border-zinc-300 bg-zinc-200/80 dark:border-zinc-700 dark:bg-zinc-800"
            )}
          >
            <motion.span
              aria-hidden
              animate={{ x: scrolled ? 16 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-sm"
            />
          </button>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Scrolled
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header_05;
