"use client";

import { useState } from "react";
import { Check, Copy, Save, Share2, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { savePlayground } from "@/lib/studio/playgrounds";
import { cn } from "@/lib/utils";

interface ExportBarProps {
  name: string;
  getCode: () => string;
  getProps: () => Record<string, unknown>;
}

type Flash = "" | "copied" | "cmd" | "saved" | "shared" | "error";

export default function ExportBar({ name, getCode, getProps }: ExportBarProps) {
  const [flash, setFlash] = useState<Flash>("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  const ping = (f: Flash) => {
    setFlash(f);
    setTimeout(() => setFlash(""), 2000);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(getCode());
    ping("copied");
  };

  const copyCmd = async () => {
    await navigator.clipboard.writeText(
      `npx shadcn@latest add ${siteConfig.url}/r/${name}.json`
    );
    ping("cmd");
  };

  const save = async (share: boolean) => {
    if (!configured) {
      ping("error");
      return;
    }
    setBusy(true);
    try {
      const id = await savePlayground({
        componentName: name,
        title: name,
        code: getCode(),
        props: getProps(),
        isPublic: share,
      });
      if (share) {
        await navigator.clipboard.writeText(
          `${window.location.origin}/studio/s/${id}`
        );
        ping("shared");
      } else {
        ping("saved");
      }
    } catch {
      ping("error");
    } finally {
      setBusy(false);
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyCode} className={btn}>
        {flash === "copied" ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {flash === "copied" ? "Copied" : "Copy code"}
      </button>

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
        onClick={() => save(false)}
        disabled={busy}
        className={btn}
        title={configured ? "Save to your account" : "Connect Supabase to save"}
      >
        {flash === "saved" ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Save className="h-3.5 w-3.5" />
        )}
        {flash === "saved" ? "Saved" : "Save"}
      </button>

      <button
        type="button"
        onClick={() => save(true)}
        disabled={busy}
        className={cn(
          btn,
          "border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
        )}
        title={configured ? "Share a public link" : "Connect Supabase to share"}
      >
        {flash === "shared" ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Share2 className="h-3.5 w-3.5" />
        )}
        {flash === "shared" ? "Link copied" : "Share"}
      </button>

      {flash === "error" && (
        <span className="text-xs text-rose-500">
          {configured ? "Sign in to save" : "Connect Supabase first"}
        </span>
      )}
    </div>
  );
}
