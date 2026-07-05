"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import InstallCommand from "./InstallCommand";
import Features from "./Features";
import GridBeams from "./GridBeams";
import { siteConfig } from "@/config/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: "108", label: "Components" },
  { value: "35+", label: "Categories" },
  { value: "MIT", label: "License" },
  { value: "0", label: "Lock-in" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Interactive glowing grid — lightning threads follow the cursor */}
      <GridBeams />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-20 text-center sm:pb-20 sm:pt-28"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 py-1 pl-1.5 pr-3 text-xs text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-white dark:bg-zinc-100 dark:text-zinc-900">
              New
            </span>
            108 components · Tailwind v4 · React 19
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-balance text-[2.75rem] font-semibold leading-[1.04] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-[4.25rem]"
        >
          Components worth{" "}
          <span className="font-display italic font-normal text-zinc-500 dark:text-zinc-400">
            copying
          </span>
          .
          <br />
          Code you fully{" "}
          <span className="font-display italic font-normal text-zinc-500 dark:text-zinc-400">
            own
          </span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
        >
          Interactive React + Tailwind components. One command — the source
          lands in your project, yours to keep.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/docs"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-900 pl-6 pr-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Browse components
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white/60 px-6 text-sm font-medium text-zinc-700 backdrop-blur transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Star on GitHub
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-9 w-full max-w-md">
          <InstallCommand />
        </motion.div>

        {/* Stat strip */}
        <motion.div
          variants={item}
          className="mt-12 grid w-full max-w-md grid-cols-4 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-white/60 backdrop-blur dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/60"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-3.5 text-center">
              <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {s.value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-14 w-full">
          <Features />
        </motion.div>
      </motion.div>
    </section>
  );
}
