"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ChevronDown,
  Globe,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const defaultModels = ["gpt-4o", "claude-4.5", "gemini-2.5"];

const defaultSuggestions = [
  "Build a pricing page",
  "Explain this SQL query",
  "Refactor to server components",
  "Write release notes",
];

export type Chat03Props = {
  placeholder?: string;
  /** Models cycled by the model chip. */
  models?: string[];
  /** Suggestion chips below the prompt box. Pass [] to hide. */
  suggestions?: string[];
  /** Called with the trimmed prompt and current options on send. */
  onSend?: (
    prompt: string,
    options: { model: string; webSearch: boolean }
  ) => void;
  className?: string;
};

const Chat_03 = ({
  placeholder = "Ask anything — I'll draft, code, or explain…",
  models = defaultModels,
  suggestions = defaultSuggestions,
  onSend,
  className,
}: Chat03Props) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0;

  function send() {
    if (!canSend) return;
    onSend?.(value.trim(), {
      model: models[modelIndex % models.length] ?? "",
      webSearch,
    });
    setValue("");
  }

  return (
    <div className={cn("w-full max-w-xl", className)}>
      {/* Prompt box */}
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 0 1px rgba(56,189,248,0.4), 0 0 40px -8px rgba(56,189,248,0.35), 0 16px 50px -24px rgba(24,24,27,0.25)"
            : "0 0 0 1px rgba(0,0,0,0), 0 0 0px 0px rgba(56,189,248,0), 0 16px 50px -24px rgba(24,24,27,0.25)",
        }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          aria-label="Prompt"
          className="w-full resize-none bg-transparent px-4 pt-4 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 pb-3">
          <button
            type="button"
            aria-label={`Model: ${models[modelIndex]} — click to switch`}
            onClick={() => setModelIndex((i) => (i + 1) % models.length)}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[11px] text-zinc-600 transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Sparkles className="h-3 w-3 text-sky-500" aria-hidden />
            {models[modelIndex % models.length]}
            <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Attach file"
            className="rounded-full border border-transparent p-2 text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Toggle web search"
            aria-pressed={webSearch}
            onClick={() => setWebSearch((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
              webSearch
                ? "border-sky-400/50 bg-sky-500/10 text-sky-600 dark:border-sky-500/40 dark:text-sky-400"
                : "border-transparent text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            )}
          >
            <Globe className="h-3.5 w-3.5" aria-hidden />
            Search
          </button>

          <div className="flex-1" />

          <motion.button
            type="button"
            aria-label="Send prompt"
            disabled={!canSend}
            whileTap={canSend ? { scale: 0.88 } : undefined}
            onClick={send}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
              canSend
                ? "bg-sky-600 text-white shadow-[0_6px_18px_-6px_rgba(2,132,199,0.55)] hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
                : "cursor-not-allowed bg-zinc-100 text-zinc-300 dark:bg-zinc-900 dark:text-zinc-700"
            )}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s, i) => (
          <motion.button
            key={s}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              delay: 0.08 * i,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setValue(s);
              textareaRef.current?.focus();
            }}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] text-zinc-500 transition-colors duration-200 hover:border-sky-400/50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-sky-500/40 dark:hover:text-sky-400"
          >
            {s}
          </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat_03;
