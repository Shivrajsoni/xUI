"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, FileCode2, UnfoldVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type DiffLineType = "context" | "removed" | "added";

export interface DiffLine {
  type: DiffLineType;
  oldNo?: number;
  newNo?: number;
  content: string;
}

export interface Table_05Props {
  fileName?: string;
  additions?: number;
  deletions?: number;
  lines?: DiffLine[];
  /** Lines revealed when the collapsed hunk is expanded */
  collapsedLines?: DiffLine[];
  collapsedCount?: number;
  className?: string;
}

const defaultLines: DiffLine[] = [
  { type: "context", oldNo: 12, newNo: 12, content: "export function formatPrice(" },
  { type: "removed", oldNo: 13, content: "  amount: number" },
  { type: "added", newNo: 13, content: "  amount: number," },
  { type: "added", newNo: 14, content: "  currency: string = \"USD\"" },
  { type: "context", oldNo: 14, newNo: 15, content: ") {" },
  { type: "removed", oldNo: 15, content: "  return `$${amount.toFixed(2)}`;" },
  { type: "added", newNo: 16, content: "  return new Intl.NumberFormat(\"en-US\", {" },
  { type: "added", newNo: 17, content: "    style: \"currency\"," },
  { type: "added", newNo: 18, content: "    currency," },
  { type: "added", newNo: 19, content: "  }).format(amount);" },
  { type: "context", oldNo: 16, newNo: 20, content: "}" },
];

const defaultCollapsed: DiffLine[] = [
  { type: "context", oldNo: 17, newNo: 21, content: "" },
  { type: "context", oldNo: 18, newNo: 22, content: "export function formatDate(date: Date) {" },
  { type: "context", oldNo: 19, newNo: 23, content: "  return date.toLocaleDateString(\"en-US\");" },
  { type: "context", oldNo: 20, newNo: 24, content: "}" },
];

const lineStyles: Record<DiffLineType, { row: string; sign: string; signChar: string }> = {
  context: { row: "", sign: "text-zinc-300 dark:text-zinc-700", signChar: " " },
  removed: {
    row: "bg-rose-500/[0.07] dark:bg-rose-500/[0.09]",
    sign: "text-rose-500",
    signChar: "-",
  },
  added: {
    row: "bg-emerald-500/[0.08] dark:bg-emerald-500/[0.09]",
    sign: "text-emerald-600 dark:text-emerald-500",
    signChar: "+",
  },
};

function Row({ line }: { line: DiffLine }) {
  const style = lineStyles[line.type];
  return (
    <div className={cn("flex items-stretch font-mono text-[11px] leading-5", style.row)}>
      <span className="w-8 shrink-0 select-none border-r border-zinc-100 pr-1.5 text-right tabular-nums text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">
        {line.oldNo ?? ""}
      </span>
      <span className="w-8 shrink-0 select-none border-r border-zinc-100 pr-1.5 text-right tabular-nums text-zinc-300 dark:border-zinc-900 dark:text-zinc-700">
        {line.newNo ?? ""}
      </span>
      <span className={cn("w-5 shrink-0 select-none text-center font-semibold", style.sign)}>
        {style.signChar}
      </span>
      <span className="whitespace-pre pr-4 text-zinc-700 dark:text-zinc-300">
        {line.content || " "}
      </span>
    </div>
  );
}

const Table_05 = ({
  fileName = "src/lib/format.ts",
  additions = 12,
  deletions = 4,
  lines = defaultLines,
  collapsedLines = defaultCollapsed,
  collapsedCount = 4,
  className,
}: Table_05Props) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyDiff = async () => {
    const text = lines
      .map((l) => `${lineStyles[l.type].signChar}${l.content}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* File header */}
      <div className="flex items-center gap-2 border-b border-zinc-100 px-3.5 py-2.5 dark:border-zinc-900">
        <FileCode2 className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
        <span className="min-w-0 truncate font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200">
          {fileName}
        </span>
        <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
          +{additions}
        </span>
        <span className="rounded-full bg-rose-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-rose-600 dark:text-rose-400">
          −{deletions}
        </span>
        <button
          type="button"
          onClick={copyDiff}
          aria-label={copied ? "Diff copied" : "Copy diff"}
          className="ml-auto rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-90 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex"
              >
                <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Diff body */}
      <div className="overflow-x-auto py-1.5">
        <div className="min-w-max">
          {lines.map((line, i) => (
            <Row key={`l-${i}`} line={line} />
          ))}

          {/* Collapsed hunk */}
          {!expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              aria-label={`Expand ${collapsedCount} collapsed lines`}
              className="group flex w-full items-center gap-2 bg-sky-500/[0.05] px-3 py-1.5 transition-colors hover:bg-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 active:scale-[0.995] dark:bg-sky-500/[0.06]"
            >
              <UnfoldVertical
                className="h-3.5 w-3.5 text-sky-500 transition-transform group-hover:scale-110"
                aria-hidden
              />
              <span className="font-mono text-[11px] text-sky-600 dark:text-sky-400">
                @@ {collapsedCount} unchanged lines — click to expand @@
              </span>
            </button>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key="expanded-hunk"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 34 }}
                className="overflow-hidden"
              >
                {collapsedLines.map((line, i) => (
                  <Row key={`c-${i}`} line={line} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-3.5 py-2 dark:border-zinc-900">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Changed in <span className="font-mono text-zinc-500 dark:text-zinc-400">a3f9c21</span>
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-sm bg-emerald-500/80" />
          ))}
          <span className="h-1.5 w-1.5 rounded-sm bg-rose-500/80" />
          <span className="h-1.5 w-1.5 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
        </span>
      </div>
    </div>
  );
};

export default Table_05;
