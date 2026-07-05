"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Person = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type FilterChip = { id: string; label: string };

const defaultPeople: Person[] = [
  { id: "p1", name: "Alex Rivera", email: "alex@acme.co", avatar: "/avatars/avatar-01.svg" },
  { id: "p2", name: "Sam Chen", email: "sam@acme.co", avatar: "/avatars/avatar-02.svg" },
  { id: "p3", name: "Maya Patel", email: "maya@acme.co", avatar: "/avatars/avatar-03.svg" },
  { id: "p4", name: "Jordan Blake", email: "jordan@acme.co", avatar: "/avatars/avatar-04.svg" },
  { id: "p5", name: "Priya Sharma", email: "priya@acme.co", avatar: "/avatars/avatar-01.svg" },
  { id: "p6", name: "Marcus Webb", email: "marcus@acme.co", avatar: "/avatars/avatar-02.svg" },
];

const defaultChips: FilterChip[] = [
  { id: "c1", label: "status: active" },
  { id: "c2", label: "role: admin" },
];

export type Input03Props = {
  /** Directory searched as the user types. */
  people?: Person[];
  /** Filter chips shown on first render. */
  initialFilters?: FilterChip[];
  /** Called when a person is picked from the results. */
  onSelect?: (person: Person) => void;
  className?: string;
};

const Input_03 = ({
  people = defaultPeople,
  initialFilters = defaultChips,
  onSelect,
  className,
}: Input03Props) => {
  const [chips, setChips] = useState<FilterChip[]>(initialFilters);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return people
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
      )
      .slice(0, 3);
  }, [query, people]);

  const open = focused && query.trim().length > 0;

  const removeChip = (id: string) =>
    setChips((prev) => prev.filter((c) => c.id !== id));

  const selectPerson = (person: Person) => {
    setChips((prev) =>
      prev.some((c) => c.label === `person: ${person.name}`)
        ? prev
        : [...prev, { id: `person-${person.id}`, label: `person: ${person.name}` }]
    );
    setQuery("");
    inputRef.current?.focus();
    onSelect?.(person);
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-2xl border bg-white px-3 py-2.5 transition-all duration-200",
          "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
          focused
            ? "border-indigo-500/60 ring-2 ring-indigo-500/20 dark:border-indigo-400/50 dark:ring-indigo-400/20"
            : "border-zinc-200 dark:border-zinc-800"
        )}
      >
        <Search
          className={cn(
            "h-4 w-4 shrink-0 transition-colors duration-200",
            focused ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-400"
          )}
          aria-hidden
        />
        <AnimatePresence initial={false}>
          {chips.map((chip) => (
            <motion.span
              key={chip.id}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center gap-1 rounded-md border border-indigo-500/20 bg-indigo-500/10 py-0.5 pl-2 pr-1 font-mono text-[11px] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {chip.label}
              <button
                type="button"
                aria-label={`Remove filter ${chip.label}`}
                onClick={() => removeChip(chip.id)}
                className="rounded-sm p-0.5 transition-colors duration-200 hover:bg-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !query && chips.length) {
              removeChip(chips[chips.length - 1].id);
            } else if (e.key === "Enter" && results.length) {
              e.preventDefault();
              selectPerson(results[0]);
            } else if (e.key === "Escape") {
              setQuery("");
            }
          }}
          placeholder={chips.length ? "Add people…" : "Search people…"}
          aria-label="Search people"
          className="min-w-[110px] flex-1 bg-transparent py-0.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_24px_60px_-24px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {results.length ? (
              <ul>
                {results.map((person) => (
                  <li key={person.id}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectPerson(person)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900"
                    >
                      <img
                        src={person.avatar}
                        alt=""
                        className="h-8 w-8 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                          {person.name}
                        </span>
                        <span className="block truncate text-xs text-zinc-400 dark:text-zinc-500">
                          {person.email}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-4 text-center text-[13px] text-zinc-400 dark:text-zinc-500">
                No matches for &ldquo;{query.trim()}&rdquo;
              </p>
            )}
            <div className="flex items-center justify-between border-t border-zinc-100 px-3 py-2 dark:border-zinc-900">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                {results.length} result{results.length === 1 ? "" : "s"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">
                ↵ to add
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input_03;
