import type { RegistryItem } from "./types";

// Client-side loaders for the static registry assets. These are CDN-cacheable
// JSON files in /public/r, so fetching them is fast and costs nothing.

export async function fetchRegistryItem(name: string): Promise<RegistryItem> {
  const res = await fetch(`/r/${name}.json`);
  if (!res.ok) throw new Error(`Failed to load component "${name}"`);
  return res.json();
}

let depsCache: Record<string, string> | null = null;

export async function fetchInternalDeps(): Promise<Record<string, string>> {
  if (depsCache) return depsCache;
  const res = await fetch(`/r/_deps.json`);
  if (!res.ok) throw new Error("Failed to load internal deps");
  depsCache = await res.json();
  return depsCache!;
}
