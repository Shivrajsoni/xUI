"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: number;
  points: number[];
};

const DEFAULT_STATS: Stat[] = [
  {
    label: "Revenue",
    value: 48.2,
    prefix: "$",
    suffix: "k",
    decimals: 1,
    delta: 12.4,
    points: [12, 18, 14, 22, 19, 27, 24, 32, 30, 38, 35, 44],
  },
  {
    label: "Active users",
    value: 2847,
    delta: 8.1,
    points: [30, 28, 34, 31, 38, 36, 33, 39, 37, 42, 45, 43],
  },
  {
    label: "Conversion",
    value: 3.24,
    suffix: "%",
    decimals: 2,
    delta: -1.2,
    points: [40, 42, 38, 41, 36, 39, 34, 37, 33, 35, 31, 33],
  },
];

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration]);

  return value;
}

function Sparkline({
  points,
  positive,
  id,
}: {
  points: number[];
  positive: boolean;
  id: string;
}) {
  const w = 120;
  const h = 36;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map(
    (p, i) =>
      `${(i * step).toFixed(2)},${(h - 4 - ((p - min) / range) * (h - 8)).toFixed(2)}`
  );
  const line = coords.join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  const stroke = positive ? "#10b981" : "#f43f5e";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-9 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#spark-${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KpiCard({ stat, index }: { stat: Stat; index: number }) {
  const animated = useCountUp(stat.value);
  const positive = stat.delta >= 0;
  const display = `${stat.prefix ?? ""}${animated.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  })}${stat.suffix ?? ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl p-5",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(24,24,27,0.35)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {stat.label}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums",
            positive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          ) : (
            <ArrowDownRight className="h-3 w-3" aria-hidden />
          )}
          {Math.abs(stat.delta)}%
        </span>
      </div>
      <p className="text-3xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
        {display}
      </p>
      <Sparkline
        points={stat.points}
        positive={positive}
        id={`${index}-${stat.label.replace(/\s+/g, "-").toLowerCase()}`}
      />
    </motion.div>
  );
}

const Stat_01 = ({
  stats = DEFAULT_STATS,
  className,
}: {
  stats?: Stat[];
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full max-w-3xl gap-4 sm:grid-cols-3", className)}>
      {stats.map((stat, i) => (
        <KpiCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
};

export default Stat_01;
