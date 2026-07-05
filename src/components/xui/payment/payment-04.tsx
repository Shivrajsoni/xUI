"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Period = "monthly" | "yearly";

export type TierAccent = "zinc" | "emerald" | "sky" | "violet" | "amber";

export interface Tier {
  name: string;
  monthly: number;
  yearly: number; // per month, billed yearly
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
  /** Accent color for checks, CTA and focus ring. Defaults to emerald when popular, zinc otherwise. */
  accent?: TierAccent;
}

const accentStyles: Record<
  TierAccent,
  { check: string; solidCta: string; focusRing: string }
> = {
  zinc: {
    check: "text-zinc-400 dark:text-zinc-600",
    solidCta:
      "border border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    focusRing: "focus-visible:ring-zinc-400",
  },
  emerald: {
    check: "text-emerald-500",
    solidCta:
      "bg-emerald-600 text-white hover:bg-emerald-600/90 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400",
    focusRing: "focus-visible:ring-emerald-500",
  },
  sky: {
    check: "text-sky-500",
    solidCta:
      "bg-sky-600 text-white hover:bg-sky-600/90 dark:bg-sky-500 dark:text-sky-950 dark:hover:bg-sky-400",
    focusRing: "focus-visible:ring-sky-500",
  },
  violet: {
    check: "text-violet-500",
    solidCta:
      "bg-violet-600 text-white hover:bg-violet-600/90 dark:bg-violet-500 dark:text-violet-950 dark:hover:bg-violet-400",
    focusRing: "focus-visible:ring-violet-500",
  },
  amber: {
    check: "text-amber-500",
    solidCta:
      "bg-amber-500 text-amber-950 hover:bg-amber-400 dark:bg-amber-400 dark:text-amber-950 dark:hover:bg-amber-300",
    focusRing: "focus-visible:ring-amber-500",
  },
};

const defaultTiers: Tier[] = [
  {
    name: "Starter",
    monthly: 9,
    yearly: 7,
    blurb: "For side projects",
    features: ["3 projects", "1 team member", "Community support", "Basic analytics"],
    cta: "Get started",
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 24,
    blurb: "For growing products",
    features: [
      "Unlimited projects",
      "5 team members",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Team",
    monthly: 79,
    yearly: 66,
    blurb: "For whole orgs",
    features: ["Everything in Pro", "Unlimited members", "SSO / SAML", "Audit logs"],
    cta: "Contact sales",
  },
];

export interface Payment_04Props {
  tiers?: Tier[];
  onSelect?: (tier: string, period: Period) => void;
  className?: string;
}

const Payment_04 = ({ tiers = defaultTiers, onSelect, className }: Payment_04Props) => {
  const [period, setPeriod] = useState<Period>("monthly");
  const thumbId = useId();

  return (
    <div className={cn("w-full max-w-3xl", className)}>
      {/* Toggle */}
      <div className="flex flex-col items-center gap-2">
        <div
          role="tablist"
          aria-label="Billing period"
          className="relative flex rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {(["monthly", "yearly"] as const).map((p) => (
            <button
              key={p}
              role="tab"
              type="button"
              aria-selected={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "relative z-10 rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                period === p
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
            >
              {period === p && (
                <motion.span
                  layoutId={thumbId}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
                />
              )}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
        <div className="h-5">
          <AnimatePresence>
            {period === "yearly" && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              >
                <Sparkles aria-hidden className="h-3 w-3" />2 months free
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tiers */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiers.map((tier) => {
          const price = period === "monthly" ? tier.monthly : tier.yearly;
          const accent = accentStyles[tier.accent ?? (tier.popular ? "emerald" : "zinc")];
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-5 transition-shadow duration-300",
                "dark:bg-zinc-950",
                tier.popular
                  ? "border-emerald-500/40 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-500/30 hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.45)] sm:-translate-y-2 dark:border-emerald-500/30"
                  : "border-zinc-200 shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] hover:shadow-[0_16px_50px_-24px_rgba(24,24,27,0.35)] dark:border-zinc-800"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white shadow-sm dark:bg-emerald-500 dark:text-emerald-950">
                  Most popular
                </span>
              )}

              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {tier.name}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                {tier.blurb}
              </p>

              <div className="mt-4 flex h-10 items-baseline gap-1 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${tier.name}-${period}`}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="font-mono text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50"
                  >
                    ${price}
                  </motion.span>
                </AnimatePresence>
                <span className="min-w-0 text-xs text-zinc-400 dark:text-zinc-500">
                  /mo
                  <AnimatePresence mode="popLayout" initial={false}>
                    {period === "yearly" && (
                      <motion.span
                        key={`${tier.name}-billed`}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="inline-block"
                      >
                        , billed yearly
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    <Check
                      aria-hidden
                      className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", accent.check)}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                variant={tier.popular ? "default" : "outline"}
                onClick={() => onSelect?.(tier.name, period)}
                aria-label={`${tier.cta} — ${tier.name} plan`}
                className={cn(
                  "mt-5 h-9 w-full text-xs transition-transform duration-150 active:scale-[0.97]",
                  accent.focusRing,
                  tier.popular && accent.solidCta
                )}
              >
                {tier.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payment_04;
