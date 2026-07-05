"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CircleDot,
  Clock3,
  ExternalLink,
  MapPin,
  Package,
  PackageCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrackingStep {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Shop_05Props {
  orderId?: string;
  carrier?: string;
  /** Index of the current step, 0-based. */
  step?: number;
  eta?: string;
  recipient?: string;
  address?: string;
  steps?: TrackingStep[];
  onTrack?: () => void;
  className?: string;
}

const defaultSteps: TrackingStep[] = [
  { label: "Ordered", icon: CircleDot },
  { label: "Packed", icon: Package },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];

const statusCopy = [
  "Order confirmed — we're on it",
  "Packed and ready for pickup",
  "On the way with the carrier",
  "Delivered — enjoy!",
];

const Shop_05 = ({
  orderId = "#84-3121",
  carrier = "FedEx Ground",
  step: initialStep = 2,
  eta = "Tue, Jul 8",
  recipient = "Alex Rivera",
  address = "2847 Willow Creek Ln, Portland, OR 97205",
  steps = defaultSteps,
  onTrack,
  className,
}: Shop_05Props) => {
  const [step, setStep] = useState(Math.min(initialStep, steps.length - 1));
  const progress = step / (steps.length - 1);
  const delivered = step === steps.length - 1;

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Order {orderId} · {carrier}
          </p>
          <h3 className="mt-0.5 h-5 overflow-hidden text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={step}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className="inline-block"
              >
                {statusCopy[step] ?? steps[step]?.label}
              </motion.span>
            </AnimatePresence>
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setStep((s) => (s + 1) % steps.length)}
          aria-label="Refresh tracking status"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
        >
          <RefreshCw aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Stepper */}
      <div className="mt-5 px-1">
        <div className="relative">
          {/* Track */}
          <div aria-hidden className="absolute left-3 right-3 top-3 h-0.5 -translate-y-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          {/* Fill */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{ width: `calc(${progress} * (100% - 1.5rem))` }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute left-3 top-3 h-0.5 -translate-y-1/2 rounded-full bg-sky-500"
          />
          {/* Traveling truck */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{ left: `calc(${progress} * (100% - 1.5rem))` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="absolute top-3 z-10 -translate-y-1/2"
          >
            <motion.div
              key={step}
              initial={{ rotate: -6 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="flex h-6 w-6 translate-x-0 items-center justify-center rounded-full bg-sky-500 shadow-[0_4px_12px_-2px_rgba(14,165,233,0.5)]"
            >
              <Truck className="h-3.5 w-3.5 text-white" />
            </motion.div>
          </motion.div>

          {/* Step nodes */}
          <ol className="relative flex justify-between">
            {steps.map((s, i) => {
              const done = i < step;
              const current = i === step;
              const Icon = s.icon;
              return (
                <li
                  key={s.label}
                  className="flex w-6 flex-col items-center"
                  aria-current={current ? "step" : undefined}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300",
                      done
                        ? "border-sky-500 bg-sky-500 text-white"
                        : current
                          ? "border-sky-500 bg-white text-transparent dark:bg-zinc-950"
                          : "border-zinc-200 bg-white text-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-700"
                    )}
                  >
                    {done ? (
                      <Check aria-hidden className="h-3 w-3" />
                    ) : (
                      <Icon aria-hidden className={cn("h-3 w-3", current && "opacity-0")} />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-1.5 text-[10px] font-medium transition-colors duration-300",
                      done || current
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-400 dark:text-zinc-600"
                    )}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ETA */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <Clock3 aria-hidden className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {delivered ? "Delivered" : "Estimated delivery"}
          </span>
        </div>
        <span className="font-mono text-xs font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
          {delivered ? "Today, 2:14 PM" : eta}
        </span>
      </div>

      {/* Address */}
      <div className="mt-2 flex items-start gap-2 rounded-lg border border-zinc-100 px-3 py-2 dark:border-zinc-900">
        <MapPin aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{recipient}</p>
          <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">{address}</p>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => onTrack?.()}
        className="group mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-white dark:ring-offset-zinc-950 dark:hover:bg-emerald-400"
      >
        Track package
        <ExternalLink
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </motion.button>
    </div>
  );
};

export default Shop_05;
