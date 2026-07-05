"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  KeyRound,
  Palette,
  Rocket,
  UserPlus,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type OnboardingStep = {
  id: string;
  title: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
};

const DEFAULT_STEPS: OnboardingStep[] = [
  { id: "profile", title: "Create your profile", sub: "Name, avatar and role", icon: UserPlus },
  { id: "api", title: "Generate an API key", sub: "Authenticate your first request", icon: KeyRound },
  { id: "theme", title: "Pick a theme", sub: "Light, dark or system", icon: Palette },
  { id: "webhook", title: "Connect a webhook", sub: "Get events in real time", icon: Webhook },
  { id: "deploy", title: "Ship to production", sub: "Deploy your first project", icon: Rocket },
];

const BURST_DOTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return {
    x: Math.cos(angle) * (34 + (i % 3) * 12),
    y: Math.sin(angle) * (30 + ((i + 1) % 3) * 12),
    color: ["#10b981", "#f59e0b", "#38bdf8", "#f43f5e"][i % 4]!,
  };
});

const CheckIcon = ({ done }: { done: boolean }) => (
  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
    <motion.path
      d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{ pathLength: done ? 1 : 0, opacity: done ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  </svg>
);

const Onboarding_01 = ({
  steps = DEFAULT_STEPS,
  initialDone = ["profile", "api"],
  onToggle,
  onComplete,
  className,
}: {
  steps?: OnboardingStep[];
  initialDone?: string[];
  /** Called when a step is toggled, with its id and new done state. */
  onToggle?: (id: string, done: boolean) => void;
  /** Called once when the last remaining step is completed. */
  onComplete?: () => void;
  className?: string;
}) => {
  const [done, setDone] = useState<Set<string>>(() => new Set(initialDone));
  const [burstKey, setBurstKey] = useState(0);

  const count = useMemo(
    () => steps.filter((s) => done.has(s.id)).length,
    [steps, done]
  );
  const allDone = count === steps.length;
  const progress = (count / steps.length) * 100;

  const toggle = (id: string) => {
    const nowDone = !done.has(id);
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (next.size === steps.length) setBurstKey((k) => k + 1);
      }
      return next;
    });
    onToggle?.(id, nowDone);
    if (nowDone && done.size + 1 === steps.length) onComplete?.();
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-2xl p-6",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Get started
        </h3>
        <span className="font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
          {count} of {steps.length} complete
        </span>
      </div>

      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-label="Setup progress"
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
      >
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {allDone ? (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative mt-6 flex flex-col items-center py-8 text-center"
          >
            {/* Confetti-like micro burst */}
            <span key={burstKey} aria-hidden className="pointer-events-none absolute top-10">
              {BURST_DOTS.map((d, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: d.x, y: d.y, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              ))}
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
            >
              <CheckIcon done />
            </motion.span>
            <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              You&rsquo;re all set 🎉
            </p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
              Setup complete — happy shipping.
            </p>
            <button
              type="button"
              onClick={() => setDone(new Set())}
              className="mt-5 rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              Start over
            </button>
          </motion.div>
        ) : (
          <motion.ul
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 space-y-1"
          >
            {steps.map((step) => {
              const isDone = done.has(step.id);
              const Icon = step.icon;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => toggle(step.id)}
                    aria-pressed={isDone}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                      "transition-colors duration-200 hover:bg-zinc-50 active:bg-zinc-100 dark:hover:bg-zinc-900/60 dark:active:bg-zinc-900",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300",
                        isDone
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                          : "border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500"
                      )}
                    >
                      {isDone ? <CheckIcon done /> : <Icon className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[13px] font-medium transition-colors duration-300",
                          isDone
                            ? "text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-600 dark:decoration-zinc-700"
                            : "text-zinc-800 dark:text-zinc-200"
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "block truncate text-[11px] transition-colors duration-300",
                          isDone
                            ? "text-zinc-300 dark:text-zinc-700"
                            : "text-zinc-400 dark:text-zinc-500"
                        )}
                      >
                        {step.sub}
                      </span>
                    </span>
                    <ChevronRight
                      aria-hidden
                      className={cn(
                        "h-4 w-4 shrink-0 text-zinc-300 transition-all duration-200 dark:text-zinc-700",
                        !isDone &&
                          "group-hover:translate-x-0.5 group-hover:text-zinc-400 dark:group-hover:text-zinc-500"
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding_01;
