"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export type Player = {
  name: string;
  points: number;
  avatar: string;
};

export type CurrentUser = {
  name: string;
  rank: number;
  points: number;
  avatar: string;
};

const DEFAULT_CURRENT_USER: CurrentUser = {
  name: "You",
  rank: 12,
  points: 4120,
  avatar: "/avatars/avatar-02.svg",
};

const DEFAULT_PLAYERS: Player[] = [
  { name: "Maya Patel", points: 9840, avatar: "/avatars/avatar-01.svg" },
  { name: "Alex Rivera", points: 9215, avatar: "/avatars/avatar-02.svg" },
  { name: "Sam Chen", points: 8730, avatar: "/avatars/avatar-03.svg" },
  { name: "Jordan Lee", points: 7410, avatar: "/avatars/avatar-04.svg" },
  { name: "Priya Nair", points: 6875, avatar: "/avatars/avatar-01.svg" },
];

const MEDALS = [
  "bg-amber-400/15 text-amber-600 ring-1 ring-inset ring-amber-400/30 dark:text-amber-400",
  "bg-zinc-300/25 text-zinc-500 ring-1 ring-inset ring-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-300",
  "bg-orange-400/15 text-orange-600 ring-1 ring-inset ring-orange-400/30 dark:text-orange-400",
];

function Row({
  player,
  rank,
  maxPoints,
  index,
}: {
  player: Player;
  rank: number;
  maxPoints: number;
  index: number;
}) {
  const pct = (player.points / maxPoints) * 100;
  const medal = rank <= 3;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 350, damping: 30 }}
      className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums",
          medal
            ? MEDALS[rank - 1]
            : "text-zinc-400 dark:text-zinc-600"
        )}
      >
        {rank}
      </span>
      <img
        src={player.avatar}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {player.name}
          </p>
          <p className="shrink-0 text-xs font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
            {player.points.toLocaleString("en-US")}
            <span className="ml-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              pts
            </span>
          </p>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.25 + index * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "h-full rounded-full",
              rank === 1
                ? "bg-gradient-to-r from-amber-400 to-amber-500"
                : "bg-zinc-300 dark:bg-zinc-600"
            )}
          />
        </div>
      </div>
    </motion.li>
  );
}

const Stat_03 = ({
  players = DEFAULT_PLAYERS,
  currentUser = DEFAULT_CURRENT_USER,
  title = "Weekly leaderboard",
  className,
}: {
  players?: Player[];
  currentUser?: CurrentUser | null;
  title?: string;
  className?: string;
}) => {
  const top = players;
  const maxPoints = Math.max(...top.map((p) => p.points), 1);

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl p-5",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {title}
        </span>
        <Trophy className="h-3.5 w-3.5 text-amber-500" aria-hidden />
      </div>

      <ul className="mt-3 space-y-0.5">
        {top.map((player, i) => (
          <Row
            key={player.name}
            player={player}
            rank={i + 1}
            maxPoints={maxPoints}
            index={i}
          />
        ))}
      </ul>

      {currentUser && (
        <div className="mt-3 border-t border-dashed border-zinc-200 pt-3 dark:border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 350, damping: 30 }}
            className="flex items-center gap-3 rounded-xl bg-sky-500/[0.06] px-2 py-2 ring-1 ring-inset ring-sky-500/25 dark:bg-sky-400/[0.06]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums text-sky-600 dark:text-sky-400">
              {currentUser.rank}
            </span>
            <img
              src={currentUser.avatar}
              alt=""
              className="h-8 w-8 shrink-0 rounded-full bg-zinc-100 ring-2 ring-sky-500/50 dark:bg-zinc-800"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {currentUser.name}{" "}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    · #{currentUser.rank}
                  </span>
                </p>
                <p className="shrink-0 text-xs font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
                  {currentUser.points.toLocaleString("en-US")}
                  <span className="ml-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                    pts
                  </span>
                </p>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (currentUser.points / maxPoints) * 100)}%`,
                  }}
                  transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-sky-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Stat_03;
