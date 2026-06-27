import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { CatalogEntry } from "./types";

const CATALOG_PATH = path.join(process.cwd(), "public", "r", "registry.json");

let cache: CatalogEntry[] | null = null;

/** Load the static Studio catalog (public/r/registry.json). */
export async function loadCatalog(): Promise<CatalogEntry[]> {
  if (cache) return cache;
  const raw = await fs.readFile(CATALOG_PATH, "utf-8");
  const all = JSON.parse(raw) as CatalogEntry[];
  // Only editable components/blocks belong in Studio (skip lib/hook-only items).
  cache = all.filter(
    (e) => e.type === "registry:component" || e.type === "registry:block"
  );
  return cache;
}

/** Group catalog entries by category for the picker UI. */
export async function loadCatalogByCategory(): Promise<
  { category: string; items: CatalogEntry[] }[]
> {
  const items = await loadCatalog();
  const map = new Map<string, CatalogEntry[]>();
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category)!.push(item);
  }
  return [...map.entries()]
    .map(([category, items]) => ({ category, items }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/** Resolve a Studio slug (e.g. ["card","card-02"] or ["card-02"]) to an entry. */
export async function findEntryBySlug(
  slug: string[]
): Promise<CatalogEntry | undefined> {
  const items = await loadCatalog();
  const name = slug[slug.length - 1];
  return items.find((e) => e.name === name);
}

/** Import path under @/components/xui (no extension), e.g. "card/card-02". */
export function importPathFor(entry: CatalogEntry): string {
  const p = entry.files[0]?.path ?? "";
  return p
    .replace(/^\/?src\/components\/xui\//, "")
    .replace(/\.(tsx|ts)$/, "");
}
