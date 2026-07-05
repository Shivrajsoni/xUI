"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type BillingPeriod = "monthly" | "yearly";

export interface Modal_03Props {
  planName?: string;
  monthlyPrice?: number;
  /** Per-month price when billed yearly. */
  yearlyPrice?: number;
  benefits?: string[];
  onUpgrade?: (period: BillingPeriod) => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultBenefits = [
  "Unlimited projects & collaborators",
  "AI-assisted writing and summaries",
  "Version history back to day one",
  "Priority support within 4 hours",
];

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

const Modal_03 = ({
  planName = "Pro",
  monthlyPrice = 16,
  yearlyPrice = 12,
  benefits = defaultBenefits,
  onUpgrade,
  onDismiss,
  className,
}: Modal_03Props) => {
  const [open, setOpen] = useState(true);
  const [period, setPeriod] = useState<BillingPeriod>("yearly");
  const thumbId = useId();
  const price = period === "monthly" ? monthlyPrice : yearlyPrice;

  const close = (dismissed: boolean) => {
    if (dismissed) onDismiss?.();
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[520px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "gap-2 text-xs transition-transform duration-150 active:scale-[0.97]",
          open && "invisible"
        )}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <Sparkles aria-hidden className="h-3.5 w-3.5 text-amber-500" />
        Upgrade to {planName}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-03-title"
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={spring}
              className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-[0_24px_70px_-24px_rgba(24,24,27,0.5)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              {/* Gradient-ring feature icon */}
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-[2px] shadow-[0_8px_30px_-8px_rgba(249,115,22,0.5)]">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-zinc-950">
                  <Zap aria-hidden className="h-6 w-6 text-amber-500" />
                </div>
              </div>

              <h2
                id="modal-03-title"
                className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Unlock {planName}
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                You&rsquo;ve hit the free plan limit. Keep the momentum going.
              </p>

              {/* Benefits, staggered in */}
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                }}
                className="mt-5 space-y-2 text-left"
              >
                {benefits.map((benefit) => (
                  <motion.li
                    key={benefit}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0, transition: spring },
                    }}
                    className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                      <Check aria-hidden className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
                    </span>
                    {benefit}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Period toggle + springing price */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-2 pl-3 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-9 items-baseline gap-1 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={period}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={spring}
                      className="font-mono text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50"
                    >
                      ${price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    /mo{period === "yearly" && ", billed yearly"}
                  </span>
                </div>
                <div
                  role="tablist"
                  aria-label="Billing period"
                  className="relative flex rounded-lg bg-zinc-200/60 p-0.5 dark:bg-zinc-800"
                >
                  {(["monthly", "yearly"] as const).map((p) => (
                    <button
                      key={p}
                      role="tab"
                      type="button"
                      aria-selected={period === p}
                      onClick={() => setPeriod(p)}
                      className={cn(
                        "relative z-10 rounded-md px-2.5 py-1 text-[10px] font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                        period === p
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      )}
                    >
                      {period === p && (
                        <motion.span
                          layoutId={thumbId}
                          transition={spring}
                          className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-700 dark:ring-zinc-600"
                        />
                      )}
                      <span className="relative">
                        {p}
                        {p === "yearly" && (
                          <span className="ml-1 text-[9px] text-amber-600 dark:text-amber-400">
                            −25%
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA with sheen sweep */}
              <Button
                type="button"
                onClick={() => {
                  onUpgrade?.(period);
                  close(false);
                }}
                className={cn(
                  "group relative mt-4 h-10 w-full overflow-hidden text-xs font-semibold transition-transform duration-150 active:scale-[0.98]",
                  "bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500",
                  "dark:bg-amber-500 dark:text-white dark:hover:bg-amber-400"
                )}
              >
                <motion.span
                  aria-hidden
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2.4,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-zinc-900/20"
                />
                <span className="relative inline-flex items-center gap-1.5">
                  <Zap aria-hidden className="h-3.5 w-3.5" />
                  Upgrade to {planName}
                </span>
              </Button>

              <button
                type="button"
                onClick={() => close(true)}
                className="mt-2 w-full rounded-md py-2 text-[11px] font-medium text-zinc-400 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal_03;
