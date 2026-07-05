"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Laptop, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StorageSegment {
  label: string;
  gb: number;
  className: string;
}

export interface Widget_05Props {
  deviceName?: string;
  battery?: number;
  /** Initial charging state. Toggleable via the plug button. */
  defaultCharging?: boolean;
  storageTotal?: number;
  storage?: StorageSegment[];
  /** 0–100 memory pressure */
  memoryPressure?: number;
  uptime?: string;
  className?: string;
}

const defaultStorage: StorageSegment[] = [
  { label: "Apps", gb: 118, className: "bg-sky-500" },
  { label: "Media", gb: 214, className: "bg-violet-500" },
  { label: "System", gb: 42, className: "bg-zinc-400 dark:bg-zinc-500" },
];

const Widget_05 = ({
  deviceName = "MacBook Pro 14”",
  battery = 68,
  defaultCharging = false,
  storageTotal = 512,
  storage = defaultStorage,
  memoryPressure = 42,
  uptime = "14d 06:32:11",
  className,
}: Widget_05Props) => {
  const [charging, setCharging] = useState(defaultCharging);
  const used = storage.reduce((a, s) => a + s.gb, 0);
  const pct = Math.min(100, Math.max(0, battery));
  const pressure = Math.min(100, Math.max(0, memoryPressure));

  // Memory gauge: half-circle arc
  const arcR = 26;
  const arcLen = Math.PI * arcR;

  const batteryTone =
    pct <= 20
      ? "bg-rose-500"
      : charging
        ? "bg-emerald-500"
        : "bg-emerald-500/90 dark:bg-emerald-500";

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <Laptop aria-hidden className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {deviceName}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            Online
          </p>
        </div>
      </div>

      {/* Battery */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Battery
          </p>
          <div className="flex items-center gap-1.5">
            <AnimatePresence>
              {charging && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  className="inline-flex"
                >
                  <Zap
                    aria-hidden
                    className="h-3.5 w-3.5 fill-emerald-400 text-emerald-500"
                  />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="font-mono text-xs font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
              {pct}%
            </span>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div
            role="meter"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Battery ${pct} percent${charging ? ", charging" : ""}`}
            className="relative h-3 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800/80"
          >
            <motion.div
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn("h-full rounded-full", batteryTone)}
            >
              {charging && (
                <motion.div
                  aria-hidden
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              )}
            </motion.div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={charging}
            aria-label={charging ? "Unplug charger" : "Plug in charger"}
            onClick={() => setCharging((c) => !c)}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md border transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              charging
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
          >
            <Zap aria-hidden className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Storage */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Storage
          </p>
          <p className="font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400">
            {used} / {storageTotal} GB
          </p>
        </div>
        <div
          className="mt-1.5 flex h-3 w-full gap-px overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800/80"
          role="img"
          aria-label={`Storage: ${used} of ${storageTotal} gigabytes used`}
        >
          {storage.map((seg) => (
            <motion.div
              key={seg.label}
              initial={false}
              animate={{ width: `${(seg.gb / storageTotal) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className={cn("h-full first:rounded-l-full", seg.className)}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {storage.map((seg) => (
            <span
              key={seg.label}
              className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400"
            >
              <span
                aria-hidden
                className={cn("h-2 w-2 rounded-[3px]", seg.className)}
              />
              {seg.label}
              <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
                {seg.gb} GB
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Memory + uptime */}
      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="relative h-9 w-[60px] shrink-0">
          <svg
            viewBox="0 0 60 34"
            className="h-full w-full"
            role="meter"
            aria-valuenow={pressure}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Memory pressure ${pressure} percent`}
          >
            <path
              d="M 4 32 A 26 26 0 0 1 56 32"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-zinc-200 dark:stroke-zinc-800"
            />
            <motion.path
              d="M 4 32 A 26 26 0 0 1 56 32"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={arcLen}
              initial={false}
              animate={{ strokeDashoffset: arcLen * (1 - pressure / 100) }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className={cn(
                pressure > 75
                  ? "stroke-rose-500"
                  : pressure > 50
                    ? "stroke-amber-500"
                    : "stroke-sky-500"
              )}
            />
          </svg>
          <span className="absolute inset-x-0 bottom-0 text-center font-mono text-[10px] font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
            {pressure}%
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Memory pressure
          </p>
          <p className="mt-1 flex items-baseline justify-between gap-2 text-[10px] text-zinc-400 dark:text-zinc-500">
            Uptime
            <span className="truncate font-mono text-[11px] tabular-nums text-zinc-700 dark:text-zinc-300">
              {uptime}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget_05;
