"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { ArrowLeft, Check, Copy, Monitor, Smartphone, Tablet, Moon, Sun } from "lucide-react";
import TemplateRenderer from "./TemplateRenderer";
import { cn } from "@/lib/utils";

type Viewport = "desktop" | "tablet" | "mobile";

const WIDTHS: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

export default function TemplateStudio({
  slug,
  title,
  source,
}: {
  slug: string;
  title: string;
  source: string;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vpBtn = (v: Viewport, Icon: typeof Monitor, label: string) => (
    <button
      type="button"
      onClick={() => setViewport(v)}
      aria-label={label}
      className={cn(
        "rounded-md p-1.5 transition-colors",
        viewport === v
          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
          : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="flex h-screen flex-col bg-zinc-100 dark:bg-zinc-900">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link href="/templates" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ArrowLeft className="h-4 w-4" />
            Templates
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
            {vpBtn("desktop", Monitor, "Desktop")}
            {vpBtn("tablet", Tablet, "Tablet")}
            {vpBtn("mobile", Smartphone, "Mobile")}
          </div>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      </div>

      {/* Framed, themeable preview */}
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div
          className={cn(
            "mx-auto h-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white shadow-sm transition-[max-width] duration-300",
            dark && "dark"
          )}
          style={{ maxWidth: WIDTHS[viewport] }}
        >
          <div className="h-full overflow-auto">
            <TemplateRenderer slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
