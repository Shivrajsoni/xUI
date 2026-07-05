"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, Cloud, MapPin, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HourForecast {
  label: string;
  temp: number;
  icon?: "sun" | "cloud";
}

export interface Widget_01Props {
  city?: string;
  condition?: string;
  temp?: number;
  high?: number;
  low?: number;
  hours?: HourForecast[];
  /** Initial day/night state. Toggleable in the UI. */
  defaultNight?: boolean;
  className?: string;
}

const defaultHours: HourForecast[] = [
  { label: "Now", temp: 21, icon: "sun" },
  { label: "3PM", temp: 22, icon: "sun" },
  { label: "4PM", temp: 22, icon: "cloud" },
  { label: "5PM", temp: 20, icon: "cloud" },
  { label: "6PM", temp: 18, icon: "cloud" },
];

const Widget_01 = ({
  city = "San Francisco",
  condition = "Partly cloudy",
  temp = 21,
  high = 23,
  low = 14,
  hours = defaultHours,
  defaultNight = false,
  className,
}: Widget_01Props) => {
  const [night, setNight] = useState(defaultNight);

  return (
    <div
      className={cn(
        "relative w-full max-w-xs overflow-hidden rounded-3xl border shadow-[0_16px_50px_-24px_rgba(24,24,27,0.35)] transition-colors duration-700",
        night
          ? "border-indigo-950/60 bg-[#0a0d1f] dark:border-indigo-500/15"
          : "border-sky-100 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Sky tint */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          night ? "opacity-0" : "opacity-100"
        )}
        style={{
          background:
            "linear-gradient(160deg, rgba(56,189,248,0.18) 0%, rgba(125,211,252,0.08) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          night ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(160deg, rgba(99,102,241,0.22) 0%, rgba(30,27,75,0.35) 50%, transparent 80%)",
        }}
      />

      {/* Stars (night only) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-700",
          night ? "opacity-100" : "opacity-0"
        )}
      >
        {[
          [12, 18],
          [28, 8],
          [46, 22],
          [64, 10],
          [82, 26],
          [90, 12],
          [70, 40],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-indigo-200/80"
            style={{ left: `${x}%`, top: `${y}px` }}
          />
        ))}
      </div>

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p
              className={cn(
                "flex items-center gap-1 text-xs font-medium transition-colors duration-700",
                night ? "text-indigo-200/70" : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              <MapPin aria-hidden className="h-3 w-3" />
              {city}
            </p>
            <p
              className={cn(
                "mt-0.5 text-[11px] transition-colors duration-700",
                night ? "text-indigo-200/50" : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {condition}
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={night}
            aria-label={night ? "Switch to day view" : "Switch to night view"}
            onClick={() => setNight((n) => !n)}
            className={cn(
              "relative flex h-7 w-12 items-center rounded-full border px-0.5 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              night
                ? "border-indigo-500/30 bg-indigo-950 focus-visible:ring-indigo-400 focus-visible:ring-offset-[#0a0d1f]"
                : "border-sky-200 bg-sky-100 hover:bg-sky-200/70 focus-visible:ring-sky-400 dark:border-zinc-700 dark:bg-zinc-800"
            )}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full shadow-sm",
                night ? "ml-auto bg-indigo-400 text-indigo-950" : "bg-white text-amber-500"
              )}
            >
              {night ? (
                <Moon aria-hidden className="h-3.5 w-3.5" />
              ) : (
                <Sun aria-hidden className="h-3.5 w-3.5" />
              )}
            </motion.span>
          </button>
        </div>

        {/* Celestial scene */}
        <div className="relative mt-4 flex h-24 items-center">
          <div className="relative h-20 w-24">
            {/* Sun / Moon crossfade */}
            <AnimatePresence mode="popLayout" initial={false}>
              {night ? (
                <motion.div
                  key="moon"
                  initial={{ y: 24, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 24, opacity: 0, rotate: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="absolute left-2 top-1"
                  aria-hidden
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-300 shadow-[0_0_30px_rgba(165,180,252,0.45)]" />
                  <div className="absolute left-2.5 top-3 h-2 w-2 rounded-full bg-indigo-300/60" />
                  <div className="absolute left-6 top-6.5 h-1.5 w-1.5 rounded-full bg-indigo-300/50" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: 24, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 24, opacity: 0, rotate: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="absolute left-2 top-1"
                  aria-hidden
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="h-12 w-12"
                  >
                    {[0, 45, 90, 135].map((deg) => (
                      <span
                        key={deg}
                        className="absolute left-1/2 top-1/2 h-[68px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-amber-300/70 via-transparent to-amber-300/70"
                        style={{ transform: `translate(-50%,-50%) rotate(${deg}deg)` }}
                      />
                    ))}
                  </motion.div>
                  <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 shadow-[0_0_36px_rgba(251,191,36,0.5)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drifting cloud */}
            <motion.div
              aria-hidden
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 bottom-0"
            >
              <Cloud
                className={cn(
                  "h-10 w-10 drop-shadow-sm transition-colors duration-700",
                  night
                    ? "fill-indigo-900 stroke-indigo-700"
                    : "fill-white stroke-sky-200 dark:fill-zinc-800 dark:stroke-zinc-700"
                )}
              />
            </motion.div>
          </div>

          {/* Temperature */}
          <div className="ml-auto text-right">
            <p
              className={cn(
                "font-mono text-5xl font-semibold tabular-nums tracking-tight transition-colors duration-700",
                night ? "text-indigo-50" : "text-zinc-900 dark:text-zinc-50"
              )}
            >
              {night ? temp - 5 : temp}°
            </p>
            <p
              className={cn(
                "mt-1 flex items-center justify-end gap-2 text-[11px] tabular-nums transition-colors duration-700",
                night ? "text-indigo-200/60" : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              <span className="flex items-center gap-0.5">
                <ArrowUp aria-hidden className="h-3 w-3" />
                {high}°
              </span>
              <span className="flex items-center gap-0.5">
                <ArrowDown aria-hidden className="h-3 w-3" />
                {low}°
              </span>
            </p>
          </div>
        </div>

        {/* Hourly strip */}
        <div
          className={cn(
            "mt-4 grid grid-cols-5 gap-1 rounded-2xl border p-2 transition-colors duration-700",
            night
              ? "border-indigo-500/15 bg-indigo-950/40"
              : "border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/60"
          )}
        >
          {hours.slice(0, 5).map((h, i) => (
            <div key={h.label} className="flex flex-col items-center gap-1.5 py-1">
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-700",
                  i === 0
                    ? night
                      ? "text-indigo-100"
                      : "text-zinc-900 dark:text-zinc-100"
                    : night
                      ? "text-indigo-200/50"
                      : "text-zinc-400 dark:text-zinc-500"
                )}
              >
                {h.label}
              </span>
              {night || h.icon === "cloud" ? (
                h.icon === "cloud" ? (
                  <Cloud
                    aria-hidden
                    className={cn(
                      "h-3.5 w-3.5 transition-colors duration-700",
                      night ? "text-indigo-300/70" : "text-sky-400"
                    )}
                  />
                ) : (
                  <Moon aria-hidden className="h-3.5 w-3.5 text-indigo-300/70" />
                )
              ) : (
                <Sun aria-hidden className="h-3.5 w-3.5 text-amber-400" />
              )}
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums transition-colors duration-700",
                  night ? "text-indigo-100" : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {night ? h.temp - 5 : h.temp}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget_01;
