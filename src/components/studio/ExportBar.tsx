"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { fetchRegistryItem } from "@/lib/studio/client";

interface ExportBarProps {
  name: string;
}

type Flash = "" | "copied" | "cmd" | "error";

export default function ExportBar({ name }: ExportBarProps) {
  const [flash, setFlash] = useState<Flash>("");

  const ping = (f: Flash) => {
    setFlash(f);
    setTimeout(() => setFlash(""), 2000);
  };

  const copyCode = async () => {
    try {
      const item = await fetchRegistryItem(name);
      await navigator.clipboard.writeText(item.files[0]?.content ?? "");
      ping("copied");
    } catch {
      ping("error");
    }
  };

  const copyCmd = async () => {
    await navigator.clipboard.writeText(`npx shadcn@latest add @xui/${name}`);
    ping("cmd");
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyCmd} className={btn}>
        {flash === "cmd" ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Terminal className="h-3.5 w-3.5" />
        )}
        {flash === "cmd" ? "Copied" : "shadcn add"}
      </button>

      <button
        type="button"
        onClick={copyCode}
        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
      >
        {flash === "copied" ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {flash === "copied" ? "Copied!" : "Copy code"}
      </button>

      {flash === "error" && (
        <span className="text-xs text-rose-500">Couldn&apos;t copy — try again</span>
      )}
    </div>
  );
}
