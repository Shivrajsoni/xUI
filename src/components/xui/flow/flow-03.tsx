"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Flow_03Props {
  /** Static lead-in before the rotating word. */
  prefix?: string;
  /** Capability words that rotate through the ribbon. */
  words?: string[];
  /** Mono microcopy line under the ribbon. */
  microcopy?: string;
  /** Milliseconds each word stays on screen. */
  interval?: number;
  className?: string;
}

const defaultWords = ["Dictate", "Compose", "Translate", "Summarize", "Rewrite"];

const Flow_03 = ({
  prefix = "Speak to",
  words = defaultWords,
  microcopy = "voice → text · 62 languages · 3× faster than typing",
  interval = 2200,
  className,
}: Flow_03Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  const word = words[index] ?? words[0]!;

  return (
    <div className={cn("w-full max-w-2xl px-2 py-6 text-center", className)}>
      <h2 className="flex min-h-14 flex-wrap items-baseline justify-center gap-x-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        <span>{prefix}</span>
        <span className="relative inline-flex flex-col items-center">
          {/* Rotating word — blur crossfade */}
          <span className="relative grid overflow-visible">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="whitespace-nowrap text-emerald-600 dark:text-emerald-400"
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </span>
          {/* Flowing gradient underline */}
          <span
            aria-hidden
            className="mt-1 block h-[3px] w-full overflow-hidden rounded-full"
          >
            <motion.span
              className="block h-full w-[200%] rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.9) 25%, rgba(45,212,191,0.9) 50%, rgba(16,185,129,0.9) 75%, rgba(16,185,129,0) 100%)",
              }}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </span>
        <span>anything.</span>
      </h2>

      <p className="mt-4 font-mono text-[11px] tracking-wide text-zinc-400 dark:text-zinc-500">
        {microcopy}
      </p>
    </div>
  );
};

export default Flow_03;
