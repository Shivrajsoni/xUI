"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Meter {
  label: string;
  used: string;
  limit: string;
  pct: number;
}

export interface Payment_05Props {
  plan?: string;
  renewal?: string;
  ringPct?: number;
  ringLabel?: string;
  ringUsed?: string;
  ringLimit?: string;
  meters?: Meter[];
  onUpgrade?: () => void;
  className?: string;
}

const RING_SIZE = 132;
const RING_STROKE = 9;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

const Payment_05 = ({
  plan = "Pro Plan",
  renewal = "Renews Aug 1, 2026",
  ringPct = 68,
  ringLabel = "API calls",
  ringUsed = "34.2k",
  ringLimit = "50k",
  meters = [
    { label: "Storage", used: "18.4 GB", limit: "25 GB", pct: 74 },
    { label: "Seats", used: "4", limit: "5", pct: 80 },
  ],
  onUpgrade,
  className,
}: Payment_05Props) => {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {plan}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <CalendarClock aria-hidden className="h-3.5 w-3.5" />
            {renewal}
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Active
        </span>
      </div>

      {/* Progress ring */}
      <div className="mt-6 flex justify-center">
        <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="-rotate-90"
            role="img"
            aria-label={`${ringLabel}: ${ringUsed} of ${ringLimit} used (${ringPct}%)`}
          >
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              className="stroke-zinc-100 dark:stroke-zinc-900"
            />
            <motion.circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              strokeDasharray={RING_CIRC}
              initial={{ strokeDashoffset: RING_CIRC }}
              animate={{
                strokeDashoffset: RING_CIRC * (1 - ringPct / 100),
              }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
              className="stroke-emerald-500 [filter:drop-shadow(0_0_6px_rgba(16,185,129,0.35))]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
              className="font-mono text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50"
            >
              {ringPct}%
            </motion.span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600">
              {ringLabel}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
        {ringUsed}{" "}
        <span className="text-zinc-300 dark:text-zinc-700">/</span> {ringLimit}
      </p>

      {/* Linear meters */}
      <div className="mt-6 space-y-4">
        {meters.map((meter, i) => (
          <div key={meter.label}>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-400">
                {meter.label}
              </span>
              <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                {meter.used}{" "}
                <span className="text-zinc-300 dark:text-zinc-700">/</span>{" "}
                {meter.limit}
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={meter.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${meter.label} usage`}
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${meter.pct}%` }}
                transition={{
                  duration: 0.9,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.4 + i * 0.15,
                }}
                className="h-full rounded-full bg-emerald-500/80"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onUpgrade}
        className="mt-6 h-9 w-full gap-1.5 border border-zinc-200 text-xs text-zinc-700 transition-transform duration-150 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        Upgrade plan
        <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default Payment_05;
