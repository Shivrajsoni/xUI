"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Copy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  preview: string;
  variables: string[];
  favorite?: boolean;
}

const defaultPrompts: PromptTemplate[] = [
  {
    id: "launch-email",
    title: "Launch email",
    category: "Marketing",
    preview:
      "Write a product launch email for {product} aimed at {audience}. Lead with the sharpest benefit…",
    variables: ["product", "audience"],
    favorite: true,
  },
  {
    id: "pr-review",
    title: "PR review pass",
    category: "Code",
    preview:
      "Review this {language} diff for correctness and naming. Flag anything that would fail in {environment}…",
    variables: ["language", "environment"],
  },
  {
    id: "summarize-call",
    title: "Summarize call",
    category: "Ops",
    preview:
      "Summarize this transcript into decisions, owners and deadlines. Keep it under {length} bullets…",
    variables: ["length"],
  },
  {
    id: "ad-variants",
    title: "Ad copy variants",
    category: "Marketing",
    preview:
      "Generate 5 ad headline variants for {product} in a {tone} voice. Max 40 characters each…",
    variables: ["product", "tone"],
  },
];

export interface Ai_04Props {
  prompts?: PromptTemplate[];
  onCopy?: (prompt: PromptTemplate) => void;
  onToggleFavorite?: (id: string, favorite: boolean) => void;
  className?: string;
}

const Ai_04 = ({
  prompts = defaultPrompts,
  onCopy,
  onToggleFavorite,
  className,
}: Ai_04Props) => {
  const [filter, setFilter] = useState<string>("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(prompts.filter((p) => p.favorite).map((p) => p.id))
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(prompts.map((p) => p.category)))],
    [prompts]
  );
  const visible = useMemo(
    () => prompts.filter((p) => filter === "All" || p.category === filter),
    [prompts, filter]
  );

  const handleCopy = (prompt: PromptTemplate) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(prompt.preview).catch(() => {});
    }
    onCopy?.(prompt);
    setCopied(prompt.id);
    window.setTimeout(() => setCopied((c) => (c === prompt.id ? null : c)), 1600);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      const nowFav = !next.has(id);
      if (nowFav) next.add(id);
      else next.delete(id);
      onToggleFavorite?.(id, nowFav);
      return next;
    });
  };

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter prompts by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-95",
              filter === cat
                ? "border-violet-600 bg-violet-600 text-white dark:border-violet-500 dark:bg-violet-500 dark:text-white"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div layout className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((prompt) => {
              const isFav = favorites.has(prompt.id);
              const isCopied = copied === prompt.id;
              return (
                <motion.article
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_10px_30px_-18px_rgba(24,24,27,0.25)] transition-shadow hover:shadow-[0_14px_40px_-18px_rgba(24,24,27,0.35)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      {prompt.category}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleFavorite(prompt.id)}
                        aria-label={
                          isFav
                            ? `Remove ${prompt.title} from favorites`
                            : `Add ${prompt.title} to favorites`
                        }
                        aria-pressed={isFav}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
                      >
                        <Star
                          aria-hidden
                          className={cn(
                            "h-3.5 w-3.5 transition-colors",
                            isFav && "fill-amber-400 text-amber-400"
                          )}
                        />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleCopy(prompt)}
                        aria-label={`Copy ${prompt.title} prompt`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isCopied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 28 }}
                            >
                              <Check aria-hidden className="h-3.5 w-3.5 text-emerald-500" />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 28 }}
                            >
                              <Copy aria-hidden className="h-3.5 w-3.5" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="mt-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {prompt.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {prompt.preview}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {prompt.variables.map((v) => (
                      <span
                        key={v}
                        className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-1.5 py-px font-mono text-[9px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                      >
                        {"{"}
                        {v}
                        {"}"}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default Ai_04;
