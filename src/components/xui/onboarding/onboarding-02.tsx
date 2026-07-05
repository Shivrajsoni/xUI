"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export type WizardStep = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const fieldClasses = cn(
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] text-zinc-800 placeholder:text-zinc-400",
  "transition-colors duration-200 hover:border-zinc-300 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200",
  "dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:hover:border-zinc-700 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
);

const labelClasses =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500";

const StepPanel = ({ step }: { step: number }) => {
  if (step === 0) {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="ob2-name" className={labelClasses}>
            Full name
          </label>
          <input id="ob2-name" className={fieldClasses} placeholder="Alex Rivera" defaultValue="" />
        </div>
        <div>
          <label htmlFor="ob2-email" className={labelClasses}>
            Work email
          </label>
          <input
            id="ob2-email"
            type="email"
            className={fieldClasses}
            placeholder="alex@acme.com"
            defaultValue=""
          />
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="ob2-workspace" className={labelClasses}>
            Workspace name
          </label>
          <input id="ob2-workspace" className={fieldClasses} placeholder="Acme Inc" defaultValue="" />
        </div>
        <div>
          <label htmlFor="ob2-url" className={labelClasses}>
            Workspace URL
          </label>
          <div className="flex items-center overflow-hidden rounded-lg border border-zinc-200 transition-colors duration-200 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:focus-within:border-zinc-600 dark:focus-within:ring-zinc-800 dark:hover:border-zinc-700">
            <span className="border-r border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[12px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
              xui.app/
            </span>
            <input
              id="ob2-url"
              className="w-full bg-white px-3 py-2 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none dark:bg-zinc-900/60 dark:text-zinc-200 dark:placeholder:text-zinc-600"
              placeholder="acme"
              defaultValue=""
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ob2-invite" className={labelClasses}>
          Invite by email
        </label>
        <div className="relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
          />
          <input
            id="ob2-invite"
            type="email"
            className={cn(fieldClasses, "pl-9")}
            placeholder="teammate@acme.com"
            defaultValue=""
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["sam@acme.com", "maya@acme.com"].map((email) => (
          <span
            key={email}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
          >
            {email}
          </span>
        ))}
      </div>
    </div>
  );
};

const DEFAULT_STEPS: WizardStep[] = [
  { id: "account", label: "Account", content: <StepPanel step={0} /> },
  { id: "workspace", label: "Workspace", content: <StepPanel step={1} /> },
  { id: "invite", label: "Invite team", content: <StepPanel step={2} /> },
];

const Onboarding_02 = ({
  steps = DEFAULT_STEPS,
  onFinish,
  className,
}: {
  steps?: WizardStep[];
  /** Called when the final step's "Finish setup" button is pressed. */
  onFinish?: () => void;
  className?: string;
}) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
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
      {finished ? (
        <div className="flex flex-col items-center py-12 text-center">
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
              <motion.path
                d="M5 12.5 L10 17.5 L19 7"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Workspace ready
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-1 text-xs text-zinc-400 dark:text-zinc-500"
          >
            Invites sent. Your team is one click away.
          </motion.p>
          <button
            type="button"
            onClick={() => {
              setFinished(false);
              setDirection(-1);
              setStep(0);
            }}
            className="mt-6 rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            Run it again
          </button>
        </div>
      ) : (
        <>
          {/* Stepper */}
          <nav aria-label="Setup progress" className="flex items-center">
            {steps.map((s, i) => {
              const isDone = i < step;
              const isCurrent = i === step;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      {isCurrent && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-indigo-500/20"
                          animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span
                        className={cn(
                          "relative flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors duration-300",
                          isDone
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : isCurrent
                              ? "border-indigo-500 bg-white text-indigo-500 dark:bg-zinc-950 dark:text-indigo-400"
                              : "border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-600"
                        )}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 text-[10px] font-medium tracking-wide transition-colors duration-300",
                        isCurrent
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-zinc-400 dark:text-zinc-600"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="relative mx-2 mb-5 h-px flex-1 overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-indigo-500"
                        initial={false}
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Sliding content */}
          <div className="relative mt-6 min-h-[168px] overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ x: direction * 48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -48, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
              >
                {steps[step]?.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
            <button
              type="button"
              onClick={() => go(Math.max(0, step - 1))}
              disabled={step === 0}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
                step === 0
                  ? "cursor-not-allowed text-zinc-300 dark:text-zinc-700"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
              )}
            >
              Back
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (step === steps.length - 1) {
                  setFinished(true);
                  onFinish?.();
                } else {
                  go(step + 1);
                }
              }}
              className={cn(
                "rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm",
                "transition-colors duration-200 hover:bg-indigo-500",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                "dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400"
              )}
            >
              {step === steps.length - 1 ? "Finish setup" : "Continue"}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Onboarding_02;
