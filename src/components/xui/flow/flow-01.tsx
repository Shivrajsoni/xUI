"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

const BAR_COUNT = 48;

/** Deterministic bar profile — a blend of two sines, never Math.random. */
const barProfile = Array.from({ length: BAR_COUNT }, (_, i) => {
  const a = Math.sin(i * 0.45) * 0.5 + 0.5;
  const b = Math.sin(i * 0.18 + 1.7) * 0.5 + 0.5;
  return 0.3 + 0.7 * (0.6 * a + 0.4 * b);
});

export interface Flow_01Props {
  /** Line that types out beneath the waveform while listening. */
  transcript?: string;
  /** Start in the listening state. */
  defaultListening?: boolean;
  /** Called whenever the mic is toggled. */
  onToggle?: (listening: boolean) => void;
  className?: string;
}

const Flow_01 = ({
  transcript = "Meeting notes are ready — sending the summary over to Maya and the team now.",
  defaultListening = true,
  onToggle,
  className,
}: Flow_01Props) => {
  const [listening, setListening] = useState(defaultListening);
  const [typed, setTyped] = useState(0);
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!listening) return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n < transcript.length) return n + 1;
        // Finished — hold for a beat, then loop.
        if (!holdRef.current) {
          holdRef.current = setTimeout(() => {
            holdRef.current = null;
            setTyped(0);
          }, 2400);
        }
        return n;
      });
    }, 42);
    return () => {
      clearInterval(id);
      if (holdRef.current) {
        clearTimeout(holdRef.current);
        holdRef.current = null;
      }
    };
  }, [listening, transcript]);

  const toggle = () => {
    setListening((l) => {
      onToggle?.(!l);
      return !l;
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mic toggle */}
        <motion.button
          type="button"
          onClick={toggle}
          whileTap={{ scale: 0.92 }}
          aria-pressed={listening}
          aria-label={listening ? "Pause dictation" : "Resume dictation"}
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
            listening
              ? "bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-sky-950 dark:hover:bg-sky-400"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          )}
        >
          {listening && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-sky-500/40"
              animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {listening ? (
            <Mic aria-hidden className="relative h-[18px] w-[18px]" />
          ) : (
            <MicOff aria-hidden className="relative h-[18px] w-[18px]" />
          )}
        </motion.button>

        {/* Waveform */}
        <div className="relative h-12 min-w-0 flex-1 overflow-hidden" aria-hidden>
          <div className="flex h-full items-center gap-[3px]">
            {barProfile.map((v, i) => (
              <motion.span
                key={i}
                className="w-[2px] flex-1 rounded-full bg-zinc-300 dark:bg-zinc-700"
                style={{ height: `${v * 100}%`, originY: 0.5 }}
                animate={
                  listening
                    ? { scaleY: [0.25, 1, 0.25] }
                    : { scaleY: 0.25 }
                }
                transition={
                  listening
                    ? {
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (i % BAR_COUNT) * 0.055,
                      }
                    : { duration: 0.4, ease: "easeOut" }
                }
              />
            ))}
          </div>
          {/* Gradient tint sweeping through the bars */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-sky-500/25 to-transparent blur-sm dark:via-sky-400/30"
            animate={listening ? { left: ["-35%", "100%"] } : { left: "-35%" }}
            transition={
              listening
                ? { duration: 3.2, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
          />
        </div>
      </div>

      {/* Transcript */}
      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-900">
        <p
          aria-live="polite"
          className="min-h-10 font-mono text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {transcript.slice(0, typed)}
          <motion.span
            aria-hidden
            className="ml-px inline-block h-3 w-[6px] translate-y-0.5 rounded-[1px] bg-sky-500 dark:bg-sky-400"
            animate={{ opacity: listening ? [1, 0, 1] : 0.3 }}
            transition={
              listening
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : { duration: 0.2 }
            }
          />
        </p>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
          {listening ? "Listening" : "Paused"} · en-US
        </p>
      </div>
    </div>
  );
};

export default Flow_01;
