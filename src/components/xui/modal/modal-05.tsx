"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Plus, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface TourStep {
  title: string;
  body: string;
}

export interface Modal_05Props {
  steps?: TourStep[];
  onFinish?: () => void;
  className?: string;
}

const defaultSteps: TourStep[] = [
  {
    title: "Create your first task",
    body: "Everything in Lumina starts with a task. Capture work in seconds and organize it later.",
  },
  {
    title: "Stay in the loop",
    body: "Mentions, assignments and due-date nudges land here — never in your email inbox.",
  },
  {
    title: "Bring your team",
    body: "Alex, Sam and Maya are already here. Anyone you invite joins the board instantly.",
  },
];

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const Modal_05 = ({ steps = defaultSteps, onFinish, className }: Modal_05Props) => {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const [stageW, setStageW] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const targetRefs = useRef<(HTMLElement | null)[]>([]);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const el = targetRefs.current[step];
    if (!stage || !el) return;
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setStageW(s.width);
    setRect({ x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height });
  }, [step]);

  useLayoutEffect(() => {
    if (open && !finished) measure();
  }, [open, finished, measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const finish = () => {
    setFinished(true);
    onFinish?.();
  };

  const restart = () => {
    setStep(0);
    setFinished(false);
    setOpen(true);
  };

  // Arrow position, in tour-card coordinates (card is inset-x-3 → 12px offset)
  const arrowLeft = rect
    ? Math.min(Math.max(rect.x + rect.w / 2 - 12 - 6, 14), Math.max(stageW - 24 - 26, 14))
    : 0;

  const jumpTo = (index: number) => {
    if (!open || finished) return;
    setStep(index);
  };

  const targetProps = (index: number) => ({
    ref: (el: HTMLElement | null) => {
      targetRefs.current[index] = el;
    },
    onClick: () => jumpTo(index),
  });

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      {/* Demo app the tour points at */}
      <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Sprint board
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Search tasks"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-90 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            >
              <Search aria-hidden className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              {...targetProps(1)}
              className="relative flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-90 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            >
              <Bell aria-hidden className="h-3.5 w-3.5" />
              <span
                aria-hidden
                className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"
              />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            {...targetProps(0)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.96] dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            <Plus aria-hidden className="h-3 w-3" /> New task
          </button>
          <button
            type="button"
            aria-label="View team members"
            {...targetProps(2)}
            className="flex -space-x-1.5 rounded-full p-0.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95"
          >
            {["avatar-01", "avatar-02", "avatar-03"].map((a) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={a}
                src={`/avatars/${a}.svg`}
                alt=""
                className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-950"
              />
            ))}
          </button>
        </div>

        <div className="mt-3 space-y-1.5" aria-hidden>
          <div className="h-2 w-3/4 rounded-full bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-2 w-1/2 rounded-full bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-2 w-2/3 rounded-full bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </div>

      {/* Spotlight ring */}
      <AnimatePresence>
        {open && !finished && rect && (
          <motion.div
            key="ring"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              left: rect.x - 5,
              top: rect.y - 5,
              width: rect.w + 10,
              height: rect.h + 10,
            }}
            exit={{ opacity: 0 }}
            transition={spring}
            aria-hidden
            className="pointer-events-none absolute z-20 rounded-xl border-2 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
          >
            <motion.span
              animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl border-2 border-blue-400"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour card */}
      <div className="mt-3 flex min-h-[168px] items-end">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="tour"
              role="dialog"
              aria-modal="false"
              aria-labelledby="modal-05-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={spring}
              className="relative w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_18px_50px_-20px_rgba(24,24,27,0.4)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              {/* Arrow tracking the highlighted target */}
              {!finished && rect && (
                <motion.span
                  aria-hidden
                  animate={{ left: arrowLeft }}
                  transition={spring}
                  className="absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                />
              )}

              {finished ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                  className="flex flex-col items-center py-2 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10"
                  >
                    <Check aria-hidden className="h-5 w-5 text-blue-500" />
                  </motion.span>
                  <p className="mt-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    You&rsquo;re all set
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Ship something great with your team.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setOpen(false)}
                    className="mt-3 h-8 bg-blue-600 px-4 text-xs text-white hover:bg-blue-600/90 focus-visible:ring-blue-500 active:scale-[0.96] dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
                  >
                    Start working
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="min-h-[64px]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={spring}
                      >
                        <p className="text-[10px] font-medium uppercase tracking-wider text-blue-500">
                          Step {step + 1} of {steps.length}
                        </p>
                        <h2
                          id="modal-05-title"
                          className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                          {steps[step].title}
                        </h2>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {steps[step].body}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1.5" role="tablist" aria-label="Tour progress">
                      {steps.map((s, i) => (
                        <button
                          key={s.title}
                          type="button"
                          role="tab"
                          aria-selected={i === step}
                          aria-label={`Go to step ${i + 1}`}
                          onClick={() => setStep(i)}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-950",
                            i === step
                              ? "w-5 bg-blue-500"
                              : "w-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={step === 0}
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        className="h-8 px-3 text-xs active:scale-[0.96]"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          step === steps.length - 1
                            ? finish()
                            : setStep((s) => s + 1)
                        }
                        className="h-8 bg-blue-600 px-4 text-xs text-white hover:bg-blue-600/90 focus-visible:ring-blue-500 active:scale-[0.96] dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
                      >
                        {step === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="replay"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={spring}
              className="flex w-full justify-center pb-2"
            >
              <Button
                type="button"
                variant="outline"
                onClick={restart}
                className="gap-2 text-xs transition-transform duration-150 active:scale-[0.97]"
              >
                <Sparkles aria-hidden className="h-3.5 w-3.5 text-blue-500" />
                Replay tour
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal_05;
