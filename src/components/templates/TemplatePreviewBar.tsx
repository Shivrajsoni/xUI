"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { ArrowLeft, Check, Copy } from "lucide-react";

export default function TemplatePreviewBar({
  title,
  source,
}: {
  title: string;
  source: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-4 py-2.5 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link
          href="/#templates"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Templates
        </Link>
        <span className="text-zinc-300 dark:text-zinc-700">/</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy code"}
      </button>
    </div>
  );
}
