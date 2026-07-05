"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, ChevronDown, Github, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Header_03Props {
  brand?: string;
  tabs?: string[];
  versions?: string[];
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
  onVersionChange?: (version: string) => void;
  onGithubClick?: () => void;
  className?: string;
}

const Header_03 = ({
  brand = "Fielddocs",
  tabs = ["Docs", "API", "Guides"],
  versions = ["v3.2", "v3.1", "v2.x"],
  onTabChange,
  onSearch,
  onVersionChange,
  onGithubClick,
  className,
}: Header_03Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0] ?? "Docs");
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(versions[0] ?? "v3.2");
  const [versionOpen, setVersionOpen] = useState(false);
  const underlineId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const versionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setVersionOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!versionOpen) return;
    const onClick = (e: MouseEvent) => {
      if (versionRef.current && !versionRef.current.contains(e.target as Node)) {
        setVersionOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [versionOpen]);

  return (
    <div
      className={cn(
        "w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        {/* Top row */}
        <div className="flex h-13 items-center gap-2 px-4 py-2.5">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex shrink-0 items-center gap-2 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-600 text-white dark:bg-sky-500"
            >
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 sm:block dark:text-zinc-100">
              {brand}
            </span>
          </a>

          {/* Search */}
          <div className="group relative mx-2 min-w-0 flex-1 sm:mx-4 sm:max-w-xs">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-sky-500 dark:text-zinc-500"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) onSearch?.(query.trim());
              }}
              placeholder="Search docs…"
              aria-label="Search documentation"
              className="h-8 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-8 pr-12 text-sm text-zinc-900 placeholder:text-zinc-400 transition-[box-shadow,border-color,background-color] duration-200 hover:border-zinc-300 focus:border-sky-500/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:hover:border-zinc-700 dark:focus:border-sky-500/50 dark:focus:bg-zinc-950 dark:focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
            />
            <kbd
              aria-hidden
              className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500"
            >
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {/* Version chip */}
            <div ref={versionRef} className="relative">
              <button
                type="button"
                aria-expanded={versionOpen}
                aria-haspopup="listbox"
                aria-label={`Version ${version}`}
                onClick={() => setVersionOpen((v) => !v)}
                className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
              >
                {version}
                <ChevronDown
                  aria-hidden
                  className={cn("h-3 w-3 transition-transform duration-200", versionOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {versionOpen && (
                  <motion.ul
                    role="listbox"
                    aria-label="Select version"
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute right-0 top-full z-20 mt-1.5 w-28 origin-top-right rounded-lg border border-zinc-200 bg-white p-1 shadow-[0_12px_32px_-12px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)]"
                  >
                    {versions.map((v) => (
                      <li key={v}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={v === version}
                          onClick={() => {
                            setVersion(v);
                            setVersionOpen(false);
                            onVersionChange?.(v);
                          }}
                          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 font-mono text-xs text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        >
                          {v}
                          {v === version && (
                            <Check aria-hidden className="h-3 w-3 text-sky-500" />
                          )}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="View repository on GitHub"
              onClick={() => onGithubClick?.()}
              className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <Github aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <nav aria-label="Documentation sections" className="flex gap-1 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={activeTab === tab ? "page" : undefined}
              onClick={() => {
                setActiveTab(tab);
                onTabChange?.(tab);
              }}
              className={cn(
                "relative rounded-t-md px-3 pb-2.5 pt-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]",
                activeTab === tab
                  ? "font-medium text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.span
                  layoutId={underlineId}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-sky-500"
                />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Faux page strip */}
      <div aria-hidden className="flex gap-6 bg-zinc-50/60 px-6 py-6 dark:bg-zinc-900/30">
        <div className="hidden w-28 shrink-0 space-y-2.5 sm:block">
          <div className="h-2.5 w-full rounded bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-2.5 w-4/5 rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
          <div className="h-2.5 w-full rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
          <div className="h-2.5 w-3/5 rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-1/2 max-w-52 rounded bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-3 w-full rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
          <div className="h-3 w-5/6 rounded bg-zinc-200/60 dark:bg-zinc-800/70" />
          <div className="h-12 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
};

export default Header_03;
