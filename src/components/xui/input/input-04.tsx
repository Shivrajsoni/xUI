"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Input04Props = {
  title?: string;
  description?: string;
  initialTags?: string[];
  suggestions?: string[];
  /** Maximum number of tags. */
  maxTags?: number;
  /** Called whenever the tag list changes. */
  onTagsChange?: (tags: string[]) => void;
  className?: string;
};

const Input_04 = ({
  title = "Topics",
  description = "Tag your post so the right readers find it.",
  initialTags = ["design-systems", "react", "motion"],
  suggestions = ["typescript", "tailwind", "a11y", "next-js"],
  maxTags = 5,
  onTagsChange,
  className,
}: Input04Props) => {
  const [tags, setTags] = useState<string[]>(initialTags.slice(0, maxTags));
  const [value, setValue] = useState("");
  const [overLimit, setOverLimit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const atLimit = tags.length >= maxTags;

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, "-");
    if (!tag) return;
    if (atLimit) {
      setOverLimit(true);
      window.setTimeout(() => setOverLimit(false), 450);
      return;
    }
    if (!tags.includes(tag)) {
      const next = [...tags, tag];
      setTags(next);
      onTagsChange?.(next);
    }
    setValue("");
  };

  const removeTag = (tag: string) => {
    const next = tags.filter((t) => t !== tag);
    setTags(next);
    onTagsChange?.(next);
  };

  const quickAdds = suggestions.filter((s) => !tags.includes(s)).slice(0, 4);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span
          className={cn(
            "font-mono text-[11px] tabular-nums tracking-[0.15em] transition-colors duration-200",
            atLimit
              ? "text-amber-600 dark:text-amber-400"
              : "text-zinc-400 dark:text-zinc-600"
          )}
        >
          {tags.length}/{maxTags}
        </span>
      </div>
      <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">
        {description}
      </p>

      <motion.div
        animate={overLimit ? { x: [0, -7, 7, -5, 5, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "mt-4 flex min-h-[52px] cursor-text flex-wrap items-center gap-1.5 rounded-xl border bg-zinc-50/60 px-3 py-2 transition-colors duration-200",
          "focus-within:border-sky-500/60 focus-within:ring-2 focus-within:ring-sky-500/20 dark:focus-within:border-sky-400/50 dark:focus-within:ring-sky-400/20",
          overLimit
            ? "border-amber-500/60 ring-2 ring-amber-500/20"
            : "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50"
        )}
      >
        <AnimatePresence initial={false}>
          {tags.map((tag) => (
            <motion.span
              key={tag}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center gap-1 rounded-lg border border-sky-500/20 bg-sky-500/10 py-1 pl-2 pr-1 text-[12px] font-medium text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
            >
              <Hash className="h-3 w-3 opacity-60" aria-hidden />
              {tag}
              <button
                type="button"
                aria-label={`Remove tag ${tag}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="rounded-md p-0.5 transition-colors duration-200 hover:bg-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(value);
            } else if (e.key === "Backspace" && !value && tags.length) {
              removeTag(tags[tags.length - 1]);
            }
          }}
          placeholder={atLimit ? "Limit reached" : "Add a tag, press Enter"}
          aria-label="Add a tag"
          className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />
      </motion.div>

      <div className="mt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          Suggested
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <AnimatePresence initial={false}>
            {quickAdds.map((s) => (
              <motion.button
                key={s}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                onClick={() => addTag(s)}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[12px] text-zinc-600 transition-colors duration-200 hover:border-sky-500/40 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-sky-400/40 dark:hover:text-sky-300"
              >
                <Plus className="h-3 w-3" aria-hidden />
                {s}
              </motion.button>
            ))}
          </AnimatePresence>
          {!quickAdds.length && (
            <span className="text-[12px] text-zinc-400 dark:text-zinc-600">
              All suggestions added
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input_04;
