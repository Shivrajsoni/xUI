"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Link } from "next-view-transitions";
import Features from "./Features";
import InstallCommand from "./InstallCommand";
import { siteConfig } from "@/config/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Atmospheric background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.zinc.200/40)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.200/40)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,theme(colors.zinc.800/40)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.800/40)_1px,transparent_1px)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-20 pb-12 text-center sm:pt-28"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 backdrop-blur">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Built for Tailwind v4 &amp; React 19
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl"
        >
          Beautiful components.
          <br />
          <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400">
            Copy, paste, ship.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-lg text-zinc-600 dark:text-zinc-400"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Browse components
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-8 w-full max-w-md">
          <InstallCommand />
        </motion.div>

        <motion.div variants={item} className="mt-12 w-full">
          <Features />
        </motion.div>
      </motion.div>
    </section>
  );
}
