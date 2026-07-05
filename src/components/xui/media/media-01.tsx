"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface UpNextTrack {
  title: string;
  artist: string;
  /** Tailwind gradient classes for the mini artwork. */
  art: string;
}

export interface Media_01Props {
  title?: string;
  artist?: string;
  album?: string;
  /** Track length in seconds. */
  duration?: number;
  upNext?: UpNextTrack[];
  onLikeChange?: (liked: boolean) => void;
  onQueueOpen?: () => void;
  className?: string;
}

const defaultUpNext: UpNextTrack[] = [
  {
    title: "Glass Rivers",
    artist: "Maya Patel",
    art: "from-sky-400 via-cyan-500 to-teal-600",
  },
  {
    title: "Night Commute",
    artist: "Sam Chen",
    art: "from-rose-400 via-orange-400 to-amber-500",
  },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const Media_01 = ({
  title = "Low Orbit",
  artist = "Alex Rivera",
  album = "Signals at Dusk",
  duration = 214,
  upNext = defaultUpNext,
  onLikeChange,
  onQueueOpen,
  className,
}: Media_01Props) => {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [position, setPosition] = useState(52);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setPosition((p) => (p + 1 > duration ? 0 : p + 1)),
      1000
    );
    return () => window.clearInterval(id);
  }, [playing, duration]);

  const ratioFromEvent = useCallback((clientX: number) => {
    const el = barRef.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - left) / width));
  }, []);

  const progress = position / duration;

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_-28px_rgba(24,24,27,0.35)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_70px_-28px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {/* Artwork */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 dark:from-indigo-600 dark:via-violet-700 dark:to-fuchsia-700" />
        {/* Vinyl sheen — the signature moment: slow rotation only while playing */}
        <motion.div
          aria-hidden
          className="absolute -inset-1/4"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing
              ? { duration: 14, ease: "linear", repeat: Infinity }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.16) 40deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.1) 220deg, transparent 270deg)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.35),transparent_45%)]"
        />
        <div
          aria-hidden
          className="absolute bottom-4 left-4 h-10 w-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm"
        >
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
        </div>
      </div>

      {/* Title row */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </p>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {artist} — {album}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            aria-label={liked ? "Remove from liked songs" : "Add to liked songs"}
            aria-pressed={liked}
            onClick={() => {
              setLiked((v) => {
                onLikeChange?.(!v);
                return !v;
              });
            }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              liked
                ? "text-rose-500"
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
          >
            <motion.span
              key={liked ? "liked" : "unliked"}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex"
            >
              <Heart className={cn("h-4.5 w-4.5", liked && "fill-current")} />
            </motion.span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            aria-label="Open queue"
            onClick={() => onQueueOpen?.()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            <ListMusic className="h-4.5 w-4.5" />
          </motion.button>
        </div>
      </div>

      {/* Seek bar */}
      <div className="mt-4">
        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(position)}
          aria-valuetext={formatTime(position)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight")
              setPosition((p) => Math.min(duration, p + 5));
            if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
          }}
          onPointerMove={(e) => setHoverRatio(ratioFromEvent(e.clientX))}
          onPointerLeave={() => setHoverRatio(null)}
          onPointerDown={(e) => setPosition(ratioFromEvent(e.clientX) * duration)}
          className="group relative flex h-6 cursor-pointer items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 transition-[height] group-hover:h-2 dark:bg-zinc-800">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {/* Hover scrub preview */}
          <AnimatePresence>
            {hoverRatio !== null && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute -top-6 -translate-x-1/2 rounded-md bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
                style={{ left: `${hoverRatio * 100}%` }}
              >
                {formatTime(hoverRatio * duration)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
          <span>{formatTime(position)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Transport */}
      <div className="mt-2 flex items-center justify-center gap-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label="Previous track"
          onClick={() => setPosition(0)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <SkipBack className="h-5 w-5 fill-current" />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-violet-500 dark:text-white dark:hover:bg-violet-400 dark:focus-visible:ring-offset-zinc-950"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? "pause" : "play"}
              initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex"
            >
              {playing ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label="Next track"
          onClick={() => setPosition(duration)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <SkipForward className="h-5 w-5 fill-current" />
        </motion.button>
      </div>

      {/* Up next */}
      {upNext.length > 0 && (
        <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-900">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Up next
          </p>
          <div className="flex flex-col gap-1">
            {upNext.map((t) => (
              <div
                key={t.title}
                className="flex items-center gap-2.5 rounded-lg px-1 py-1"
              >
                <div
                  aria-hidden
                  className={cn(
                    "h-8 w-8 shrink-0 rounded-md bg-gradient-to-br",
                    t.art
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    {t.title}
                  </p>
                  <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
                    {t.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Media_01;
