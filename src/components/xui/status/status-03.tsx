"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, GitBranch, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type StageStatus = "pending" | "running" | "success" | "failed";

export interface PipelineStage {
  name: string;
  logs: string[];
  failLog?: string;
}

const defaultStages: PipelineStage[] = [
  {
    name: "Build",
    logs: ["Resolving 214 packages…", "Compiling next build…", "Bundle 1.2 MB gzipped"],
  },
  {
    name: "Test",
    logs: ["Running 86 unit tests…", "checkout.spec.ts ✓ 12 passed", "Coverage 94.2%"],
  },
  {
    name: "Deploy",
    logs: ["Pushing image to registry…", "Rolling out 3 replicas…"],
    failLog: "Error: replica 2/3 failed health check (exit 137)",
  },
  {
    name: "Verify",
    logs: ["Smoke tests against prod…", "p95 latency 182 ms ✓"],
  },
];

const STAGE_MS = 2300;
const TICK_MS = 850;

export interface Status_03Props {
  stages?: PipelineStage[];
  /** Stage index that fails on the first run (retry succeeds). Pass null to always succeed. */
  failStageOnFirstRun?: number | null;
  branch?: string;
  commit?: string;
  onComplete?: () => void;
  className?: string;
}

const Status_03 = ({
  stages = defaultStages,
  failStageOnFirstRun = 2,
  branch = "main",
  commit = "f3a9c21",
  onComplete,
  className,
}: Status_03Props) => {
  const [statuses, setStatuses] = useState<StageStatus[]>(() =>
    stages.map((_, i) => (i === 0 ? "running" : "pending"))
  );
  const [logIndex, setLogIndex] = useState(0);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runningIndex = statuses.indexOf("running");
  const failedIndex = statuses.indexOf("failed");
  const allDone = statuses.every((s) => s === "success");

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Advance the running stage.
  useEffect(() => {
    if (runningIndex === -1) return;
    const willFail = runningIndex === failStageOnFirstRun && !hasFailedOnce;
    const t = setTimeout(() => {
      setStatuses((prev) => {
        const next = [...prev];
        if (willFail) {
          next[runningIndex] = "failed";
        } else {
          next[runningIndex] = "success";
          if (runningIndex + 1 < next.length) next[runningIndex + 1] = "running";
        }
        return next;
      });
      if (willFail) setHasFailedOnce(true);
      setLogIndex(0);
    }, STAGE_MS);
    timers.current.push(t);
    return clearTimers;
  }, [runningIndex, failStageOnFirstRun, hasFailedOnce]);

  // Log line ticker for the running stage.
  useEffect(() => {
    if (runningIndex === -1) return;
    const t = setInterval(() => setLogIndex((i) => i + 1), TICK_MS);
    return () => clearInterval(t);
  }, [runningIndex]);

  useEffect(() => {
    if (allDone) onComplete?.();
  }, [allDone, onComplete]);

  const retry = () => {
    clearTimers();
    setLogIndex(0);
    setStatuses((prev) =>
      prev.map((s, i) => (i === failedIndex ? "running" : i > failedIndex ? "pending" : s))
    );
  };

  const currentLog = (() => {
    if (failedIndex !== -1)
      return stages[failedIndex].failLog ?? "Stage failed — see logs";
    if (allDone) return "Deploy verified · live on production";
    if (runningIndex === -1) return "";
    const logs = stages[runningIndex].logs;
    return logs[logIndex % logs.length];
  })();

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Deploy #4128
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
            <GitBranch aria-hidden className="h-3 w-3" />
            {branch}
            <span aria-hidden className="text-zinc-300 dark:text-zinc-700">·</span>
            {commit}
          </p>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {failedIndex !== -1 ? (
            <motion.div
              key="retry"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <button
                type="button"
                onClick={retry}
                className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-medium text-rose-600 transition-colors hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-[0.96] dark:text-rose-400"
              >
                <RotateCcw aria-hidden className="h-3 w-3" />
                Retry stage
              </button>
            </motion.div>
          ) : (
            <motion.span
              key="pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
                allDone
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
              )}
            >
              {allDone ? "Deployed" : "Running"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Stage nodes */}
      <div className="mt-6 flex items-start">
        {stages.map((stage, i) => {
          const status = statuses[i];
          return (
            <React.Fragment key={stage.name}>
              {i > 0 && (
                <div
                  aria-hidden
                  className="relative mt-[15px] h-0.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
                >
                  <motion.div
                    initial={false}
                    animate={{ scaleX: statuses[i - 1] === "success" ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full w-full origin-left bg-emerald-500"
                  />
                </div>
              )}
              <div className="flex w-14 shrink-0 flex-col items-center gap-1.5">
                <div className="relative flex h-8 w-8 items-center justify-center">
                  {/* Spinner ring */}
                  {status === "running" && (
                    <motion.span
                      aria-hidden
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-sky-500/25 border-t-sky-500"
                    />
                  )}
                  <motion.div
                    animate={
                      status === "failed"
                        ? { x: [0, -3, 3, -2, 2, 0], scale: 1 }
                        : { scale: status === "running" ? 0.78 : 1, x: 0 }
                    }
                    transition={
                      status === "failed"
                        ? { duration: 0.4 }
                        : { type: "spring", stiffness: 400, damping: 28 }
                    }
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                      status === "pending" &&
                        "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900",
                      status === "running" &&
                        "border-transparent bg-sky-500/10 dark:bg-sky-500/15",
                      status === "success" &&
                        "border-transparent bg-emerald-500 dark:bg-emerald-500",
                      status === "failed" && "border-transparent bg-rose-500"
                    )}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {status === "success" && (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        >
                          <Check aria-hidden className="h-4 w-4 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                      {status === "failed" && (
                        <motion.span
                          key="x"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        >
                          <X aria-hidden className="h-4 w-4 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                      {status === "running" && (
                        <motion.span
                          key="dot"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-sky-500"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <p
                  className={cn(
                    "text-[10px] font-medium",
                    status === "pending" && "text-zinc-400 dark:text-zinc-600",
                    status === "running" && "text-sky-600 dark:text-sky-400",
                    status === "success" && "text-zinc-700 dark:text-zinc-300",
                    status === "failed" && "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {stage.name}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Log ticker */}
      <div
        role="log"
        aria-live="polite"
        className="mt-5 h-9 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 px-3 dark:border-zinc-900 dark:bg-zinc-900/60"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={currentLog}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "flex h-9 items-center truncate font-mono text-[11px]",
              failedIndex !== -1
                ? "text-rose-600 dark:text-rose-400"
                : allDone
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            {currentLog}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Status_03;
