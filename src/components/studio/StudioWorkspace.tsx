"use client";

import { useMemo, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { Link } from "next-view-transitions";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import type { CatalogEntry } from "@/lib/studio/types";
import { getControls, defaultPropsFor } from "@/lib/studio/controls";
import ControlsPanel, { type CanvasBg } from "./ControlsPanel";
import ExportBar from "./ExportBar";
import AuthButton from "./AuthButton";
import { cn } from "@/lib/utils";

export interface StudioEntry
  extends Pick<CatalogEntry, "name" | "category" | "title"> {
  /** Import path under @/components/xui (no extension), e.g. "card/card-02". */
  importPath: string;
}

const CANVAS_CLASSES: Record<CanvasBg, string> = {
  light: "bg-white",
  subtle: "bg-zinc-50 dark:bg-zinc-900",
  dark: "bg-zinc-950",
  dots: "bg-white dark:bg-zinc-950 [background-image:radial-gradient(theme(colors.zinc.300)_1px,transparent_1px)] dark:[background-image:radial-gradient(theme(colors.zinc.700)_1px,transparent_1px)] [background-size:16px_16px]",
  gradient:
    "bg-gradient-to-br from-violet-100 via-fuchsia-50 to-rose-100 dark:from-violet-950/40 dark:via-zinc-950 dark:to-rose-950/40",
};

export default function StudioWorkspace({
  entry,
  initialProps,
}: {
  entry: StudioEntry;
  initialProps?: Record<string, unknown>;
}) {
  const controls = getControls(entry.name);
  const [props, setProps] = useState<Record<string, unknown>>(
    () => initialProps ?? defaultPropsFor(entry.name)
  );
  const [canvasBg, setCanvasBg] = useState<CanvasBg>("subtle");

  // Render the REAL component live in-app — instant, free, pixel-perfect.
  const LiveComponent = useMemo<ComponentType<Record<string, unknown>>>(
    () =>
      dynamic(
        () =>
          import(`@/components/xui/${entry.importPath}`).then(
            (m) => m.default ?? m
          ),
        {
          ssr: false,
          loading: () => (
            <div className="flex items-center gap-2 text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading preview…</span>
            </div>
          ),
        }
      ),
    [entry.importPath]
  );

  const reset = () => {
    setProps(defaultPropsFor(entry.name));
    setCanvasBg("subtle");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Studio
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {entry.title}
          </span>
          <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {entry.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ExportBar name={entry.name} getProps={() => props} />
          <AuthButton />
        </div>
      </div>

      {/* Body: live preview | controls */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Preview canvas */}
        <div
          className={cn(
            "relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-8 transition-colors",
            CANVAS_CLASSES[canvasBg]
          )}
        >
          <LiveComponent {...props} />
        </div>

        {/* Controls card */}
        <aside className="w-full shrink-0 overflow-y-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 lg:w-[340px] lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between px-5 pt-5">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Customize
            </h2>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
          <ControlsPanel
            controls={controls}
            values={props}
            onChange={setProps}
            canvasBg={canvasBg}
            onCanvasBgChange={setCanvasBg}
          />
        </aside>
      </div>
    </div>
  );
}
