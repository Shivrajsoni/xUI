"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Flow_05Props {
  eyebrow?: string;
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  secondaryLabel?: string;
  onCta?: () => void;
  onSecondary?: () => void;
  className?: string;
}

/** One shared breath — blobs and copy inhale/exhale together. */
const BREATH = {
  duration: 9,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const Flow_05 = ({
  eyebrow = "Flow for macOS",
  headline = "Don't type. Just talk.",
  subline = "Voice that keeps up with your thoughts — clean, formatted text in every app, four times faster than your keyboard.",
  ctaLabel = "Download free",
  secondaryLabel = "Watch the film",
  onCta,
  onSecondary,
  className,
}: Flow_05Props) => {
  return (
    <section
      className={cn(
        "relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-14 sm:px-12 sm:py-16",
        "shadow-[0_24px_70px_-30px_rgba(24,24,27,0.3)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {/* Breathing gradient blob field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/50 via-cyan-200/40 to-transparent blur-3xl dark:from-sky-500/25 dark:via-cyan-400/15"
          animate={{ scale: [1, 1.18, 1], x: [0, 24, 0], y: [0, 10, 0] }}
          transition={BREATH}
        />
        <motion.div
          className="absolute -bottom-28 -right-12 h-80 w-80 rounded-full bg-gradient-to-tl from-teal-300/45 via-emerald-200/35 to-transparent blur-3xl dark:from-teal-500/20 dark:via-emerald-400/10"
          animate={{ scale: [1.12, 1, 1.12], x: [0, -20, 0], y: [0, -12, 0] }}
          transition={BREATH}
        />
      </div>

      {/* Copy lifts gently on the gradient's inhale */}
      <motion.div
        className="relative flex flex-col items-center text-center"
        animate={{ y: [0, -5, 0] }}
        transition={BREATH}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {subline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            onClick={onCta}
            className={cn(
              "h-10 rounded-full bg-sky-600 px-6 text-sm text-white transition-transform duration-150",
              "hover:bg-sky-500 active:scale-[0.97] focus-visible:ring-sky-500",
              "dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
            )}
          >
            {ctaLabel}
            <ArrowRight aria-hidden className="ml-1.5 h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onSecondary}
            className="h-10 rounded-full px-5 text-sm text-zinc-600 transition-transform duration-150 hover:text-zinc-900 active:scale-[0.97] focus-visible:ring-sky-500 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {secondaryLabel}
          </Button>
        </div>

        <p className="mt-6 font-mono text-[10px] tracking-wide text-zinc-400 dark:text-zinc-600">
          Free for individuals · macOS 14+ · 2-minute setup
        </p>
      </motion.div>
    </section>
  );
};

export default Flow_05;
