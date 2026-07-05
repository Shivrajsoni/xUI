"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Media_02Props {
  title?: string;
  /** Video length in seconds. */
  duration?: number;
  /** Chapter start times in seconds. */
  chapters?: number[];
  onFullscreen?: () => void;
  onSettings?: () => void;
  className?: string;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const Media_02 = ({
  title = "Designing in the open — studio session 04",
  duration = 512,
  chapters = [0, 96, 210, 384],
  onFullscreen,
  onSettings,
  className,
}: Media_02Props) => {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(148);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const buffered = Math.min(1, position / duration + 0.18);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setPosition((p) => (p + 1 > duration ? duration : p + 1)),
      1000
    );
    return () => window.clearInterval(id);
  }, [playing, duration]);

  const togglePlay = useCallback(() => {
    setPlaying((v) => !v);
    setBurstKey((k) => k + 1);
  }, []);

  const seekTo = (clientX: number) => {
    const el = timelineRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - left) / width));
    setPosition(ratio * duration);
  };

  return (
    <div
      className={cn(
        "group relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-[0_20px_60px_-28px_rgba(24,24,27,0.5)] dark:border-zinc-800",
        className
      )}
    >
      {/* Scene */}
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={togglePlay}
        className="relative block aspect-video w-full cursor-pointer focus-visible:outline-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-cyan-900 to-slate-950" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(34,211,238,0.28),transparent_55%)]"
        />
        {/* gradient "sunset over water" scene */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
        />
        <div
          aria-hidden
          className="absolute left-[62%] top-[22%] h-16 w-16 rounded-full bg-cyan-300/70 blur-md sm:h-20 sm:w-20"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px bg-cyan-200/30"
        />

        {/* Center burst on play/pause */}
        <AnimatePresence>
          {burstKey > 0 && (
            <motion.div
              key={burstKey}
              initial={{ opacity: 0.9, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
            >
              {playing ? (
                <Play className="ml-1 h-7 w-7 fill-current" />
              ) : (
                <Pause className="h-7 w-7 fill-current" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Title (fades with the controls) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="truncate text-sm font-medium text-white">{title}</p>
      </div>

      {/* Control bar */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2.5 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {/* Timeline */}
        <div
          ref={timelineRef}
          role="slider"
          tabIndex={0}
          aria-label="Video timeline"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(position)}
          aria-valuetext={formatTime(position)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight")
              setPosition((p) => Math.min(duration, p + 5));
            if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
          }}
          onPointerDown={(e) => seekTo(e.clientX)}
          className="group/track relative flex h-4 cursor-pointer items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div className="relative h-1 w-full rounded-full bg-white/20 transition-[height] group-hover/track:h-1.5">
            {/* Buffered */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/30"
              style={{ width: `${buffered * 100}%` }}
            />
            {/* Played */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-cyan-400"
              style={{ width: `${(position / duration) * 100}%` }}
            />
            {/* Chapter ticks */}
            {chapters
              .filter((c) => c > 0 && c < duration)
              .map((c) => (
                <div
                  key={`${uid}-ch-${c}`}
                  aria-hidden
                  className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 rounded-full bg-white/60"
                  style={{ left: `${(c / duration) * 100}%` }}
                />
              ))}
            {/* Playhead */}
            <div
              aria-hidden
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 opacity-0 shadow transition-opacity group-hover/track:opacity-100"
              style={{ left: `${(position / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Buttons row */}
        <div className="mt-1 flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {playing ? (
              <Pause className="h-4.5 w-4.5 fill-current" />
            ) : (
              <Play className="ml-0.5 h-4.5 w-4.5 fill-current" />
            )}
          </motion.button>

          {/* Volume — slider expands on hover */}
          <div className="group/vol flex items-center">
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => setMuted((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4.5 w-4.5" />
              ) : (
                <Volume2 className="h-4.5 w-4.5" />
              )}
            </motion.button>
            <div className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/vol:w-20 group-hover/vol:opacity-100 group-focus-within/vol:w-20 group-focus-within/vol:opacity-100">
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : Math.round(volume * 100)}
                aria-label="Volume"
                onChange={(e) => {
                  setMuted(false);
                  setVolume(Number(e.target.value) / 100);
                }}
                className="mx-1.5 h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/25 accent-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
            </div>
          </div>

          <span className="ml-1 font-mono text-[11px] tabular-nums text-white/80">
            {formatTime(position)}{" "}
            <span className="text-white/40">/ {formatTime(duration)}</span>
          </span>

          <div className="ml-auto flex items-center gap-1">
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              aria-label="Settings"
              onClick={() => onSettings?.()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:rotate-45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Settings className="h-4.5 w-4.5" />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              aria-label="Fullscreen"
              onClick={() => onFullscreen?.()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Maximize className="h-4.5 w-4.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media_02;
