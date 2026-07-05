"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellOff,
  Check,
  GitPullRequest,
  Rocket,
  ShieldAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Notification = {
  id: number;
  avatar?: string;
  icon?: "deploy" | "security" | "pr";
  actor?: string;
  text: string;
  meta?: string;
  time: string;
  unread: boolean;
  actionable?: boolean;
};

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    avatar: "/avatars/avatar-01.svg",
    actor: "Sam Chen",
    text: "commented on",
    meta: "Q3 revenue dashboard",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    avatar: "/avatars/avatar-02.svg",
    actor: "Maya Patel",
    text: "invited you to",
    meta: "Design system v3",
    time: "18m",
    unread: true,
    actionable: true,
  },
  {
    id: 3,
    icon: "deploy",
    actor: "Deploy",
    text: "production build shipped",
    meta: "v2.14.0",
    time: "1h",
    unread: true,
  },
  {
    id: 4,
    avatar: "/avatars/avatar-03.svg",
    actor: "Alex Rivera",
    text: "assigned you",
    meta: "API rate-limit bug",
    time: "3h",
    unread: false,
  },
  {
    id: 5,
    icon: "security",
    actor: "Security",
    text: "new sign-in from",
    meta: "Chrome · Lisbon",
    time: "5h",
    unread: false,
  },
  {
    id: 6,
    avatar: "/avatars/avatar-04.svg",
    actor: "Jordan Lee",
    text: "approved your request for",
    meta: "staging access",
    time: "8h",
    unread: false,
  },
  {
    id: 7,
    icon: "pr",
    actor: "GitHub",
    text: "PR #482 merged into",
    meta: "main",
    time: "1d",
    unread: false,
  },
  {
    id: 8,
    avatar: "/avatars/avatar-01.svg",
    actor: "Sam Chen",
    text: "mentioned you in",
    meta: "#eng-frontend",
    time: "1d",
    unread: false,
  },
];

const ICONS = {
  deploy: { Icon: Rocket, cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  security: {
    Icon: ShieldAlert,
    cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  pr: {
    Icon: GitPullRequest,
    cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};

const Notification_01 = ({
  notifications: initial = DEFAULT_NOTIFICATIONS,
  onAccept,
  onDecline,
  className,
}: {
  notifications?: Notification[];
  onAccept?: (notification: Notification) => void;
  onDecline?: (notification: Notification) => void;
  className?: string;
}) => {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const pillId = useId();

  const unreadCount = items.filter((n) => n.unread).length;
  const visible = tab === "all" ? items : items.filter((n) => n.unread);

  const markRead = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismiss = (id: number) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Notifications
        </span>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="rounded-md px-2 py-1 text-[11px] font-medium text-sky-600 transition-colors duration-200 hover:bg-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:text-zinc-300 dark:text-sky-400 dark:disabled:text-zinc-700"
        >
          Mark all read
        </button>
      </div>

      <div className="flex gap-1 px-4 pt-2" role="tablist" aria-label="Filter notifications">
        {(
          [
            { key: "all", label: "All", count: items.length },
            { key: "unread", label: "Unread", count: unreadCount },
          ] as const
        ).map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "relative rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
              tab === key
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
          >
            {tab === key && (
              <motion.span
                layoutId={`notif-tab-pill-${pillId}`}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800"
                aria-hidden
              />
            )}
            <span className="relative">
              {label}{" "}
              <span className="tabular-nums text-zinc-400 dark:text-zinc-500">
                {count}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-2 max-h-[380px] overflow-y-auto pb-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((n) => {
            const iconDef = n.icon ? ICONS[n.icon] : null;
            return (
              <motion.button
                key={n.id}
                layout
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                onClick={() => markRead(n.id)}
                className={cn(
                  "group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-200",
                  "hover:bg-zinc-50 focus-visible:outline-none focus-visible:bg-zinc-50 dark:hover:bg-zinc-900/60 dark:focus-visible:bg-zinc-900/60"
                )}
              >
                {iconDef ? (
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      iconDef.cls
                    )}
                    aria-hidden
                  >
                    <iconDef.Icon className="h-4 w-4" />
                  </span>
                ) : (
                  <img
                    src={n.avatar}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-full bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {n.actor}
                    </span>{" "}
                    {n.text}
                    {n.meta && (
                      <>
                        {" "}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {n.meta}
                        </span>
                      </>
                    )}
                  </span>
                  {n.actionable && (
                    <span className="mt-2 flex gap-2">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          markRead(n.id);
                          onAccept?.(n);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            markRead(n.id);
                            onAccept?.(n);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-emerald-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                      >
                        <Check className="h-3 w-3" aria-hidden />
                        Accept
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          dismiss(n.id);
                          onDecline?.(n);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            dismiss(n.id);
                            onDecline?.(n);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        <X className="h-3 w-3" aria-hidden />
                        Decline
                      </span>
                    </span>
                  )}
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                  <span className="text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
                    {n.time}
                  </span>
                  {n.unread && (
                    <span
                      className="h-2 w-2 rounded-full bg-sky-500"
                      aria-label="Unread"
                    />
                  )}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex flex-col items-center gap-2 px-6 py-10 text-center"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
              aria-hidden
            >
              <BellOff className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              You&apos;re all caught up
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              No unread notifications. Enjoy the quiet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notification_01;
