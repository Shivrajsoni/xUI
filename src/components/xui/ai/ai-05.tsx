"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileCode2, RotateCcw, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiffLine {
  text: string;
  type: "removed" | "added";
}

export interface Ai_05Props {
  filePath?: string;
  /** 0–1 */
  confidence?: number;
  explanation?: string;
  before?: string[];
  after?: string[];
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

const defaultBefore = [
  "const users = await db.query(",
  '  `SELECT * FROM users WHERE email = \'${email}\'`',
  ");",
];

const defaultAfter = [
  "const users = await db.query(",
  '  "SELECT * FROM users WHERE email = $1",',
  "  [email]",
  ");",
];

type ReviewState = "pending" | "accepted" | "rejected";

const Ai_05 = ({
  filePath = "src/api/users/route.ts",
  confidence = 0.92,
  explanation = "String interpolation in this query allows SQL injection. Switching to a parameterized query lets the driver escape user input safely.",
  before = defaultBefore,
  after = defaultAfter,
  onAccept,
  onReject,
  className,
}: Ai_05Props) => {
  const [state, setState] = useState<ReviewState>("pending");

  const accept = () => {
    setState("accepted");
    onAccept?.();
  };
  const reject = () => {
    setState("rejected");
    onReject?.();
  };

  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* File header + confidence */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-2.5 dark:border-zinc-900">
        <div className="flex min-w-0 items-center gap-2">
          <FileCode2
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-600"
          />
          <p className="truncate font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            {filePath}
          </p>
        </div>
        <div
          className="flex shrink-0 items-center gap-1.5"
          role="img"
          aria-label={`Confidence ${Math.round(confidence * 100)} percent`}
        >
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
            Conf
          </span>
          <span className="h-1 w-12 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
              className="block h-full rounded-full bg-emerald-500"
            />
          </span>
          <span className="font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>

      {/* Diff */}
      <div className="px-4 pt-4">
        <div className="overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-900">
          <AnimatePresence initial={false} mode="popLayout">
            {state !== "accepted" && (
              <motion.div
                key="before"
                layout
                initial={{ opacity: 1 }}
                exit={{ height: 0, opacity: 0, filter: "blur(3px)" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="overflow-hidden bg-rose-500/[0.07] dark:bg-rose-500/10"
              >
                <pre className="overflow-x-auto px-3 py-2 font-mono text-[10px] leading-relaxed text-rose-700 dark:text-rose-300">
                  {before.map((line, i) => (
                    <span key={i} className="block whitespace-pre">
                      <span aria-hidden className="mr-2 select-none text-rose-400/70">
                        -
                      </span>
                      {line}
                    </span>
                  ))}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "bg-emerald-500/[0.07] dark:bg-emerald-500/10",
              state === "accepted" && "bg-emerald-500/10 dark:bg-emerald-500/15"
            )}
          >
            <pre className="overflow-x-auto px-3 py-2 font-mono text-[10px] leading-relaxed text-emerald-700 dark:text-emerald-300">
              {after.map((line, i) => (
                <span key={i} className="block whitespace-pre">
                  <span
                    aria-hidden
                    className="mr-2 select-none text-emerald-500/70"
                  >
                    {state === "accepted" ? " " : "+"}
                  </span>
                  {line}
                </span>
              ))}
            </pre>
          </motion.div>
        </div>
      </div>

      {/* AI explanation */}
      <div className="px-4 pt-3">
        <div className="flex gap-2.5 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-3 py-2.5 dark:bg-violet-500/10">
          <Sparkles
            aria-hidden
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500 dark:text-violet-400"
          />
          <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            {explanation}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-4">
        <AnimatePresence mode="wait" initial={false}>
          {state === "pending" ? (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex w-full gap-2"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={accept}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white transition-colors hover:bg-emerald-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-zinc-950"
              >
                <Check aria-hidden className="h-3.5 w-3.5" />
                Accept
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={reject}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                <X aria-hidden className="h-3.5 w-3.5" />
                Reject
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="resolved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex w-full items-center justify-between"
            >
              <p
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium",
                  state === "accepted"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {state === "accepted" ? (
                  <>
                    <Check aria-hidden className="h-3.5 w-3.5" />
                    Change applied
                  </>
                ) : (
                  <>
                    <X aria-hidden className="h-3.5 w-3.5" />
                    Suggestion dismissed
                  </>
                )}
              </p>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setState("pending")}
                aria-label="Undo decision"
                className="flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
              >
                <RotateCcw aria-hidden className="h-3 w-3" />
                Undo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ai_05;
