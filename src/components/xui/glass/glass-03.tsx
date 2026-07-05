"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellOff, Calendar, Mail, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

export interface GlassNotification {
  id: string;
  app: string;
  title: string;
  body: string;
  time: string;
  icon: "messages" | "calendar" | "mail";
}

const appIcons: Record<
  GlassNotification["icon"],
  { icon: React.ElementType; bg: string }
> = {
  messages: { icon: MessageCircle, bg: "bg-gradient-to-b from-green-400 to-green-600" },
  calendar: { icon: Calendar, bg: "bg-gradient-to-b from-red-400 to-red-600" },
  mail: { icon: Mail, bg: "bg-gradient-to-b from-sky-400 to-blue-600" },
};

const defaultNotifications: GlassNotification[] = [
  {
    id: "n1",
    app: "Messages",
    title: "Sam Chen",
    body: "The prototype looks great — shipping the final build tonight 🚀",
    time: "now",
    icon: "messages",
  },
  {
    id: "n2",
    app: "Calendar",
    title: "Design review",
    body: "Starts in 15 minutes · Conference Room B",
    time: "9:45 AM",
    icon: "calendar",
  },
  {
    id: "n3",
    app: "Mail",
    title: "Maya Patel",
    body: "Re: Q3 roadmap — added comments on the growth section",
    time: "8:12 AM",
    icon: "mail",
  },
];

const NotificationCard = ({
  item,
  onClose,
  layoutId,
}: {
  item: GlassNotification;
  onClose?: () => void;
  layoutId?: string;
}) => {
  const { icon: Icon, bg } = appIcons[item.icon];
  return (
    <motion.div
      layoutId={layoutId}
      transition={spring}
      className="group/card relative w-full rounded-2xl border border-white/50 bg-white/60 p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-zinc-900/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_30px_-12px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-start gap-2.5">
        <span
          aria-hidden
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.55rem] text-white shadow-sm",
            bg
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-50">
              {item.title}
            </p>
            <span className="shrink-0 text-[10px] text-zinc-500 dark:text-zinc-400">
              {item.time}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-600 dark:text-zinc-300">
            {item.body}
          </p>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          aria-label={`Dismiss notification from ${item.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/50 bg-zinc-200/90 text-zinc-600 opacity-0 shadow-sm backdrop-blur transition-all duration-150 hover:bg-zinc-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-90 group-hover/card:opacity-100 dark:border-white/20 dark:bg-zinc-700/90 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:focus-visible:ring-white/40"
        >
          <X aria-hidden className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );
};

export interface Glass_03Props {
  notifications?: GlassNotification[];
  onDismiss?: (id: string) => void;
  className?: string;
}

const Glass_03 = ({
  notifications = defaultNotifications,
  onDismiss,
  className,
}: Glass_03Props) => {
  const [items, setItems] = useState(notifications);
  const [expanded, setExpanded] = useState(false);
  const uid = useId();

  const dismiss = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    onDismiss?.(id);
  };

  const top = items[0];

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 p-4 sm:p-5 dark:border-zinc-800",
        "bg-gradient-to-br from-amber-100 via-rose-100 to-sky-200 dark:from-[#2a1a10] dark:via-[#231226] dark:to-[#0c1a2e]",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -left-14 -top-10 h-48 w-48 rounded-full bg-amber-300/50 blur-3xl dark:bg-amber-500/15" />
      <div aria-hidden className="pointer-events-none absolute -bottom-14 -right-12 h-52 w-52 rounded-full bg-sky-400/40 blur-3xl dark:bg-sky-500/20" />

      <div className="relative min-h-[13rem]">
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            Notification Center
          </p>
          {expanded && items.length > 1 && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="rounded-full border border-white/50 bg-white/50 px-2.5 py-1 text-[10px] font-medium text-zinc-700 backdrop-blur-xl transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15 dark:focus-visible:ring-white/40"
            >
              Show less
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/40 bg-white/40 py-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <BellOff aria-hidden className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">No notifications</p>
          </motion.div>
        ) : !expanded ? (
          /* Collapsed stack */
          <div
            role={items.length > 1 ? "button" : undefined}
            tabIndex={items.length > 1 ? 0 : undefined}
            onClick={() => (items.length > 1 ? setExpanded(true) : undefined)}
            onKeyDown={(e) => {
              if (items.length > 1 && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setExpanded(true);
              }
            }}
            aria-label={
              items.length > 1 ? `Expand ${items.length} notifications` : undefined
            }
            className={cn(
              "relative block w-full pt-4 text-left focus-visible:outline-none",
              items.length > 1 &&
                "cursor-pointer focus-visible:[&>div>div]:ring-2 focus-visible:[&>div>div]:ring-white/70 dark:focus-visible:[&>div>div]:ring-white/40"
            )}
          >
            {/* Depth peeks */}
            {items.slice(1, 3).map((n, i) => (
              <motion.div
                key={n.id}
                layoutId={`${uid}-${n.id}`}
                transition={spring}
                aria-hidden
                style={{ zIndex: 2 - i }}
                animate={{ y: -8 * (i + 1) - 16, scale: 1 - 0.05 * (i + 1) }}
                className="absolute inset-x-0 top-4 h-10 rounded-2xl border border-white/40 bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-800/50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              />
            ))}
            <motion.div whileTap={items.length > 1 ? { scale: 0.98 } : undefined} transition={spring} className="relative z-10">
              <NotificationCard
                item={top!}
                layoutId={`${uid}-${top!.id}`}
                onClose={() => dismiss(top!.id)}
              />
            </motion.div>
            {items.length > 1 && (
              <span className="mt-2 block text-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                {items.length - 1} more notification{items.length > 2 ? "s" : ""}
              </span>
            )}
          </div>
        ) : (
          /* Expanded list */
          <ul className="space-y-2" aria-label="Notifications">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((n, i) => (
                <motion.li
                  key={n.id}
                  layout
                  initial={i === 0 ? false : { opacity: 0, y: -14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ ...spring, delay: i === 0 ? 0 : i * 0.04 }}
                >
                  <NotificationCard
                    item={n}
                    layoutId={`${uid}-${n.id}`}
                    onClose={() => dismiss(n.id)}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Glass_03;
