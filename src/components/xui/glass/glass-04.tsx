"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlassReminder {
  id: string;
  label: string;
  done: boolean;
}

export interface Glass_04Props {
  weekday?: string;
  day?: number;
  nextEvent?: string;
  nextEventTime?: string;
  location?: string;
  temperature?: number;
  condition?: string;
  high?: number;
  low?: number;
  /** Battery charge, 0–100. */
  battery?: number;
  reminders?: GlassReminder[];
  onReminderToggle?: (id: string, done: boolean) => void;
  className?: string;
}

const defaultReminders: GlassReminder[] = [
  { id: "r1", label: "Review PR #482", done: false },
  { id: "r2", label: "Book flights to NYC", done: false },
  { id: "r3", label: "Send invoice to Maya", done: true },
];

const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;

const Glass_04 = ({
  weekday = "Saturday",
  day = 5,
  nextEvent = "Design review",
  nextEventTime = "2:00 PM",
  location = "San Jose",
  temperature = 72,
  condition = "Sunny",
  high = 78,
  low = 61,
  battery = 82,
  reminders = defaultReminders,
  onReminderToggle,
  className,
}: Glass_04Props) => {
  const [items, setItems] = useState(reminders);
  const pct = Math.min(100, Math.max(0, battery));

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        onReminderToggle?.(id, !r.done);
        return { ...r, done: !r.done };
      })
    );
  };

  const tile =
    "flex flex-col rounded-2xl border border-white/50 bg-white/50 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_30px_-14px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-zinc-900/50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_30px_-14px_rgba(0,0,0,0.7)]";

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 p-4 sm:p-5 dark:border-zinc-800",
        "bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-200 dark:from-[#0a2418] dark:via-[#0c1c30] dark:to-[#191233]",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -left-12 -top-14 h-48 w-48 rounded-full bg-emerald-300/50 blur-3xl dark:bg-emerald-500/20" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-indigo-400/40 blur-3xl dark:bg-indigo-500/25" />

      <div className="relative grid grid-cols-2 gap-3">
        {/* Calendar */}
        <div className={cn(tile, "min-h-[8.5rem] justify-between")}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
              {weekday}
            </p>
            <p className="mt-0.5 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {day}
            </p>
          </div>
          <div className="mt-2 border-l-2 border-sky-500 pl-2 dark:border-sky-400">
            <p className="truncate text-[11px] font-medium leading-tight text-zinc-800 dark:text-zinc-100">
              {nextEvent}
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{nextEventTime}</p>
          </div>
        </div>

        {/* Weather */}
        <div className={cn(tile, "min-h-[8.5rem] justify-between")}>
          <div className="flex items-start justify-between">
            <div>
              <p className="truncate text-[11px] font-semibold text-zinc-800 dark:text-zinc-100">
                {location}
              </p>
              <p className="text-3xl font-light tabular-nums text-zinc-900 dark:text-zinc-50">
                {temperature}°
              </p>
            </div>
            <Sun aria-hidden className="mt-0.5 h-5 w-5 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300">{condition}</p>
            <p className="text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
              H:{high}° L:{low}°
            </p>
          </div>
        </div>

        {/* Battery ring */}
        <div className={cn(tile, "min-h-[8.5rem] items-center justify-center gap-1.5")}>
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
              <circle
                cx="32"
                cy="32"
                r={RING_R}
                fill="none"
                strokeWidth="6"
                className="stroke-zinc-900/10 dark:stroke-white/10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={RING_R}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                initial={{ strokeDashoffset: RING_C }}
                animate={{ strokeDashoffset: RING_C * (1 - pct / 100) }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.15 }}
                className={cn(
                  pct <= 20
                    ? "stroke-red-500"
                    : pct <= 50
                      ? "stroke-amber-500"
                      : "stroke-emerald-500 dark:stroke-emerald-400"
                )}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              {pct}
              <span className="text-[9px] font-medium text-zinc-500 dark:text-zinc-400">%</span>
            </span>
          </div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Battery
          </p>
        </div>

        {/* Reminders */}
        <div className={cn(tile, "min-h-[8.5rem]")}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            Reminders
          </p>
          <ul className="mt-2 space-y-1.5">
            {items.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={r.done}
                  onClick={() => toggle(r.id)}
                  className="group flex w-full items-center gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.98] dark:focus-visible:ring-white/40"
                >
                  <span
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                      r.done
                        ? "border-orange-500 bg-orange-500 dark:border-orange-400 dark:bg-orange-400"
                        : "border-zinc-400 group-hover:border-orange-500 dark:border-zinc-500 dark:group-hover:border-orange-400"
                    )}
                  >
                    {r.done && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="flex"
                      >
                        <Check aria-hidden className="h-2 w-2 text-white dark:text-zinc-900" strokeWidth={4} />
                      </motion.span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "truncate text-[11px] transition-colors duration-200",
                      r.done
                        ? "text-zinc-400 line-through dark:text-zinc-500"
                        : "text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {r.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Glass_04;
