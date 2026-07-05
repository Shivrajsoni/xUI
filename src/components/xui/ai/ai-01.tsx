"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Check,
  ChevronDown,
  FileCode2,
  FileSearch,
  Loader2,
  RotateCcw,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TraceStep {
  id: string;
  label: string;
  icon: "thinking" | "search" | "read" | "write";
  /** Mono-rendered arguments preview */
  args: string;
  /** Duration in seconds */
  duration: number;
  /** Collapsible output shown when the step is expanded */
  output: string;
}

const stepIcons = {
  thinking: BrainCircuit,
  search: Search,
  read: FileSearch,
  write: FileCode2,
} as const;

const defaultSteps: TraceStep[] = [
  {
    id: "think",
    label: "Thinking",
    icon: "thinking",
    args: "plan: locate rate-limit bug",
    duration: 2.1,
    output:
      "The 429s spike on /api/sync. Likely the token bucket resets on every deploy. Check middleware first.",
  },
  {
    id: "search",
    label: "Search tool",
    icon: "search",
    args: 'grep("rateLimit", "src/**")',
    duration: 1.4,
    output: "3 matches — src/middleware/rate-limit.ts, src/lib/redis.ts, src/api/sync/route.ts",
  },
  {
    id: "read",
    label: "Read file",
    icon: "read",
    args: "src/middleware/rate-limit.ts",
    duration: 3.2,
    output:
      "Line 41: bucket key uses `deployId` — resets limits on every deploy. Should key on `userId` only.",
  },
  {
    id: "write",
    label: "Write code",
    icon: "write",
    args: "edit rate-limit.ts:41",
    duration: 5.6,
    output: '- const key = `${deployId}:${userId}`\n+ const key = `rl:${userId}`',
  },
];

export interface Ai_01Props {
  steps?: TraceStep[];
  title?: string;
  /** ms between step reveals */
  stepDelay?: number;
  className?: string;
}

const Ai_01 = ({
  steps = defaultSteps,
  title = "Fix rate-limit resets",
  stepDelay = 900,
  className,
}: Ai_01Props) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [runKey, setRunKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const done = visibleCount >= steps.length;
  const totalSeconds = steps.reduce((acc, s) => acc + s.duration, 0);

  useEffect(() => {
    setVisibleCount(0);
    setExpanded(null);
    timerRef.current = setInterval(() => {
      setVisibleCount((c) => {
        if (c + 1 >= steps.length && timerRef.current) {
          clearInterval(timerRef.current);
        }
        return Math.min(c + 1, steps.length);
      });
    }, stepDelay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [runKey, steps.length, stepDelay]);

  const replay = useCallback(() => setRunKey((k) => k + 1), []);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              done ? "bg-emerald-500" : "animate-pulse bg-sky-500"
            )}
          />
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
        </div>
        <motion.button
          type="button"
          onClick={replay}
          whileTap={{ scale: 0.92 }}
          aria-label="Replay agent run"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
        </motion.button>
      </div>

      {/* Timeline */}
      <div className="min-h-[280px] px-4 py-3" aria-live="polite">
        <ol className="relative space-y-1">
          <span
            aria-hidden
            className="absolute bottom-3 left-[13px] top-3 w-px bg-zinc-100 dark:bg-zinc-900"
          />
          <AnimatePresence initial={false}>
            {steps.slice(0, visibleCount).map((step, i) => {
              const Icon = stepIcons[step.icon];
              const isOpen = expanded === step.id;
              const running = i === visibleCount - 1 && !done;
              return (
                <motion.li
                  key={`${runKey}-${step.id}`}
                  initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : step.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.99] dark:hover:bg-zinc-900/60"
                  >
                    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                      {running ? (
                        <Loader2
                          aria-hidden
                          className="h-3 w-3 animate-spin text-sky-500"
                        />
                      ) : (
                        <Icon
                          aria-hidden
                          className="h-3 w-3 text-zinc-500 dark:text-zinc-400"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {step.label}
                        </span>
                        {!running && (
                          <span className="rounded-full bg-zinc-100 px-1.5 py-px font-mono text-[9px] tabular-nums text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500">
                            {step.duration.toFixed(1)}s
                          </span>
                        )}
                      </span>
                      <span className="block truncate font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                        {step.args}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 text-zinc-300 transition-transform duration-200 dark:text-zinc-700",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="overflow-hidden"
                      >
                        <pre className="ml-9 mr-1 mb-1.5 whitespace-pre-wrap rounded-lg border border-zinc-100 bg-zinc-50 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-zinc-600 dark:border-zinc-900 dark:bg-zinc-900/60 dark:text-zinc-400">
                          {step.output}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>

      {/* Footer */}
      <div className="flex h-10 items-center border-t border-zinc-100 px-4 dark:border-zinc-900">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <Check aria-hidden className="h-3.5 w-3.5 text-emerald-500" />
              Run complete · {steps.length} steps ·{" "}
              <span className="font-mono tabular-nums">{totalSeconds.toFixed(1)}s</span>
            </motion.p>
          ) : (
            <motion.p
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-zinc-400 dark:text-zinc-600"
            >
              Running step {Math.min(visibleCount + 1, steps.length)} of {steps.length}…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ai_01;
