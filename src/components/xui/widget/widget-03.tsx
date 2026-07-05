"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Widget_03Props {
  title?: string;
  /** 84 intensity values (12 weeks x 7 days), 0-4. Falls back to a generated pattern. */
  data?: number[];
  weeks?: number;
  className?: string;
  onCellChange?: (index: number, level: number) => void;
}

const WEEKS_DEFAULT = 12;
const DAYS = 7;

/** Deterministic pseudo-random pattern so SSR and client render identically. */
function seededPattern(cells: number): number[] {
  const out: number[] = [];
  let s = 42;
  for (let i = 0; i < cells; i++) {
    s = (s * 16807) % 2147483647;
    const r = s / 2147483647;
    // Weekends slightly lighter, recent weeks denser
    const day = i % DAYS;
    const week = Math.floor(i / DAYS);
    const recency = week / (cells / DAYS);
    const weekendDamp = day >= 5 ? 0.55 : 1;
    const v = r * weekendDamp * (0.45 + recency * 0.9);
    out.push(v < 0.18 ? 0 : v < 0.38 ? 1 : v < 0.58 ? 2 : v < 0.78 ? 3 : 4);
  }
  // Guarantee a live streak at the tail
  for (let i = cells - 9; i < cells; i++) out[i] = Math.max(out[i]!, 1);
  return out;
}

const levelClasses = [
  "bg-zinc-100 dark:bg-zinc-800/70",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-300 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-600 dark:bg-emerald-400",
];

function cellDate(base: Date, index: number, totalCells: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() - (totalCells - 1 - index));
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const Widget_03 = ({
  title = "Meditation",
  data,
  weeks = WEEKS_DEFAULT,
  className,
  onCellChange,
}: Widget_03Props) => {
  const totalCells = weeks * DAYS;
  const initial = useMemo(
    () =>
      data && data.length === totalCells
        ? data
        : seededPattern(totalCells),
    [data, totalCells]
  );
  const [levels, setLevels] = useState<number[]>(initial);
  const [hovered, setHovered] = useState<number | null>(null);
  // Dates resolve after mount so SSR markup never depends on the server clock.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const streak = useMemo(() => {
    let s = 0;
    for (let i = levels.length - 1; i >= 0 && levels[i]! > 0; i--) s++;
    return s;
  }, [levels]);

  const cycle = (i: number) => {
    setLevels((prev) => {
      const next = [...prev];
      next[i] = (next[i]! + 1) % 5;
      onCellChange?.(i, next[i]!);
      return next;
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            Last {weeks} weeks
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 py-1 pl-2 pr-2.5 dark:border-orange-500/20 dark:bg-orange-500/10"
          role="status"
          aria-label={`Current streak: ${streak} days`}
        >
          <motion.span
            key={streak}
            initial={{ scale: 1.5, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex"
            aria-hidden
          >
            <Flame className="h-3.5 w-3.5 fill-orange-400 text-orange-500" />
          </motion.span>
          <span className="font-mono text-xs font-semibold tabular-nums text-orange-600 dark:text-orange-400">
            {streak}
          </span>
          <span className="text-[10px] text-orange-500/70 dark:text-orange-400/60">
            day streak
          </span>
        </div>
      </div>

      {/* Grid: columns = weeks, rows = days */}
      <div
        className="relative mt-4 grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))`,
          gridAutoFlow: "column",
        }}
        role="grid"
        aria-label={`${title} activity heatmap`}
      >
        {levels.map((level, i) => {
          const date = today ? cellDate(today, i, totalCells) : null;
          return (
            <div key={i} className="relative" role="gridcell">
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                onClick={() => cycle(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-label={`${date ? formatDate(date) + ": " : ""}${level} ${
                  level === 1 ? "session" : "sessions"
                }. Click to change.`}
                className={cn(
                  "aspect-square w-full rounded-[3px] transition-colors duration-200",
                  "hover:ring-1 hover:ring-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:ring-zinc-500",
                  levelClasses[level]
                )}
              />
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    role="tooltip"
                    className={cn(
                      "pointer-events-none absolute bottom-full z-20 mb-1.5 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-50 shadow-lg dark:bg-zinc-100 dark:text-zinc-900",
                      i % totalCells < DAYS * 3
                        ? "left-0"
                        : i >= totalCells - DAYS * 3
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                    )}
                  >
                    <span className="tabular-nums">{level}</span>{" "}
                    {level === 1 ? "session" : "sessions"}
                    {date && (
                      <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                        {formatDate(date)}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Less</span>
        {levelClasses.map((c, i) => (
          <span key={i} aria-hidden className={cn("h-2.5 w-2.5 rounded-[3px]", c)} />
        ))}
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">More</span>
      </div>
    </div>
  );
};

export default Widget_03;
