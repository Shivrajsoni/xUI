"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ChangeType = "new" | "improved" | "fixed";

export interface ChangelogEntry {
  id: string;
  type: ChangeType;
  title: string;
  details: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  entries: ChangelogEntry[];
}

const typeBadge: Record<ChangeType, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  improved: {
    label: "Improved",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  fixed: {
    label: "Fixed",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
};

const defaultReleases: ChangelogRelease[] = [
  {
    version: "v2.1.0",
    date: "Jun 28, 2026",
    entries: [
      {
        id: "2.1.0-webhooks",
        type: "new",
        title: "Webhook replay from the dashboard",
        details:
          "Failed deliveries can now be replayed individually or in bulk for the last 30 days. Replays keep the original signature and add an X-Replay header.",
      },
      {
        id: "2.1.0-search",
        type: "improved",
        title: "Command palette search is 4× faster",
        details:
          "Search now runs against a local index with server fallback. Median keystroke-to-result latency dropped from 210 ms to 48 ms.",
      },
      {
        id: "2.1.0-safari",
        type: "fixed",
        title: "Safari date picker off-by-one",
        details:
          "Dates selected in negative UTC offsets no longer shift back a day when saved. Affected reports created between May 2 and Jun 11 were backfilled.",
      },
    ],
  },
  {
    version: "v2.0.4",
    date: "Jun 12, 2026",
    entries: [
      {
        id: "2.0.4-exports",
        type: "improved",
        title: "CSV exports stream for large datasets",
        details:
          "Exports over 50k rows now stream instead of buffering, so they start immediately and no longer time out at ~180k rows.",
      },
      {
        id: "2.0.4-sso",
        type: "fixed",
        title: "SSO session renewal loop",
        details:
          "Okta-backed sessions renewing within 60 seconds of expiry could loop back to the login screen. Renewal now happens 5 minutes early.",
      },
    ],
  },
];

export interface Status_04Props {
  releases?: ChangelogRelease[];
  onSubscribe?: (email: string) => void;
  className?: string;
}

const Status_04 = ({ releases = defaultReleases, onSubscribe, className }: Status_04Props) => {
  const [openId, setOpenId] = useState<string | null>(releases[0]?.entries[0]?.id ?? null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    onSubscribe?.(email.trim());
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
      <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Changelog</p>
        <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">
          What shipped, release by release
        </p>
      </div>

      <div className="max-h-72 overflow-y-auto px-5 py-4">
        {releases.map((release, ri) => (
          <section key={release.version} className={cn(ri > 0 && "mt-5")}>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[10px] font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {release.version}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {release.date}
              </span>
              <span aria-hidden className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900" />
            </div>

            <ul className="mt-3 space-y-1">
              {release.entries.map((entry) => {
                const open = openId === entry.id;
                const badge = typeBadge[entry.type];
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : entry.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors",
                        "hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.995] dark:hover:bg-zinc-900/60",
                        open && "bg-zinc-50 dark:bg-zinc-900/60"
                      )}
                    >
                      <span
                        className={cn(
                          "w-16 shrink-0 rounded-full px-1.5 py-0.5 text-center text-[10px] font-medium",
                          badge.className
                        )}
                      >
                        {badge.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-zinc-700 dark:text-zinc-300">
                        {entry.title}
                      </span>
                      <motion.span
                        aria-hidden
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        className="shrink-0 text-zinc-400 dark:text-zinc-600"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          className="overflow-hidden"
                        >
                          <p className="px-2 pb-2 pl-[4.7rem] pt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                            {entry.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Subscribe row */}
      <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-900">
        <AnimatePresence mode="popLayout" initial={false}>
          {subscribed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex h-9 items-center gap-2 text-[13px] text-emerald-600 dark:text-emerald-400"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.05 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
              </motion.span>
              You&apos;re subscribed — release notes land in your inbox.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -8 }}
              onSubmit={subscribe}
              className="flex items-center gap-2"
            >
              <div className="relative min-w-0 flex-1">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
                />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address for release updates"
                  className="h-9 pl-8 text-xs"
                />
              </div>
              <Button
                type="submit"
                className="h-9 shrink-0 text-xs shadow-none transition-transform active:scale-[0.97] bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
              >
                Subscribe
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Status_04;
