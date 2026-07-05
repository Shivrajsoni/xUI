"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  /** Length in seconds. */
  duration: number;
  /** Listening progress 0–1. */
  progress: number;
  /** Tailwind gradient classes for the episode art. */
  art: string;
}

export interface Media_03Props {
  episodes?: PodcastEpisode[];
  /** Episode id playing on first render; null for none. */
  initialActiveId?: string | null;
  onPlayChange?: (id: string | null) => void;
  className?: string;
}

const defaultEpisodes: PodcastEpisode[] = [
  {
    id: "ep-48",
    title: "Why design systems drift",
    show: "Interface Radio",
    duration: 2520,
    progress: 0.42,
    art: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "ep-47",
    title: "Shipping the first ten users",
    show: "Founder Notes",
    duration: 1980,
    progress: 0,
    art: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    id: "ep-46",
    title: "The case for boring tech",
    show: "Interface Radio",
    duration: 3120,
    progress: 0.87,
    art: "from-indigo-400 via-violet-500 to-purple-600",
  },
];

const speeds = [1, 1.5, 2] as const;

function formatDuration(s: number) {
  const m = Math.round(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`;
}

const eqBars = [
  { delay: 0, dur: 0.9 },
  { delay: 0.2, dur: 0.7 },
  { delay: 0.1, dur: 1.1 },
  { delay: 0.3, dur: 0.8 },
];

const Media_03 = ({
  episodes = defaultEpisodes,
  initialActiveId = "ep-48",
  onPlayChange,
  className,
}: Media_03Props) => {
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);
  const [speedIdx, setSpeedIdx] = useState(0);

  const toggle = (id: string) => {
    setActiveId((cur) => {
      const next = cur === id ? null : id;
      onPlayChange?.(next);
      return next;
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Latest episodes
          </h3>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Fresh from your shows
          </p>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          aria-label={`Playback speed ${speeds[speedIdx]}x, tap to change`}
          onClick={() => setSpeedIdx((i) => (i + 1) % speeds.length)}
          className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium tabular-nums text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          {speeds[speedIdx]}×
        </motion.button>
      </div>

      <ul className="mt-3 pb-2">
        {episodes.map((ep) => {
          const active = ep.id === activeId;
          return (
            <li key={ep.id} className="relative px-2">
              <div
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors",
                  active
                    ? "bg-amber-50/70 dark:bg-amber-500/[0.07]"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                )}
              >
                {/* Art */}
                <div
                  aria-hidden
                  className={cn(
                    "relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br shadow-inner",
                    ep.art
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_55%)]" />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      active
                        ? "text-zinc-900 dark:text-zinc-50"
                        : "text-zinc-800 dark:text-zinc-200"
                    )}
                  >
                    {ep.title}
                  </p>
                  <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
                    {ep.show} · {formatDuration(ep.duration)}
                  </p>
                </div>

                {/* Equalizer while playing */}
                {active && (
                  <div
                    aria-hidden
                    className="flex h-4 items-end gap-0.5 pr-0.5"
                  >
                    {eqBars.map((b, i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full bg-amber-500 dark:bg-amber-400"
                        animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                        transition={{
                          duration: b.dur,
                          delay: b.delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Play / pause */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  aria-label={active ? `Pause ${ep.title}` : `Play ${ep.title}`}
                  onClick={() => toggle(ep.id)}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                    active
                      ? "bg-amber-500 text-white shadow-sm hover:bg-amber-400 dark:text-amber-950"
                      : "border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                  )}
                >
                  {active ? (
                    <Pause className="h-4 w-4 fill-current" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  )}
                </motion.button>

                {/* Progress hairline */}
                {active && ep.progress > 0 && (
                  <motion.div
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-x-2 bottom-0 h-px origin-left overflow-visible rounded-full bg-zinc-200 dark:bg-zinc-800"
                  >
                    <div
                      className="h-full rounded-full bg-amber-500 dark:bg-amber-400"
                      style={{ width: `${ep.progress * 100}%` }}
                    />
                  </motion.div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Media_03;
