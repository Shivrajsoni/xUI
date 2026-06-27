"use client";

import { use, useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Loader2 } from "lucide-react";
import { loadPlayground } from "@/lib/studio/playgrounds";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { CatalogEntry } from "@/lib/studio/types";
import StudioWorkspace, { type StudioEntry } from "@/components/studio/StudioWorkspace";

function importPathFor(entry: CatalogEntry): string {
  const p = entry.files[0]?.path ?? "";
  return p.replace(/^\/?src\/components\/xui\//, "").replace(/\.(tsx|ts)$/, "");
}

export default function SharedPlaygroundPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; entry: StudioEntry; propsValues: Record<string, unknown> }
  >({ status: "loading" });

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setState({ status: "error", message: "Sharing is not enabled on this deployment." });
      return;
    }
    (async () => {
      try {
        const record = await loadPlayground(id);
        if (!record) {
          setState({ status: "error", message: "Playground not found." });
          return;
        }
        const catalog = (await (await fetch("/r/registry.json")).json()) as CatalogEntry[];
        const entry = catalog.find((e) => e.name === record.component_name);
        if (!entry) {
          setState({ status: "error", message: "Component no longer exists." });
          return;
        }
        setState({
          status: "ready",
          entry: {
            name: entry.name,
            category: entry.category,
            title: entry.title,
            importPath: importPathFor(entry),
          },
          propsValues: record.props ?? {},
        });
      } catch (e) {
        setState({ status: "error", message: String((e as Error).message) });
      }
    })();
  }, [id]);

  if (state.status === "loading") {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading shared playground…</span>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-rose-500">{state.message}</p>
        <Link href="/studio" className="text-sm underline">
          Back to Studio
        </Link>
      </div>
    );
  }

  return <StudioWorkspace entry={state.entry} initialProps={state.propsValues} />;
}
