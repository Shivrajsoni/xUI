"use client";

import React, { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  FileText,
  Figma,
  Moon,
  Music2,
  Search,
  SearchX,
  StickyNote,
  Trash2,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpotlightResult {
  id: string;
  label: string;
  hint?: string;
  group: "Applications" | "Documents" | "Actions";
  icon: "figma" | "safari" | "notes" | "music" | "file" | "moon" | "trash" | "video";
}

const resultIcons: Record<SpotlightResult["icon"], { icon: React.ElementType; className: string }> = {
  figma: { icon: Figma, className: "bg-gradient-to-b from-zinc-700 to-zinc-900 text-white dark:from-zinc-600 dark:to-zinc-800" },
  safari: { icon: Compass, className: "bg-gradient-to-b from-sky-400 to-blue-600 text-white" },
  notes: { icon: StickyNote, className: "bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950" },
  music: { icon: Music2, className: "bg-gradient-to-b from-rose-400 to-pink-600 text-white" },
  file: { icon: FileText, className: "bg-zinc-900/10 text-zinc-600 dark:bg-white/10 dark:text-zinc-300" },
  moon: { icon: Moon, className: "bg-zinc-900/10 text-indigo-600 dark:bg-white/10 dark:text-indigo-300" },
  trash: { icon: Trash2, className: "bg-zinc-900/10 text-zinc-600 dark:bg-white/10 dark:text-zinc-300" },
  video: { icon: Video, className: "bg-zinc-900/10 text-red-600 dark:bg-white/10 dark:text-red-400" },
};

const defaultResults: SpotlightResult[] = [
  { id: "app-figma", label: "Figma", hint: "Application", group: "Applications", icon: "figma" },
  { id: "app-safari", label: "Safari", hint: "Application", group: "Applications", icon: "safari" },
  { id: "app-notes", label: "Notes", hint: "Application", group: "Applications", icon: "notes" },
  { id: "app-music", label: "Music", hint: "Application", group: "Applications", icon: "music" },
  { id: "doc-roadmap", label: "Q3 Roadmap.pdf", hint: "Documents · Yesterday", group: "Documents", icon: "file" },
  { id: "doc-brief", label: "Brand refresh brief.md", hint: "Documents · Tue", group: "Documents", icon: "file" },
  { id: "act-dark", label: "Toggle Dark Mode", hint: "System", group: "Actions", icon: "moon" },
  { id: "act-record", label: "Start Screen Recording", hint: "System", group: "Actions", icon: "video" },
  { id: "act-trash", label: "Empty Trash", hint: "Finder", group: "Actions", icon: "trash" },
];

const GROUP_ORDER: SpotlightResult["group"][] = ["Applications", "Documents", "Actions"];

export interface Glass_05Props {
  results?: SpotlightResult[];
  placeholder?: string;
  onSelect?: (result: SpotlightResult) => void;
  className?: string;
}

const Glass_05 = ({
  results = defaultResults,
  placeholder = "Spotlight Search",
  onSelect,
  className,
}: Glass_05Props) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const uid = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? results.filter(
          (r) =>
            r.label.toLowerCase().includes(q) ||
            r.group.toLowerCase().includes(q) ||
            r.hint?.toLowerCase().includes(q)
        )
      : results;
    return GROUP_ORDER.flatMap((g) => matches.filter((r) => r.group === g));
  }, [query, results]);

  const active = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, Math.min(i, filtered.length - 1) + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, Math.min(i, filtered.length - 1) - 1));
    } else if (e.key === "Enter" && filtered[active]) {
      onSelect?.(filtered[active]);
    }
  };

  let groupCursor: string | null = null;

  return (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 p-4 sm:p-6 dark:border-zinc-800",
        "bg-gradient-to-br from-indigo-200 via-sky-100 to-emerald-100 dark:from-[#141233] dark:via-[#0c1c30] dark:to-[#07231c]",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -left-14 -top-12 h-52 w-52 rounded-full bg-indigo-400/40 blur-3xl dark:bg-indigo-500/25" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-emerald-300/50 blur-3xl dark:bg-emerald-500/15" />

      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_24px_60px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-zinc-900/50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_60px_-24px_rgba(0,0,0,0.8)]">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 px-4 py-3">
          <Search aria-hidden className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
          <input
            type="text"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-controls={`${uid}-results`}
            aria-activedescendant={filtered[active] ? `${uid}-${filtered[active].id}` : undefined}
            aria-label="Spotlight search"
            value={query}
            placeholder={placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-500"
          />
          <kbd
            aria-hidden
            className="hidden shrink-0 rounded border border-zinc-900/10 bg-zinc-900/5 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500 sm:block dark:border-white/10 dark:bg-white/10 dark:text-zinc-400"
          >
            ⌘ Space
          </kbd>
        </div>

        <div className="border-t border-zinc-900/10 dark:border-white/10" />

        {/* Results */}
        <ul
          id={`${uid}-results`}
          role="listbox"
          aria-label="Search results"
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {filtered.length === 0 && (
            <li className="flex flex-col items-center gap-1.5 py-8 text-center">
              <SearchX aria-hidden className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                No results for “{query}”
              </span>
            </li>
          )}
          {filtered.map((r, i) => {
            const { icon: Icon, className: iconClass } = resultIcons[r.icon];
            const showHeader = r.group !== groupCursor;
            groupCursor = r.group;
            const isActive = i === active;
            return (
              <React.Fragment key={r.id}>
                {showHeader && (
                  <li
                    aria-hidden
                    className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 first:pt-1 dark:text-zinc-500"
                  >
                    {r.group}
                  </li>
                )}
                <li
                  id={`${uid}-${r.id}`}
                  role="option"
                  aria-selected={isActive}
                  className="relative"
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => onSelect?.(r)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left focus-visible:outline-none active:scale-[0.99]"
                  >
                    {isActive && (
                      <motion.span
                        layoutId={`${uid}-highlight`}
                        transition={{ type: "spring", stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-sky-500/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] dark:bg-sky-500/80"
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md shadow-sm",
                        iconClass
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-xs font-medium",
                          isActive ? "text-white" : "text-zinc-800 dark:text-zinc-100"
                        )}
                      >
                        {r.label}
                      </span>
                      {r.hint && (
                        <span
                          className={cn(
                            "block truncate text-[10px]",
                            isActive ? "text-sky-100" : "text-zinc-500 dark:text-zinc-400"
                          )}
                        >
                          {r.hint}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <kbd
                        aria-hidden
                        className="relative shrink-0 rounded border border-white/30 bg-white/20 px-1 font-mono text-[9px] text-white"
                      >
                        ↩
                      </kbd>
                    )}
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Glass_05;
