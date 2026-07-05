"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

// Deterministic pseudo-random bar rhythm so SSR and client agree.
const bars = [0.45, 0.9, 0.6, 1, 0.7, 0.85, 0.5];

export type Chat04Props = {
  /** Status label shown when idle. */
  idleLabel?: string;
  /** Status label shown while listening. */
  listeningLabel?: string;
  /** Called whenever the listening state toggles. */
  onListeningChange?: (listening: boolean) => void;
  className?: string;
};

const Chat_04 = ({
  idleLabel = "tap to speak",
  listeningLabel = "listening…",
  onListeningChange,
  className,
}: Chat04Props) => {
  const [listening, setListening] = useState(false);

  function toggle() {
    const next = !listening;
    setListening(next);
    onListeningChange?.(next);
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-xs flex-col items-center justify-center gap-6 rounded-2xl py-12",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="relative flex h-36 w-36 items-center justify-center">
        {/* Expanding pulse rings while listening */}
        <AnimatePresence>
          {listening &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={`ring-${i}`}
                aria-hidden
                className="absolute inset-0 rounded-full border border-sky-400/40 dark:border-sky-500/30"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.35], opacity: [0.7, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
              />
            ))}
        </AnimatePresence>

        {/* The orb */}
        <motion.button
          type="button"
          aria-label={listening ? "Stop listening" : "Tap to speak"}
          aria-pressed={listening}
          onClick={toggle}
          whileTap={{ scale: 0.92 }}
          animate={
            listening
              ? { scale: 1.06 }
              : { scale: [1, 1.035, 1] }
          }
          transition={
            listening
              ? { type: "spring", stiffness: 300, damping: 25 }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
          className={cn(
            "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full",
            "bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-600",
            "shadow-[0_12px_40px_-8px_rgba(56,189,248,0.55)] transition-shadow duration-300",
            listening && "shadow-[0_16px_56px_-8px_rgba(56,189,248,0.8)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          )}
        >
          {/* Breathing inner sheen */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <AnimatePresence mode="wait" initial={false}>
            {listening ? (
              <motion.span
                key="eq"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative flex items-center gap-[3px]"
                aria-hidden
              >
                {bars.map((peak, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-white/90"
                    animate={{ height: [6, peak * 30, 6] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.09,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.span>
            ) : (
              <motion.span
                key="mic"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative"
                aria-hidden
              >
                <Mic className="h-8 w-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Status label */}
      <div className="h-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={listening ? "listening" : "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.25em]",
              listening
                ? "text-sky-600 dark:text-sky-400"
                : "text-zinc-400 dark:text-zinc-600"
            )}
            aria-live="polite"
          >
            {listening ? listeningLabel : idleLabel}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat_04;
