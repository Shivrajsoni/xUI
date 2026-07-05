"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type DayHealth = "up" | "degraded" | "down";

export interface UptimeIncident {
  /** Index into the 30-day strip (0 = oldest). */
  day: number;
  severity: Exclude<DayHealth, "up">;
  note: string;
}

export interface MonitoredService {
  name: string;
  region: string;
  uptime: string;
  incidents: UptimeIncident[];
}

const defaultServices: MonitoredService[] = [
  {
    name: "API",
    region: "us-east-1",
    uptime: "99.98%",
    incidents: [{ day: 21, severity: "degraded", note: "Elevated latency · Jun 26" }],
  },
  {
    name: "Dashboard",
    region: "eu-west-2",
    uptime: "100%",
    incidents: [],
  },
  {
    name: "Webhooks",
    region: "ap-south-1",
    uptime: "99.91%",
    incidents: [
      { day: 8, severity: "down", note: "Partial outage · Jun 13" },
      { day: 24, severity: "degraded", note: "Delayed delivery · Jun 29" },
    ],
  },
];

const DAYS = 30;

export interface Status_02Props {
  services?: MonitoredService[];
  onToggleService?: (name: string, down: boolean) => void;
  className?: string;
}

const Status_02 = ({ services = defaultServices, onToggleService, className }: Status_02Props) => {
  const [downed, setDowned] = useState<Record<string, boolean>>({});
  const anyDown = services.some((s) => downed[s.name]);

  const toggle = (name: string) => {
    const next = !downed[name];
    setDowned((d) => ({ ...d, [name]: next }));
    onToggleService?.(name, next);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Overall header */}
      <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-900">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {anyDown ? (
              <motion.span
                key="warn"
                initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10"
              >
                <AlertTriangle aria-hidden className="h-4 w-4 text-rose-500" />
              </motion.span>
            ) : (
              <motion.span
                key="ok"
                initial={{ scale: 0.5, opacity: 0, rotate: 12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <CheckCircle2 aria-hidden className="h-4 w-4 text-emerald-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="min-w-0 flex-1">
          <p
            role="status"
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {anyDown ? "Service disruption" : "All systems operational"}
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Last checked 24 seconds ago
          </p>
        </div>
      </div>

      {/* Service rows */}
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {services.map((service) => (
          <ServiceRow
            key={service.name}
            service={service}
            down={!!downed[service.name]}
            onToggle={() => toggle(service.name)}
          />
        ))}
      </ul>
    </div>
  );
};

const ServiceRow = ({
  service,
  down,
  onToggle,
}: {
  service: MonitoredService;
  down: boolean;
  onToggle: () => void;
}) => {
  const days = useMemo(() => {
    const map = new Map(service.incidents.map((i) => [i.day, i]));
    return Array.from({ length: DAYS }, (_, i) => map.get(i) ?? null);
  }, [service.incidents]);

  return (
    <li className="px-5 py-3.5">
      <div className="flex items-center gap-2">
        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
          {service.name}
        </p>
        <span className="rounded-full border border-zinc-200 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          {service.region}
        </span>
        <span className="ml-auto font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-500">
          {down ? "—" : service.uptime}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={down}
          aria-label={`${service.name}: ${down ? "down — click to restore" : "operational — click to mark down"}`}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white active:scale-[0.96] dark:focus-visible:ring-offset-zinc-950",
            down
              ? "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 focus-visible:ring-rose-400 dark:text-rose-400"
              : "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 focus-visible:ring-emerald-400 dark:text-emerald-400"
          )}
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            {down && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
            )}
            <span
              className={cn(
                "relative inline-flex h-1.5 w-1.5 rounded-full",
                down ? "bg-rose-500" : "bg-emerald-500"
              )}
            />
          </span>
          {down ? "Down" : "Operational"}
        </button>
      </div>

      {/* 30-day strip */}
      <div className="mt-2.5 flex gap-px" role="img" aria-label={`${service.name} — 30-day uptime history`}>
        {days.map((incident, i) => {
          const isToday = i === DAYS - 1;
          const state: DayHealth = isToday && down ? "down" : incident?.severity ?? "up";
          return (
            <div key={i} className="group relative flex-1">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: i * 0.012,
                }}
                className={cn(
                  "h-6 origin-bottom rounded-[2px] transition-colors",
                  state === "up" &&
                    "bg-emerald-500/70 group-hover:bg-emerald-500 dark:bg-emerald-500/50 dark:group-hover:bg-emerald-400",
                  state === "degraded" && "bg-amber-400 group-hover:bg-amber-500",
                  state === "down" && "bg-rose-500 group-hover:bg-rose-400"
                )}
              />
              {(incident || (isToday && down)) && (
                <span
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute bottom-full z-10 mb-1.5 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900",
                    i > DAYS / 2 ? "right-0" : "left-0"
                  )}
                >
                  {isToday && down ? "Ongoing outage · now" : incident?.note}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-300 dark:text-zinc-600">
        <span>30d ago</span>
        <span>Today</span>
      </div>
    </li>
  );
};

export default Status_02;
