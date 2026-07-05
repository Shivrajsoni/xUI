"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, GitMerge, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Modal_04Props {
  title?: string;
  /** Monospace command shown inside the card. */
  command?: string;
  /** Seconds before the dialog auto-cancels. */
  countdown?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

type Phase = "armed" | "confirmed" | "cancelled";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

const RING_R = 8;
const RING_C = 2 * Math.PI * RING_R;

const Modal_04 = ({
  title = "Merge to production?",
  command = "git merge release/2.4 → main",
  countdown = 8,
  onConfirm,
  onCancel,
  className,
}: Modal_04Props) => {
  const [open, setOpen] = useState(true);
  const [phase, setPhase] = useState<Phase>("armed");
  const [remaining, setRemaining] = useState(countdown);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const settled = useRef(false);

  const settle = (next: Exclude<Phase, "armed">) => {
    if (settled.current) return;
    settled.current = true;
    setPhase(next);
    if (next === "confirmed") onConfirm?.();
    else onCancel?.();
    timers.current.push(setTimeout(() => setOpen(false), 1100));
  };

  const settleRef = useRef(settle);
  settleRef.current = settle;

  // Countdown → auto-cancel
  useEffect(() => {
    if (!open || phase !== "armed") return;
    const started = Date.now();
    const tick = setInterval(() => {
      const left = countdown - (Date.now() - started) / 1000;
      if (left <= 0) {
        setRemaining(0);
        settleRef.current("cancelled");
      } else {
        setRemaining(left);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [open, phase, countdown]);

  // Real keyboard handling
  useEffect(() => {
    if (!open || phase !== "armed") return;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "y") {
        e.preventDefault();
        settleRef.current("confirmed");
      } else if (key === "n" || key === "escape") {
        e.preventDefault();
        settleRef.current("cancelled");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, phase]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reopen = () => {
    settled.current = false;
    setPhase("armed");
    setRemaining(countdown);
    setOpen(true);
  };

  const progress = Math.max(0, Math.min(1, remaining / countdown));

  return (
    <div
      className={cn(
        "relative flex min-h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        onClick={reopen}
        className={cn(
          "gap-2 text-xs transition-transform duration-150 active:scale-[0.97]",
          open && "invisible"
        )}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <GitMerge aria-hidden className="h-3.5 w-3.5 text-emerald-500" />
        Merge release
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-[2px] dark:bg-zinc-950/60"
          >
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="modal-04-title"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={spring}
              className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-[0_24px_70px_-24px_rgba(24,24,27,0.5)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2
                id="modal-04-title"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {title}
              </h2>
              <p className="mx-auto mt-2 w-fit max-w-full truncate rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-[11px] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                {command}
              </p>

              {/* Big keycaps — clickable and keyboard-live */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9, y: 2 }}
                    onClick={() => settle("confirmed")}
                    disabled={phase !== "armed"}
                    aria-label="Confirm (press Y)"
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl border-b-4 font-mono text-xl font-semibold transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                      phase === "confirmed"
                        ? "border-emerald-700 bg-emerald-600 text-white"
                        : "border-zinc-300 bg-zinc-100 text-emerald-600 hover:bg-emerald-500/10 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                    )}
                  >
                    {phase === "confirmed" ? (
                      <motion.span
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={spring}
                      >
                        <Check aria-hidden className="h-6 w-6" />
                      </motion.span>
                    ) : (
                      "Y"
                    )}
                  </motion.button>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">confirm</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9, y: 2 }}
                    onClick={() => settle("cancelled")}
                    disabled={phase !== "armed"}
                    aria-label="Cancel (press N)"
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl border-b-4 font-mono text-xl font-semibold transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                      phase === "cancelled"
                        ? "border-zinc-400 bg-zinc-300 text-zinc-700 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
                        : "border-zinc-300 bg-zinc-100 text-zinc-500 hover:bg-zinc-200 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    )}
                  >
                    {phase === "cancelled" ? (
                      <motion.span
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={spring}
                      >
                        <X aria-hidden className="h-6 w-6" />
                      </motion.span>
                    ) : (
                      "N"
                    )}
                  </motion.button>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">cancel</span>
                </div>
              </div>

              {/* Status / countdown */}
              <div className="mt-5 flex h-5 items-center justify-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
                <AnimatePresence mode="popLayout" initial={false}>
                  {phase === "armed" && (
                    <motion.span
                      key="armed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={spring}
                      className="inline-flex items-center gap-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 -rotate-90"
                        role="timer"
                        aria-label={`Auto-cancels in ${Math.ceil(remaining)} seconds`}
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r={RING_R}
                          fill="none"
                          strokeWidth="2.5"
                          className="stroke-zinc-200 dark:stroke-zinc-800"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r={RING_R}
                          fill="none"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={RING_C}
                          strokeDashoffset={RING_C * (1 - progress)}
                          className={cn(
                            "transition-colors",
                            remaining <= 3 ? "stroke-rose-500" : "stroke-emerald-500"
                          )}
                        />
                      </svg>
                      Press{" "}
                      <kbd className="rounded border border-zinc-200 bg-zinc-50 px-1 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                        Y
                      </kbd>{" "}
                      or{" "}
                      <kbd className="rounded border border-zinc-200 bg-zinc-50 px-1 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                        N
                      </kbd>
                      <span className="tabular-nums">· {Math.ceil(remaining)}s</span>
                    </motion.span>
                  )}
                  {phase === "confirmed" && (
                    <motion.span
                      key="confirmed"
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={spring}
                      className="font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      Merging release/2.4 into main…
                    </motion.span>
                  )}
                  {phase === "cancelled" && (
                    <motion.span
                      key="cancelled"
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={spring}
                    >
                      Merge cancelled — nothing changed.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal_04;
