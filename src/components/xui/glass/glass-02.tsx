"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Airplay,
  Music2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 420, damping: 30 };

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export interface Glass_02Props {
  title?: string;
  artist?: string;
  album?: string;
  /** Track length in seconds. */
  duration?: number;
  onTrackChange?: (direction: "prev" | "next") => void;
  className?: string;
}

const Glass_02 = ({
  title = "Weightless",
  artist = "Marconi Union",
  album = "Ambient Works",
  duration = 214,
  onTrackChange,
  className,
}: Glass_02Props) => {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(47);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(62);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setElapsed((e) => (e + 1 > duration ? 0 : e + 1)),
      1000
    );
    return () => window.clearInterval(id);
  }, [playing, duration]);

  const seek = (el: HTMLDivElement, clientX: number) => {
    const { left, width } = el.getBoundingClientRect();
    setElapsed(
      Math.round(Math.min(1, Math.max(0, (clientX - left) / width)) * duration)
    );
  };

  const setVol = (el: HTMLDivElement, clientX: number) => {
    const { left, width } = el.getBoundingClientRect();
    setVolume(Math.round(Math.min(100, Math.max(0, ((clientX - left) / width) * 100))));
  };

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/10 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-50 dark:focus-visible:ring-white/40";

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 p-4 sm:p-5 dark:border-zinc-800",
        "bg-gradient-to-br from-teal-200 via-sky-100 to-violet-200 dark:from-[#07202a] dark:via-[#101a33] dark:to-[#1d1233]",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-teal-400/50 blur-3xl dark:bg-teal-500/25" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-violet-400/40 blur-3xl dark:bg-violet-500/25" />

      <div className="relative rounded-[1.35rem] border border-white/40 bg-white/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-zinc-900/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_50px_-20px_rgba(0,0,0,0.7)]">
        {/* Artwork + meta */}
        <div className="flex items-center gap-4">
          <motion.div
            aria-hidden
            animate={{ scale: playing ? 1 : 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={cn(
              "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl",
              "bg-gradient-to-br from-teal-400 via-sky-500 to-violet-600",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
              playing && "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_30px_-10px_rgba(56,189,248,0.6)]"
            )}
          >
            <div className="absolute -left-4 -top-4 h-14 w-14 rounded-full bg-white/30 blur-xl" />
            <Music2 className="h-7 w-7 text-white/90 drop-shadow" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </p>
            <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">{artist}</p>
            <p className="mt-0.5 truncate text-[11px] text-zinc-500 dark:text-zinc-500">
              {album}
            </p>
          </div>
        </div>

        {/* Scrubber */}
        <div className="mt-4">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={elapsed}
            aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              seek(e.currentTarget, e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) seek(e.currentTarget, e.clientX);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setElapsed((v) => Math.max(0, v - 5));
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setElapsed((v) => Math.min(duration, v + 5));
              }
            }}
            className="group relative h-4 w-full cursor-pointer touch-none select-none focus-visible:outline-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-zinc-900/15 transition-[height] duration-150 group-hover:h-2.5 group-focus-visible:h-2.5 group-focus-visible:ring-2 group-focus-visible:ring-white/70 dark:bg-white/15 dark:group-focus-visible:ring-white/40">
              <motion.div
                aria-hidden
                animate={{ width: `${(elapsed / duration) * 100}%` }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="h-full rounded-full bg-zinc-800/80 dark:bg-white/85"
              />
            </div>
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
            <span>{formatTime(elapsed)}</span>
            <span>-{formatTime(duration - elapsed)}</span>
          </div>
        </div>

        {/* Transport */}
        <div className="mt-1 flex items-center justify-between">
          <motion.button
            type="button"
            aria-label="Shuffle"
            aria-pressed={shuffle}
            onClick={() => setShuffle((s) => !s)}
            whileTap={{ scale: 0.85 }}
            transition={spring}
            className={cn(iconBtn, "h-8 w-8", shuffle && "text-sky-600 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-400")}
          >
            <Shuffle aria-hidden className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Previous track"
            onClick={() => onTrackChange?.("prev")}
            whileTap={{ scale: 0.85 }}
            transition={spring}
            className={iconBtn}
          >
            <SkipBack aria-hidden className="h-4 w-4 fill-current" />
          </motion.button>
          <motion.button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            whileTap={{ scale: 0.88 }}
            transition={spring}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-white/40"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={playing ? "pause" : "play"}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex"
              >
                {playing ? (
                  <Pause aria-hidden className="h-5 w-5 fill-current" />
                ) : (
                  <Play aria-hidden className="ml-0.5 h-5 w-5 fill-current" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next track"
            onClick={() => onTrackChange?.("next")}
            whileTap={{ scale: 0.85 }}
            transition={spring}
            className={iconBtn}
          >
            <SkipForward aria-hidden className="h-4 w-4 fill-current" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Repeat"
            aria-pressed={repeat}
            onClick={() => setRepeat((r) => !r)}
            whileTap={{ scale: 0.85 }}
            transition={spring}
            className={cn(iconBtn, "h-8 w-8", repeat && "text-sky-600 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-400")}
          >
            <Repeat aria-hidden className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        {/* AirPlay + volume */}
        <div className="mt-3 flex items-center gap-3 border-t border-zinc-900/10 pt-3 dark:border-white/10">
          <Volume2
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 text-zinc-500 dark:text-zinc-400"
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Volume"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={volume}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setVol(e.currentTarget, e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) setVol(e.currentTarget, e.clientX);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                setVolume((v) => Math.max(0, v - 5));
              }
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                setVolume((v) => Math.min(100, v + 5));
              }
            }}
            className="group relative h-4 flex-1 cursor-pointer touch-none select-none focus-visible:outline-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-zinc-900/15 transition-[height] duration-150 group-hover:h-2 group-focus-visible:h-2 group-focus-visible:ring-2 group-focus-visible:ring-white/70 dark:bg-white/15 dark:group-focus-visible:ring-white/40">
              <div
                aria-hidden
                style={{ width: `${volume}%` }}
                className="h-full rounded-full bg-zinc-800/80 dark:bg-white/85"
              />
            </div>
          </div>
          <motion.button
            type="button"
            aria-label="AirPlay"
            whileTap={{ scale: 0.85 }}
            transition={spring}
            className={cn(iconBtn, "h-8 w-8")}
          >
            <Airplay aria-hidden className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Glass_02;
