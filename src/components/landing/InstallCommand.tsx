"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallCommandProps {
  command?: string;
  className?: string;
}

export default function InstallCommand({
  command = "npx shadcn@latest add @xui/card-02",
  className,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy install command"
      className={cn(
        "group inline-flex w-full max-w-md items-center justify-between gap-3",
        "rounded-xl border border-zinc-200 dark:border-zinc-800",
        "bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-sm",
        "px-4 py-3 font-mono text-xs sm:text-sm text-left",
        "transition-colors hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
    >
      <span className="flex items-center gap-2 truncate text-zinc-700 dark:text-zinc-300">
        <span className="select-none text-zinc-400 dark:text-zinc-600">$</span>
        <span className="truncate">{command}</span>
      </span>
      <span className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}
