"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Media_05Props {
  title?: string;
  author?: string;
  /** Clip length in seconds. */
  duration?: number;
  /** Number of waveform bars. */
  barCount?: number;
  onSeek?: (seconds: number) => void;
  className?: string;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** Deterministic pseudo-random heights so SSR and client always match. */
function waveHeights(count: number): number[] {
  const heights: number[] = [];
  for (let i = 0; i < count; i++) {
    const v =
      0.35 +
      0.3 * Math.abs(Math.sin(i * 0.55 + 1.3)) +
      0.35 * Math.abs(Math.sin(i * 0.21 + 0.4) * Math.cos(i * 0.83));
    heights.push(Math.min(1, Math.max(0.12, v)));
  }
  return heights;
}

const Media_05 = ({
  title = "Field notes — episode 12",
  author = "Maya Patel",
  duration = 187,
  barCount = 60,
  onSeek,
  className,
}: Media_05Props) => {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(64);
  const [scrubbing, setScrubbing] = useState(false);
  const [bubbleRatio, setBubbleRatio] = useState<number | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  const heights = useMemo(() => waveHeights(barCount), [barCount]);

  useEffect(() => {
    if (!playing || scrubbing) return;
    const id = window.setInterval(
      () =>
        setPosition((p) => {
          if (p + 0.25 >= duration) {
            return duration;
          }
          return p + 0.25;
        }),
      250
    );
    return () => window.clearInterval(id);
  }, [playing, scrubbing, duration]);

  const ratioFromClientX = (clientX: number) => {
    const el = waveRef.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - left) / width));
  };

  const seekRatio = (ratio: number) => {
    const next = ratio * duration;
    setPosition(next);
    onSeek?.(next);
  };

  const skip = (delta: number) => {
    const next = Math.min(duration, Math.max(0, position + delta));
    setPosition(next);
    onSeek?.(next);
  };

  const progress = position / duration;
  const playedBars = Math.floor(progress * barCount);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
            {author}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
          {formatTime(position)}
          <span className="text-zinc-300 dark:text-zinc-600">
            {" "}
            / {formatTime(duration)}
          </span>
        </span>
      </div>

      {/* Waveform */}
      <div
        ref={waveRef}
        role="slider"
        tabIndex={0}
        aria-label="Audio position"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={Math.round(position)}
        aria-valuetext={formatTime(position)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") skip(5);
          if (e.key === "ArrowLeft") skip(-5);
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setScrubbing(true);
          const r = ratioFromClientX(e.clientX);
          setBubbleRatio(r);
          seekRatio(r);
        }}
        onPointerMove={(e) => {
          if (!scrubbing) return;
          const r = ratioFromClientX(e.clientX);
          setBubbleRatio(r);
          seekRatio(r);
        }}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          setScrubbing(false);
          setBubbleRatio(null);
        }}
        className="relative mt-4 flex h-16 cursor-pointer touch-none items-center gap-[2px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {heights.map((h, i) => (
          <div
            key={i}
            aria-hidden
            className={cn(
              "min-w-0 flex-1 rounded-full transition-colors duration-150",
              i <= playedBars
                ? "bg-emerald-500 dark:bg-emerald-400"
                : "bg-zinc-200 dark:bg-zinc-800"
            )}
            style={{ height: `${h * 100}%` }}
          />
        ))}

        {/* Playhead */}
        <motion.div
          aria-hidden
          animate={{ left: `${progress * 100}%` }}
          transition={
            scrubbing
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-emerald-600/70 dark:bg-emerald-300/70"
        />

        {/* Scrub bubble */}
        <AnimatePresence>
          {scrubbing && bubbleRatio !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="pointer-events-none absolute -top-8 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 font-mono text-[11px] tabular-nums text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
              style={{ left: `${bubbleRatio * 100}%` }}
            >
              {formatTime(bubbleRatio * duration)}
              <span
                aria-hidden
                className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-900 dark:bg-zinc-100"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85, rotate: -20 }}
          aria-label="Back 15 seconds"
          onClick={() => skip(-15)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <RotateCcw className="h-5.5 w-5.5" />
          <span className="absolute text-[8px] font-bold">15</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-zinc-950"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? "pause" : "play"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex"
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.85, rotate: 20 }}
          aria-label="Forward 15 seconds"
          onClick={() => skip(15)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <RotateCw className="h-5.5 w-5.5" />
          <span className="absolute text-[8px] font-bold">15</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Media_05;
