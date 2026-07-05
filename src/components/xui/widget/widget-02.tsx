"use client";

import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorldCity {
  city: string;
  /** IANA time zone, e.g. "Asia/Tokyo" */
  timeZone: string;
  /** Short label shown under the city name */
  label?: string;
}

export interface Widget_02Props {
  cities?: WorldCity[];
  className?: string;
}

const defaultCities: WorldCity[] = [
  { city: "San Francisco", timeZone: "America/Los_Angeles", label: "PDT" },
  { city: "London", timeZone: "Europe/London", label: "BST" },
  { city: "Tokyo", timeZone: "Asia/Tokyo", label: "JST" },
];

interface ZoneTime {
  hours: number;
  minutes: number;
  seconds: number;
  digital: string;
  meridiem: string;
  isDay: boolean;
  offsetLabel: string;
}

function getZoneTime(now: Date, timeZone: string): ZoneTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const hours = get("hour") % 24;
  const minutes = get("minute");
  const seconds = get("second");

  // Offset vs local, in whole hours (approximate for the label)
  const zoned = new Date(now.toLocaleString("en-US", { timeZone }));
  const diff = Math.round((zoned.getTime() - now.getTime()) / 3.6e6);
  const offsetLabel = diff === 0 ? "Local" : `${diff > 0 ? "+" : ""}${diff}h`;

  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return {
    hours,
    minutes,
    seconds,
    digital: `${h12}:${String(minutes).padStart(2, "0")}`,
    meridiem: hours < 12 ? "AM" : "PM",
    isDay: hours >= 6 && hours < 18,
    offsetLabel,
  };
}

const MiniClock = ({ time, isDay }: { time: ZoneTime | null; isDay: boolean }) => {
  const hourDeg = time ? (time.hours % 12) * 30 + time.minutes * 0.5 : 0;
  const minDeg = time ? time.minutes * 6 + time.seconds * 0.1 : 0;
  const secDeg = time ? time.seconds * 6 : 0;

  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="19"
        className={cn(
          "transition-colors duration-500",
          isDay
            ? "fill-white stroke-zinc-200 dark:fill-zinc-900 dark:stroke-zinc-700"
            : "fill-zinc-900 stroke-zinc-700 dark:fill-black dark:stroke-zinc-800"
        )}
        strokeWidth="1"
      />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="3.5"
          x2="20"
          y2="6"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 20 20)`}
          className={isDay ? "stroke-zinc-300 dark:stroke-zinc-600" : "stroke-zinc-600"}
        />
      ))}
      {/* Hands render only after mount to avoid hydration mismatch */}
      {time && (
        <g>
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="12"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 20 20)`}
            className={isDay ? "stroke-zinc-900 dark:stroke-zinc-100" : "stroke-zinc-100"}
          />
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="8"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${minDeg} 20 20)`}
            className={isDay ? "stroke-zinc-500 dark:stroke-zinc-400" : "stroke-zinc-400"}
          />
          <line
            x1="20"
            y1="22.5"
            x2="20"
            y2="7"
            strokeWidth="0.75"
            strokeLinecap="round"
            transform={`rotate(${secDeg} 20 20)`}
            className="stroke-orange-500"
            style={{ transition: "transform 0.2s cubic-bezier(0.4, 2.1, 0.6, 1)" }}
          />
          <circle cx="20" cy="20" r="1.5" className="fill-orange-500" />
        </g>
      )}
    </svg>
  );
};

const Widget_02 = ({ cities = defaultCities, className }: Widget_02Props) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-3xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
        <Globe aria-hidden className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          World clock
        </p>
      </div>

      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {cities.map((c) => {
          const t = now ? getZoneTime(now, c.timeZone) : null;
          const isDay = t?.isDay ?? true;
          return (
            <li key={c.city} className="flex items-center gap-3 px-5 py-3">
              <MiniClock time={t} isDay={isDay} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {c.city}
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {c.label ?? c.timeZone.split("/")[1]?.replace("_", " ")}
                  {t && <span className="ml-1.5 tabular-nums">{t.offsetLabel}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  aria-label={isDay ? "Daytime" : "Nighttime"}
                  role="img"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                    isDay
                      ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                      : "bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.7)]"
                  )}
                />
                <p className="text-right font-mono text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
                  {t ? t.digital : "--:--"}
                  <span className="ml-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                    {t ? t.meridiem : ""}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Widget_02;
