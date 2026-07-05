"use client";

import React, { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  FileText,
  Home,
  Moon,
  Plus,
  Search,
  Settings,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CommandItem = {
  icon: React.ElementType;
  label: string;
  shortcut?: string[];
  group: string;
};

const ITEMS: CommandItem[] = [
  { icon: Home, label: "Go to Dashboard", shortcut: ["G", "D"], group: "Pages" },
  { icon: FileText, label: "Go to Documents", shortcut: ["G", "O"], group: "Pages" },
  { icon: CreditCard, label: "Go to Billing", shortcut: ["G", "B"], group: "Pages" },
  { icon: Settings, label: "Go to Settings", shortcut: ["G", "S"], group: "Pages" },
  { icon: Plus, label: "Create new project", shortcut: ["⌘", "N"], group: "Actions" },
  { icon: UserPlus, label: "Invite teammate", shortcut: ["⌘", "I"], group: "Actions" },
  { icon: Moon, label: "Toggle dark mode", group: "Actions" },
];

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="flex h-5 min-w-5 items-center justify-center rounded border border-zinc-200 bg-zinc-50 px-1 font-mono text-[10px] font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
    {children}
  </kbd>
);

const Nav_05 = ({
  items = ITEMS,
  placeholder = "Type a command or search…",
  onSelect,
  className,
}: {
  items?: CommandItem[];
  placeholder?: string;
  onSelect?: (item: CommandItem) => void;
  className?: string;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(1);
  const layoutId = useId();

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [items, query]
  );

  const groups = useMemo(() => {
    const order: string[] = [];
    for (const item of filtered) {
      if (!order.includes(item.group)) order.push(item.group);
    }
    return order.map((group) => ({
      group,
      items: filtered.filter((i) => i.group === group),
    }));
  }, [filtered]);

  const clampedSelected = Math.min(selected, filtered.length - 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (Math.min(s, filtered.length - 1) + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(
        (s) =>
          (Math.min(s, filtered.length - 1) - 1 + filtered.length) %
          filtered.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[clampedSelected];
      if (item) onSelect?.(item);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_70px_-24px_rgba(24,24,27,0.4)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.85)]",
        className
      )}
    >
      {/* Search row */}
      <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3 dark:border-white/[0.06]">
        <Search
          aria-hidden
          className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          placeholder={placeholder}
          aria-label="Search commands"
          className="w-full min-w-0 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />
        <Kbd>⌘K</Kbd>
      </div>

      {/* Results */}
      <div
        role="listbox"
        aria-label="Commands"
        className="max-h-72 overflow-y-auto px-2 py-2"
      >
        {groups.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
        {groups.map(({ group, items: groupItems }) => (
          <div key={group} className="mb-1 last:mb-0">
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
              {group}
            </p>
            {groupItems.map((item) => {
              const index = filtered.indexOf(item);
              const isSelected = index === clampedSelected;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => {
                    setSelected(index);
                    onSelect?.(item);
                  }}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.99]",
                    isSelected
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={layoutId}
                      aria-hidden
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-white/[0.07]"
                    />
                  )}
                  <item.icon
                    aria-hidden
                    className={cn(
                      "relative z-10 h-4 w-4 shrink-0",
                      isSelected
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    )}
                  />
                  <span className="relative z-10 min-w-0 flex-1 truncate font-medium">
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span className="relative z-10 hidden gap-1 sm:flex">
                      {item.shortcut.map((key) => (
                        <Kbd key={key}>{key}</Kbd>
                      ))}
                    </span>
                  )}
                  {isSelected && (
                    <ArrowRight
                      aria-hidden
                      className="relative z-10 h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-100 bg-zinc-50/70 px-4 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          select
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          <Kbd>↵</Kbd>
          open
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          <Kbd>esc</Kbd>
          close
        </span>
      </div>
    </div>
  );
};

export default Nav_05;
