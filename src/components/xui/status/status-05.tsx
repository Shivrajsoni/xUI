"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CreditCard,
  Pause,
  Rocket,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ActivityType = "signup" | "payment" | "deploy" | "error";

export interface ActivityEvent {
  type: ActivityType;
  text: string;
  meta: string;
}

interface FeedEvent extends ActivityEvent {
  id: number;
  bornTick: number;
}

const typeStyle: Record<
  ActivityType,
  { icon: LucideIcon; ring: string; iconColor: string; label: string }
> = {
  signup: {
    icon: UserPlus,
    ring: "bg-emerald-500/10 ring-1 ring-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    label: "Sign-ups",
  },
  payment: {
    icon: CreditCard,
    ring: "bg-sky-500/10 ring-1 ring-sky-500/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    label: "Payments",
  },
  deploy: {
    icon: Rocket,
    ring: "bg-violet-500/10 ring-1 ring-violet-500/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    label: "Deploys",
  },
  error: {
    icon: AlertTriangle,
    ring: "bg-rose-500/10 ring-1 ring-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    label: "Errors",
  },
};

const defaultPool: ActivityEvent[] = [
  { type: "signup", text: "Maya Patel signed up", meta: "Pro trial" },
  { type: "payment", text: "Payment received", meta: "$249.00 · Acme Corp" },
  { type: "deploy", text: "Deploy succeeded", meta: "web · v2.1.4" },
  { type: "error", text: "5xx spike on /api/checkout", meta: "eu-west-1" },
  { type: "signup", text: "Alex Rivera signed up", meta: "Starter" },
  { type: "payment", text: "Invoice paid", meta: "$1,180.00 · Northwind" },
  { type: "deploy", text: "Preview deployed", meta: "docs · pr-312" },
  { type: "signup", text: "Sam Chen signed up", meta: "Team plan" },
];

const INTERVAL_S = 4;
const MAX_EVENTS = 5;

export interface Status_05Props {
  /** Events cycle through this pool. */
  pool?: ActivityEvent[];
  /** Seconds between new events. */
  intervalSeconds?: number;
  className?: string;
}

const Status_05 = ({
  pool = defaultPool,
  intervalSeconds = INTERVAL_S,
  className,
}: Status_05Props) => {
  const [events, setEvents] = useState<FeedEvent[]>(() =>
    pool.slice(0, 4).map((e, i) => ({ ...e, id: i, bornTick: i - 3 })).reverse()
  );
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const nextRef = useRef(4);
  const chipId = useId();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setTick((k) => {
        const nextTick = k + 1;
        setEvents((prev) => {
          const idx = nextRef.current;
          nextRef.current = idx + 1;
          const src = pool[idx % pool.length];
          return [{ ...src, id: idx, bornTick: nextTick }, ...prev].slice(0, MAX_EVENTS + 3);
        });
        return nextTick;
      });
    }, intervalSeconds * 1000);
    return () => clearInterval(t);
  }, [paused, pool, intervalSeconds]);

  const visible = events
    .filter((e) => filter === "all" || e.type === filter)
    .slice(0, MAX_EVENTS);

  const ago = (e: FeedEvent) => {
    const s = (tick - e.bornTick) * intervalSeconds;
    return s <= 0 ? "now" : s < 60 ? `${s}s` : `${Math.floor(s / 60)}m`;
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Live activity
        </p>
        <AnimatePresence mode="popLayout" initial={false}>
          {paused ? (
            <motion.span
              key="paused"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="ml-auto flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
            >
              <Pause aria-hidden className="h-2.5 w-2.5" />
              Paused
            </motion.span>
          ) : (
            <motion.span
              key="live"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Filter chips */}
      <div
        role="radiogroup"
        aria-label="Filter events by type"
        className="flex gap-1 overflow-x-auto px-4 py-2.5"
      >
        {(["all", "signup", "payment", "deploy", "error"] as const).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.96]",
                active
                  ? "text-zinc-900 dark:text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
              )}
            >
              {active && (
                <motion.span
                  layoutId={chipId}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-zinc-100 ring-1 ring-inset ring-zinc-300 dark:bg-zinc-100 dark:ring-0"
                />
              )}
              <span className="relative">
                {f === "all" ? "All" : typeStyle[f].label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feed */}
      <ul
        aria-live="polite"
        className="relative min-h-[15rem] px-2 pb-3 [mask-image:linear-gradient(to_bottom,white_78%,transparent)]"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((event, i) => {
            const style = typeStyle[event.type];
            const Icon = style.icon;
            return (
              <motion.li
                key={event.id}
                layout
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{
                  opacity: 1 - i * 0.16,
                  y: 0,
                  scale: 1 - i * 0.015,
                }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="flex items-center gap-2.5 rounded-xl px-2 py-2"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    style.ring
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", style.iconColor)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                    {event.text}
                  </p>
                  <p className="truncate font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                    {event.meta}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] tabular-nums text-zinc-300 dark:text-zinc-600">
                  {ago(event)}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 && (
          <li className="flex h-24 items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">
            No {filter === "all" ? "" : `${typeStyle[filter as ActivityType].label.toLowerCase()} `}events yet
          </li>
        )}
      </ul>
    </div>
  );
};

export default Status_05;
