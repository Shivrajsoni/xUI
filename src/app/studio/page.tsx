import { Link } from "next-view-transitions";
import { ArrowRight, SlidersHorizontal, Wand2 } from "lucide-react";
import { loadCatalog, loadCatalogByCategory } from "@/lib/studio/catalog";
import { controlsRegistry } from "@/lib/studio/controls";

export default async function StudioHome() {
  const groups = await loadCatalogByCategory();
  const all = await loadCatalog();
  const customizable = new Set(Object.keys(controlsRegistry));
  const customizableCount = all.filter((c) => customizable.has(c.name)).length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <Wand2 className="h-3 w-3 text-violet-500" />
            Live component editor
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Studio
          </h1>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Open any component, tweak its text, colors, and size with live
            controls, then copy production-ready code. Instant preview — no setup,
            no dependency headaches.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
            <span>{all.length} components</span>
            <span className="inline-flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-500" />
              {customizableCount} with live controls
            </span>
          </div>
        </div>

        {/* Grouped grid */}
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.category}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={`/studio/${item.category}/${item.name}`}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </span>
                      {customizable.has(item.name) && (
                        <SlidersHorizontal
                          className="h-3.5 w-3.5 text-emerald-500"
                          aria-label="Has live controls"
                        />
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
