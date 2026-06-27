"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import { ArrowLeft, Loader2, SlidersHorizontal, Terminal as TerminalIcon } from "lucide-react";
import type { CatalogEntry, RegistryItem, SandboxBundle } from "@/lib/studio/types";
import { buildSandbox, buildAppSource } from "@/lib/studio/build-sandbox";
import { fetchInternalDeps, fetchRegistryItem } from "@/lib/studio/client";
import { getControls, defaultPropsFor } from "@/lib/studio/controls";
import ControlsPanel from "./ControlsPanel";
import ExportBar from "./ExportBar";
import AuthButton from "./AuthButton";

interface StudioWorkspaceProps {
  entry: Pick<CatalogEntry, "name" | "category" | "title">;
  /** Optional initial overrides (used by shared playgrounds). */
  initialCode?: string;
  initialProps?: Record<string, unknown>;
}

export default function StudioWorkspace({
  entry,
  initialCode,
  initialProps,
}: StudioWorkspaceProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [item, setItem] = useState<RegistryItem | null>(null);
  const [deps, setDeps] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setItem(null);
    setError(null);
    Promise.all([fetchRegistryItem(entry.name), fetchInternalDeps()])
      .then(([it, dp]) => {
        if (cancelled) return;
        if (initialCode) it.files[0] = { ...it.files[0], content: initialCode };
        setItem(it);
        setDeps(dp);
      })
      .catch((e) => !cancelled && setError(String(e?.message ?? e)));
    return () => {
      cancelled = true;
    };
  }, [entry.name, initialCode]);

  const initProps = useMemo(
    () => initialProps ?? defaultPropsFor(entry.name),
    [entry.name, initialProps]
  );

  const bundle: SandboxBundle | null = useMemo(() => {
    if (!item || !deps) return null;
    const assetBase =
      typeof window !== "undefined" ? window.location.origin : "";
    return buildSandbox(item, deps, { props: initProps, dark, assetBase });
  }, [item, deps, initProps, dark]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-rose-500">Failed to load component.</p>
        <p className="text-xs text-zinc-500">{error}</p>
        <Link href="/studio" className="text-sm underline">
          Back to Studio
        </Link>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading {entry.title}…</span>
      </div>
    );
  }

  return (
    <SandpackProvider
      key={`${entry.name}-${dark ? "dark" : "light"}`}
      template="react-ts"
      theme={dark ? "dark" : "light"}
      files={bundle.files}
      customSetup={{ dependencies: bundle.dependencies }}
      options={{
        activeFile: "/Component.tsx",
        visibleFiles: ["/Component.tsx"],
        recompileMode: "delayed",
        recompileDelay: 400,
      }}
    >
      <StudioInner entry={entry} dark={dark} initProps={initProps} />
    </SandpackProvider>
  );
}

function StudioInner({
  entry,
  dark,
  initProps,
}: {
  entry: StudioWorkspaceProps["entry"];
  dark: boolean;
  initProps: Record<string, unknown>;
}) {
  const { sandpack } = useSandpack();
  const controls = getControls(entry.name);
  const [props, setProps] = useState<Record<string, unknown>>(initProps);
  const [showControls, setShowControls] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  const onControlsChange = (next: Record<string, unknown>) => {
    setProps(next);
    sandpack.updateFile("/App.tsx", buildAppSource(next, dark));
  };

  const getCode = () => sandpack.files["/Component.tsx"]?.code ?? "";

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
          <ExportBar name={entry.name} getCode={getCode} getProps={() => props} />
          <AuthButton />
        </div>
      </div>

      {/* Body: editor | preview (+controls) */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="min-h-0 flex-1 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            style={{ height: "100%" }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1 bg-white dark:bg-zinc-950">
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: "100%" }}
            />
            {controls && (
              <button
                type="button"
                onClick={() => setShowControls((v) => !v)}
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-2.5 py-1.5 text-xs font-medium backdrop-blur"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showControls ? "Hide" : "Controls"}
              </button>
            )}
          </div>

          {controls && showControls && (
            <div className="max-h-[42%] overflow-y-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <ControlsPanel
                controls={controls}
                values={props}
                onChange={onControlsChange}
              />
            </div>
          )}

          <div className="shrink-0 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setShowConsole((v) => !v)}
              className="flex w-full items-center gap-2 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <TerminalIcon className="h-3.5 w-3.5" />
              Console
            </button>
            {showConsole && (
              <div className="h-32 border-t border-zinc-200 dark:border-zinc-800">
                <SandpackConsole style={{ height: "100%" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
