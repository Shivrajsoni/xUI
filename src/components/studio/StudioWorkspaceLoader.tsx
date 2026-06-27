"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { CatalogEntry } from "@/lib/studio/types";

// Sandpack is heavy and browser-only — load it lazily, client-side only, so it
// never touches the main bundle or SSR.
const StudioWorkspace = dynamic(() => import("./StudioWorkspace"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center gap-2 text-zinc-500">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">Loading editor…</span>
    </div>
  ),
});

export default function StudioWorkspaceLoader({
  entry,
  initialCode,
  initialProps,
}: {
  entry: Pick<CatalogEntry, "name" | "category" | "title">;
  initialCode?: string;
  initialProps?: Record<string, unknown>;
}) {
  return (
    <StudioWorkspace
      entry={entry}
      initialCode={initialCode}
      initialProps={initialProps}
    />
  );
}
