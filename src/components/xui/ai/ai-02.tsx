"use client";

import React, { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Search, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModelCapability = "vision" | "fast" | "reasoning";

export interface AiModel {
  id: string;
  name: string;
  provider: string;
  /** e.g. "200K" */
  context: string;
  capabilities: ModelCapability[];
  /** 1–5 */
  speed: number;
  /** 1–5 */
  quality: number;
}

const defaultModels: AiModel[] = [
  {
    id: "atlas-4-opus",
    name: "Atlas 4 Opus",
    provider: "Atlas Labs",
    context: "200K",
    capabilities: ["vision", "reasoning"],
    speed: 3,
    quality: 5,
  },
  {
    id: "atlas-4-swift",
    name: "Atlas 4 Swift",
    provider: "Atlas Labs",
    context: "200K",
    capabilities: ["vision", "fast"],
    speed: 5,
    quality: 3,
  },
  {
    id: "nova-2-pro",
    name: "Nova 2 Pro",
    provider: "Nova AI",
    context: "128K",
    capabilities: ["vision", "reasoning"],
    speed: 4,
    quality: 4,
  },
  {
    id: "nova-2-mini",
    name: "Nova 2 Mini",
    provider: "Nova AI",
    context: "64K",
    capabilities: ["fast"],
    speed: 5,
    quality: 2,
  },
  {
    id: "sable-r1",
    name: "Sable R1",
    provider: "Sable",
    context: "1M",
    capabilities: ["reasoning"],
    speed: 2,
    quality: 5,
  },
];

const capabilityMeta: Record<
  ModelCapability,
  { label: string; icon: typeof Eye; className: string }
> = {
  vision: {
    label: "Vision",
    icon: Eye,
    className:
      "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  fast: {
    label: "Fast",
    icon: Zap,
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  reasoning: {
    label: "Reasoning",
    icon: Sparkles,
    className:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
};

const DotMeter = ({ value, label }: { value: number; label: string }) => (
  <span
    role="img"
    aria-label={`${label}: ${value} out of 5`}
    className="flex items-center gap-1"
  >
    <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
      {label}
    </span>
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-1 w-1 rounded-full",
            i <= value
              ? "bg-zinc-700 dark:bg-zinc-300"
              : "bg-zinc-200 dark:bg-zinc-800"
          )}
        />
      ))}
    </span>
  </span>
);

export interface Ai_02Props {
  models?: AiModel[];
  defaultSelected?: string;
  onSelect?: (model: AiModel) => void;
  className?: string;
}

const Ai_02 = ({
  models = defaultModels,
  defaultSelected = "nova-2-pro",
  onSelect,
  className,
}: Ai_02Props) => {
  const [selected, setSelected] = useState(defaultSelected);
  const [query, setQuery] = useState("");
  const ringId = useId();
  const searchId = useId();

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = models.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q)
    );
    const byProvider = new Map<string, AiModel[]>();
    for (const m of filtered) {
      byProvider.set(m.provider, [...(byProvider.get(m.provider) ?? []), m]);
    }
    return [...byProvider.entries()];
  }, [models, query]);

  return (
    <div
      role="listbox"
      aria-label="Select a model"
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Search */}
      <div className="relative border-b border-zinc-100 dark:border-zinc-900">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
        />
        <input
          id={searchId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search models…"
          aria-label="Search models"
          className="h-10 w-full bg-transparent pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />
      </div>

      {/* Groups */}
      <div className="max-h-[380px] overflow-y-auto p-1.5">
        {groups.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
            No models match &ldquo;{query}&rdquo;
          </p>
        )}
        {groups.map(([provider, list]) => (
          <div key={provider} className="mb-1 last:mb-0">
            <p className="px-2.5 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              {provider}
            </p>
            {list.map((model) => {
              const isSelected = model.id === selected;
              return (
                <button
                  key={model.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelected(model.id);
                    onSelect?.(model);
                  }}
                  className={cn(
                    "relative flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.99]",
                    isSelected
                      ? "bg-zinc-50 dark:bg-zinc-900/70"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={ringId}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      aria-hidden
                      className="absolute inset-0 rounded-xl ring-1 ring-inset ring-sky-500/60 dark:ring-sky-400/50"
                    />
                  )}
                  <span className="relative min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {model.name}
                      </span>
                      <span className="shrink-0 font-mono text-[9px] tabular-nums text-zinc-400 dark:text-zinc-600">
                        {model.context} ctx
                      </span>
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-1">
                      {model.capabilities.map((cap) => {
                        const meta = capabilityMeta[cap];
                        const CapIcon = meta.icon;
                        return (
                          <span
                            key={cap}
                            className={cn(
                              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[9px] font-medium",
                              meta.className
                            )}
                          >
                            <CapIcon aria-hidden className="h-2.5 w-2.5" />
                            {meta.label}
                          </span>
                        );
                      })}
                    </span>
                    <span className="mt-1.5 flex items-center gap-3">
                      <DotMeter value={model.speed} label="Spd" />
                      <DotMeter value={model.quality} label="Qty" />
                    </span>
                  </span>
                  <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 28 }}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white"
                        >
                          <Check aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ai_02;
