"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export type Ring = {
  label: string;
  value: number; // 0-100
  detail: string;
  color: string; // stroke color
  track: string; // tailwind class for legend dot
};

const DEFAULT_RINGS: Ring[] = [
  { label: "Tasks", value: 86, detail: "31 of 36 done", color: "#10b981", track: "bg-emerald-500" },
  { label: "Focus", value: 64, detail: "3h 12m deep work", color: "#0ea5e9", track: "bg-sky-500" },
  { label: "Breaks", value: 48, detail: "5 of 10 taken", color: "#f59e0b", track: "bg-amber-500" },
];

const SIZE = 176;
const CENTER = SIZE / 2;
const STROKE = 11;
const GAP = 4;

function RingCircle({ ring, index }: { ring: Ring; index: number }) {
  const radius = CENTER - STROKE / 2 - index * (STROKE + GAP);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ring.value / 100);

  return (
    <g>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={radius}
        fill="none"
        stroke={ring.color}
        strokeOpacity={0.15}
        strokeWidth={STROKE}
      />
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={radius}
        fill="none"
        stroke={ring.color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay: 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        transform={`rotate(-90 ${CENTER} ${CENTER})`}
      />
    </g>
  );
}

const Stat_02 = ({
  rings = DEFAULT_RINGS,
  title = "Today's activity",
  streak = "12-day streak",
  className,
}: {
  rings?: Ring[];
  title?: string;
  streak?: string;
  className?: string;
}) => {
  const total = Math.round(
    rings.reduce((acc, r) => acc + r.value, 0) / rings.length
  );

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl p-6",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {title}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
          <Flame className="h-3 w-3" aria-hidden />
          {streak}
        </span>
      </div>

      <div className="relative mx-auto mt-5 h-44 w-44">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full"
          role="img"
          aria-label={`Activity rings, ${total} percent average completion`}
        >
          {rings.slice(0, 3).map((ring, i) => (
            <RingCircle key={ring.label} ring={ring} index={i} />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 25 }}
            className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            {total}%
          </motion.span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            overall
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-1">
        {rings.slice(0, 3).map((ring, i) => (
          <motion.div
            key={ring.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300, damping: 28 }}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5"
          >
            <span className={cn("h-2 w-2 shrink-0 rounded-full", ring.track)} aria-hidden />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {ring.label}
            </span>
            <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
              {ring.detail}
            </span>
            <span className="w-10 text-right text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {ring.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stat_02;
