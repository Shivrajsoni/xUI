"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatSegment = { type: "text" | "code"; content: string };

const defaultSegments: ChatSegment[] = [
  {
    type: "text",
    content:
      "Memoization only helps when the computation is more expensive than the comparison. For derived lists, wrap the transform in useMemo and key it on the raw data:",
  },
  {
    type: "code",
    content: `const sorted = useMemo(
  () => [...users].sort(byName),
  [users]
);`,
  },
  {
    type: "text",
    content:
      "If the list is small (< 1,000 items), skip it — React re-renders are rarely your bottleneck. Profile first, memoize second.",
  },
];

const TICK_MS = 14;
const CHARS_PER_TICK = 2;

export type Chat02Props = {
  /** Response body as alternating text/code segments. */
  segments?: ChatSegment[];
  /** Header label for the responder. */
  title?: string;
  /** Small stats line shown after streaming completes. Pass "" to hide. */
  meta?: string;
  /** Called when the user votes on the response. */
  onVote?: (vote: "up" | "down" | null) => void;
  className?: string;
};

const Chat_02 = ({
  segments = defaultSegments,
  title = "Assistant",
  meta = "1.2s · 214 tokens",
  onVote,
  className,
}: Chat02Props) => {
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalChars = useMemo(
    () => segments.reduce((n, s) => n + s.content.length, 0),
    [segments]
  );

  const done = shown >= totalChars;

  const stream = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShown(0);
    setCopied(false);
    setVote(null);
    intervalRef.current = setInterval(() => {
      setShown((n) => {
        if (n + CHARS_PER_TICK >= totalChars) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return totalChars;
        }
        return n + CHARS_PER_TICK;
      });
    }, TICK_MS);
  }, [totalChars]);

  useEffect(() => {
    stream();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stream]);

  function copy() {
    const text = segments.map((s) => s.content).join("\n\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  // Slice segments to the streamed character budget.
  let budget = shown;
  const visible = segments.map((seg) => {
    const take = Math.max(0, Math.min(seg.content.length, budget));
    budget -= take;
    return { ...seg, content: seg.content.slice(0, take), full: take === seg.content.length };
  });
  // Caret lives at the end of the last non-empty segment.
  const caretIndex = visible.reduce(
    (acc, seg, i) => (seg.content.length > 0 ? i : acc),
    0
  );

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-sky-600 ring-1 ring-inset ring-sky-500/20 dark:text-sky-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
        </div>
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
            done
              ? "text-zinc-300 dark:text-zinc-700"
              : "text-sky-600 dark:text-sky-400"
          )}
        >
          {done ? "Complete" : "Streaming…"}
        </span>
      </div>

      {/* Streamed body */}
      <div
        className="min-h-16 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300"
        aria-live="polite"
      >
        {visible.map((seg, i) => {
          const caret =
            !done && i === caretIndex ? (
              <motion.span
                aria-hidden
                className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.2em] rounded-full bg-sky-500 dark:bg-sky-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
            ) : null;

          if (seg.type === "code") {
            if (seg.content.length === 0) return null;
            return (
              <pre
                key={i}
                className="my-3 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-mono text-[12px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              >
                <code>
                  {seg.content}
                  {caret}
                </code>
              </pre>
            );
          }
          if (seg.content.length === 0) return null;
          return (
            <p key={i} className={i > 0 ? "mt-3" : undefined}>
              {seg.content}
              {caret}
            </p>
          );
        })}
      </div>

      {/* Footer actions — fade in once streaming completes */}
      <div className="mt-4 flex h-9 items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
        <AnimatePresence>
          {done && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-0.5">
                <motion.button
                  type="button"
                  aria-label={copied ? "Copied" : "Copy response"}
                  onClick={copy}
                  whileTap={{ scale: 0.88 }}
                  className="rounded-lg p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Replay stream"
                  onClick={stream}
                  whileTap={{ scale: 0.88, rotate: -90 }}
                  className="rounded-lg p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Good response"
                  aria-pressed={vote === "up"}
                  onClick={() => {
                    const next = vote === "up" ? null : "up";
                    setVote(next);
                    onVote?.(next);
                  }}
                  whileTap={{ scale: 0.88 }}
                  className={cn(
                    "rounded-lg p-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
                    vote === "up"
                      ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Bad response"
                  aria-pressed={vote === "down"}
                  onClick={() => {
                    const next = vote === "down" ? null : "down";
                    setVote(next);
                    onVote?.(next);
                  }}
                  whileTap={{ scale: 0.88 }}
                  className={cn(
                    "rounded-lg p-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
                    vote === "down"
                      ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </motion.button>
              </div>
              {meta && (
                <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-400 dark:text-zinc-600">
                  {meta}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat_02;
