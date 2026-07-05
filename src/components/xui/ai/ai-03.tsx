"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModelUsage {
  model: string;
  /** Tokens in millions */
  tokens: number;
  /** Tailwind bg class for the segment tint */
  tint: string;
}

export interface DailyUsage {
  /** e.g. "Jun 22" */
  label: string;
  /** Tokens in millions */
  tokens: number;
}

const defaultByModel: ModelUsage[] = [
  { model: "Atlas 4 Opus", tokens: 18.4, tint: "bg-sky-500" },
  { model: "Nova 2 Pro", tokens: 11.2, tint: "bg-sky-400/70" },
  { model: "Atlas 4 Swift", tokens: 8.9, tint: "bg-sky-300/60" },
  { model: "Sable R1", tokens: 3.7, tint: "bg-zinc-300 dark:bg-zinc-700" },
];

const defaultDaily: DailyUsage[] = [
  { label: "Jun 21", tokens: 2.1 },
  { label: "Jun 22", tokens: 2.8 },
  { label: "Jun 23", tokens: 1.9 },
  { label: "Jun 24", tokens: 3.4 },
  { label: "Jun 25", tokens: 2.6 },
  { label: "Jun 26", tokens: 1.2 },
  { label: "Jun 27", tokens: 0.9 },
  { label: "Jun 28", tokens: 3.1 },
  { label: "Jun 29", tokens: 4.2 },
  { label: "Jun 30", tokens: 3.8 },
  { label: "Jul 01", tokens: 2.9 },
  { label: "Jul 02", tokens: 4.6 },
  { label: "Jul 03", tokens: 3.3 },
  { label: "Jul 04", tokens: 5.4 },
];

export interface Ai_03Props {
  byModel?: ModelUsage[];
  daily?: DailyUsage[];
  /** Budget in millions of tokens */
  budget?: number;
  period?: string;
  className?: string;
}

const Ai_03 = ({
  byModel = defaultByModel,
  daily = defaultDaily,
  budget = 50,
  period = "This period",
  className,
}: Ai_03Props) => {
  const total = byModel.reduce((acc, m) => acc + m.tokens, 0);
  const [display, setDisplay] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(total * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [total]);

  const usedPct = Math.min(100, (total / budget) * 100);
  const nearBudget = usedPct >= 80;
  const maxDaily = Math.max(...daily.map((d) => d.tokens));

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* Big number */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
            {period} · tokens
          </p>
          <p className="mt-1 font-mono text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
            {display.toFixed(1)}
            <span className="ml-1 text-lg font-normal text-zinc-400 dark:text-zinc-600">
              M
            </span>
          </p>
        </div>
        <p className="pb-1 text-right font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-600">
          of {budget}M budget
        </p>
      </div>

      {/* Stacked bar by model */}
      <div
        className="mt-4 flex h-2.5 w-full gap-px overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
        role="img"
        aria-label={`Token usage by model, ${total.toFixed(1)} million total`}
      >
        {byModel.map((m, i) => (
          <motion.div
            key={m.model}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.15 + i * 0.08,
            }}
            style={{ width: `${(m.tokens / total) * 100}%`, originX: 0 }}
            className={cn("h-full", m.tint)}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
        {byModel.map((m) => (
          <span
            key={m.model}
            className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400"
          >
            <span aria-hidden className={cn("h-2 w-2 rounded-sm", m.tint)} />
            {m.model}
            <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-600">
              {m.tokens.toFixed(1)}M
            </span>
          </span>
        ))}
      </div>

      {/* Daily mini chart */}
      <div className="mt-5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
          Daily usage · 14 days
        </p>
        <div className="mt-2 flex h-16 items-end gap-1" role="img" aria-label="Daily token usage chart">
          {daily.map((d, i) => (
            <div
              key={d.label}
              className="group relative flex h-full flex-1 items-end"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 480, damping: 30 }}
                    className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-center font-mono text-[9px] tabular-nums text-zinc-100 shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {d.label} · {d.tokens.toFixed(1)}M
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.tokens / maxDaily) * 100}%` }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  delay: 0.3 + i * 0.04,
                }}
                className={cn(
                  "w-full rounded-sm transition-colors",
                  hovered === i
                    ? "bg-sky-500"
                    : "bg-zinc-200 dark:bg-zinc-800"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Budget progress */}
      <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-900">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
            Budget
            {nearBudget && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-px text-[9px] font-medium normal-case tracking-normal text-amber-600 dark:text-amber-400">
                <TriangleAlert aria-hidden className="h-2.5 w-2.5" />
                {usedPct.toFixed(0)}% used
              </span>
            )}
          </p>
          <p className="font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
            {total.toFixed(1)}M / {budget}M
          </p>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usedPct}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 32, delay: 0.4 }}
            className={cn(
              "h-full rounded-full",
              nearBudget ? "bg-amber-500" : "bg-sky-500"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Ai_03;
