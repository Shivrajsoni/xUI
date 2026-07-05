"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type PomodoroMode = "focus" | "break";

export interface Widget_04Props {
  /** Focus duration in minutes */
  focusMinutes?: number;
  /** Break duration in minutes */
  breakMinutes?: number;
  onComplete?: (mode: PomodoroMode) => void;
  className?: string;
}

const RADIUS = 54;
const CIRC = 2 * Math.PI * RADIUS;

const modeStyles: Record<
  PomodoroMode,
  { ring: string; glow: string; text: string; button: string; label: string }
> = {
  focus: {
    ring: "stroke-rose-500",
    glow: "rgba(244,63,94,0.35)",
    text: "text-rose-500",
    button:
      "bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-400 dark:bg-rose-500 dark:hover:bg-rose-400 dark:text-rose-50",
    label: "Focus",
  },
  break: {
    ring: "stroke-teal-500",
    glow: "rgba(20,184,166,0.35)",
    text: "text-teal-500",
    button:
      "bg-teal-500 text-white hover:bg-teal-600 focus-visible:ring-teal-400 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-teal-50",
    label: "Break",
  },
};

const Widget_04 = ({
  focusMinutes = 25,
  breakMinutes = 5,
  onComplete,
  className,
}: Widget_04Props) => {
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [running, setRunning] = useState(false);
  const durations: Record<PomodoroMode, number> = {
    focus: focusMinutes * 60,
    break: breakMinutes * 60,
  };
  const [remaining, setRemaining] = useState(durations.focus);
  const endRef = useRef<number>(0);
  const thumbId = useId();

  useEffect(() => {
    if (!running) return;
    endRef.current = Date.now() + remaining * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, (endRef.current - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) {
        setRunning(false);
        onComplete?.(mode);
      }
    }, 200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode]);

  const total = durations[mode];
  const progress = remaining / total;
  const whole = Math.ceil(remaining);
  const mm = Math.floor(whole / 60);
  const ss = whole % 60;
  const s = modeStyles[mode];

  const switchMode = (m: PomodoroMode) => {
    if (m === mode) return;
    setMode(m);
    setRunning(false);
    setRemaining(m === "focus" ? focusMinutes * 60 : breakMinutes * 60);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(total);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-[280px] flex-col items-center rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Mode segmented control */}
      <div
        role="tablist"
        aria-label="Timer mode"
        className="flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-900"
      >
        {(["focus", "break"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => switchMode(m)}
            className={cn(
              "relative rounded-full px-4 py-1 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
              mode === m
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
          >
            {mode === m && (
              <motion.span
                layoutId={thumbId}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
              />
            )}
            <span className="relative">{modeStyles[m].label}</span>
          </button>
        ))}
      </div>

      {/* Ring */}
      <div className="relative mt-5">
        <motion.svg
          viewBox="0 0 128 128"
          className="h-44 w-44 -rotate-90"
          animate={
            running
              ? { scale: [1, 1.008, 1] }
              : { scale: 1 }
          }
          transition={
            running
              ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          role="img"
          aria-label={`${s.label} timer, ${mm} minutes ${ss} seconds remaining`}
        >
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="7"
            className="stroke-zinc-100 dark:stroke-zinc-800/80"
          />
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
            className={cn("transition-colors duration-500", s.ring)}
            style={{
              transition: "stroke-dashoffset 0.25s linear",
              filter: running ? `drop-shadow(0 0 6px ${s.glow})` : undefined,
            }}
          />
        </motion.svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
            {mm}:{String(ss).padStart(2, "0")}
          </p>
          <p
            className={cn(
              "mt-1 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500",
              running ? s.text : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            {running ? s.label : "Paused"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          onClick={reset}
          aria-label="Reset timer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <RotateCcw aria-hidden className="h-4 w-4" />
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          onClick={() => setRunning((r) => !r && remaining > 0)}
          aria-label={running ? "Pause timer" : "Start timer"}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
            s.button
          )}
        >
          {running ? (
            <Pause aria-hidden className="h-5 w-5" />
          ) : (
            <Play aria-hidden className="ml-0.5 h-5 w-5" />
          )}
        </motion.button>

        {/* Spacer to keep the play button centered */}
        <div aria-hidden className="h-10 w-10" />
      </div>
    </div>
  );
};

export default Widget_04;
