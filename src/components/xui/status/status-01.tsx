"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PresenceState = "online" | "away" | "dnd";

export interface PresenceMember {
  name: string;
  avatar: string;
  presence: PresenceState;
  /** Shows a live typing bubble above this member. */
  typing?: boolean;
  /** Marks this member as the current user (their presence follows the control). */
  isSelf?: boolean;
}

const defaultMembers: PresenceMember[] = [
  { name: "You", avatar: "/avatars/avatar-01.svg", presence: "online", isSelf: true },
  { name: "Alex Rivera", avatar: "/avatars/avatar-02.svg", presence: "online" },
  { name: "Sam Chen", avatar: "/avatars/avatar-03.svg", presence: "away", typing: true },
  { name: "Maya Patel", avatar: "/avatars/avatar-04.svg", presence: "dnd" },
];

const presenceDot: Record<PresenceState, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  dnd: "bg-rose-500",
};

const presenceLabel: Record<PresenceState, string> = {
  online: "Online",
  away: "Away",
  dnd: "Do not disturb",
};

export interface Status_01Props {
  members?: PresenceMember[];
  /** Extra members hidden behind the “+N” chip. */
  overflowCount?: number;
  onPresenceChange?: (presence: PresenceState) => void;
  className?: string;
}

const Status_01 = ({
  members = defaultMembers,
  overflowCount = 3,
  onPresenceChange,
  className,
}: Status_01Props) => {
  const [fanned, setFanned] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [myPresence, setMyPresence] = useState<PresenceState>(
    members.find((m) => m.isSelf)?.presence ?? "online"
  );
  const thumbId = useId();

  const setPresence = (p: PresenceState) => {
    setMyPresence(p);
    onPresenceChange?.(p);
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Design review
        </p>
        <p className="text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
          {members.length + overflowCount} in room
        </p>
      </div>

      {/* Avatar stack */}
      <div
        className="mt-8 flex items-center pl-1"
        onMouseEnter={() => setFanned(true)}
        onMouseLeave={() => {
          setFanned(false);
          setHovered(null);
        }}
      >
        {members.map((member, i) => {
          const presence = member.isSelf ? myPresence : member.presence;
          return (
            <motion.div
              key={member.name}
              animate={{ marginLeft: i === 0 ? 0 : fanned ? 8 : -12 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative"
              style={{ zIndex: members.length - i }}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => {
                setFanned(true);
                setHovered(i);
              }}
              onBlur={() => setHovered(null)}
            >
              <span
                role="img"
                tabIndex={0}
                aria-label={`${member.name} — ${presenceLabel[presence]}${member.typing ? ", typing" : ""}`}
                className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full bg-zinc-100 ring-2 ring-white dark:bg-zinc-900 dark:ring-zinc-950"
                />
              </span>

              {/* Presence dot */}
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white dark:ring-zinc-950",
                  presenceDot[presence]
                )}
              />

              {/* Typing bubble */}
              {member.typing && (
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26, delay: 0.4 }}
                  className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-zinc-200 bg-white px-2 py-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ y: [0, -2.5, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: d * 0.15,
                        ease: "easeInOut",
                      }}
                      className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-400"
                    />
                  ))}
                </motion.span>
              )}

              {/* Name tooltip */}
              <AnimatePresence>
                {fanned && hovered === i && !member.typing && (
                  <motion.span
                    role="tooltip"
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {member.name}
                  </motion.span>
                )}
                {fanned && hovered === i && member.typing && (
                  <motion.span
                    role="tooltip"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {member.name} · typing…
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Overflow chip */}
        {overflowCount > 0 && (
          <motion.div
            animate={{ marginLeft: fanned ? 8 : -12 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative z-0 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-500 ring-2 ring-white dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-950"
          >
            +{overflowCount}
          </motion.div>
        )}
      </div>

      {/* My presence control */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-900">
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Your status</p>
        <div
          role="radiogroup"
          aria-label="Set your presence"
          className="relative flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {(["online", "away", "dnd"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={myPresence === p}
              onClick={() => setPresence(p)}
              className={cn(
                "relative z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.97]",
                myPresence === p
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
            >
              {myPresence === p && (
                <motion.span
                  layoutId={thumbId}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
                />
              )}
              <span
                aria-hidden
                className={cn("relative h-1.5 w-1.5 rounded-full", presenceDot[p])}
              />
              <span className="relative">
                {p === "dnd" ? "DND" : p === "online" ? "Online" : "Away"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status_01;
