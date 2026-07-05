"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coffee,
  Clapperboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TxTone = "emerald" | "amber" | "violet" | "sky";

export interface Tx {
  id: string;
  name: string;
  time: string;
  amount: number;
  icon: React.ElementType;
  tone: TxTone;
  pending?: boolean;
}

export interface TxGroup {
  label: string;
  items: Tx[];
}

const toneStyles: Record<TxTone, string> = {
  emerald:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  amber:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
  violet:
    "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  sky: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
};

const defaultGroups: TxGroup[] = [
  {
    label: "Today",
    items: [
      {
        id: "tx-1",
        name: "Blue Bottle Coffee",
        time: "8:42 AM",
        amount: -6.75,
        icon: Coffee,
        tone: "amber",
      },
      {
        id: "tx-2",
        name: "Salary — Vercel Inc.",
        time: "6:00 AM",
        amount: 4250,
        icon: ArrowDownLeft,
        tone: "emerald",
      },
      {
        id: "tx-3",
        name: "Transfer to Maya Patel",
        time: "11:18 AM",
        amount: -120,
        icon: ArrowUpRight,
        tone: "sky",
        pending: true,
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "tx-4",
        name: "Netflix Premium",
        time: "9:30 PM",
        amount: -22.99,
        icon: Clapperboard,
        tone: "violet",
      },
      {
        id: "tx-5",
        name: "Refund — Sam Chen",
        time: "2:05 PM",
        amount: 48.5,
        icon: ArrowDownLeft,
        tone: "emerald",
      },
    ],
  },
];

const formatAmount = (amount: number) =>
  `${amount > 0 ? "+" : "−"}$${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export interface Payment_03Props {
  groups?: TxGroup[];
  onSelectTransaction?: (tx: Tx) => void;
  onViewAll?: () => void;
  className?: string;
}

const Payment_03 = ({
  groups = defaultGroups,
  onSelectTransaction,
  onViewAll,
  className,
}: Payment_03Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  let rowIndex = 0;

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-3 pb-1 pt-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Transactions
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="rounded-md px-2 py-1 text-xs text-zinc-400 transition duration-200 hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          View all
        </button>
      </div>

      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            {group.label}
          </p>
          <ul>
            {group.items.map((tx) => {
              const Icon = tx.icon;
              const index = rowIndex++;
              return (
                <motion.li
                  key={tx.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  <button
                    type="button"
                    aria-pressed={selectedId === tx.id}
                    onClick={() => {
                      setSelectedId((id) => (id === tx.id ? null : tx.id));
                      onSelectTransaction?.(tx);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.99] dark:hover:bg-zinc-900/70",
                      selectedId === tx.id && "bg-zinc-100 dark:bg-zinc-900"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-transform duration-200 group-hover:scale-105",
                        toneStyles[tx.tone]
                      )}
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-zinc-800 dark:text-zinc-200">
                        {tx.name}
                      </span>
                      <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                        {tx.time}
                      </span>
                    </span>
                    {tx.pending && (
                      <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Pending
                      </span>
                    )}
                    <span
                      className={cn(
                        "shrink-0 font-mono text-sm tabular-nums",
                        tx.amount > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      {formatAmount(tx.amount)}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      ))}

    </div>
  );
};

export default Payment_03;
