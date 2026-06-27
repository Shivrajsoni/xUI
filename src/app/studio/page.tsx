import { Link } from "next-view-transitions";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { loadCatalogByCategory } from "@/lib/studio/catalog";
import { controlsRegistry } from "@/lib/studio/controls";

export default async function StudioHome() {
  const groups = await loadCatalogByCategory();
  const customizable = new Set(Object.keys(controlsRegistry));

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Studio
          </h1>
          <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
            Open any component in a live editor — tweak it with controls, edit
            the code, and export it ready for your project. No setup, no
            dependency headaches.
          </p>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.category}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-zinc-500">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={`/studio/${item.category}/${item.name}`}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 px-4 py-3 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
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
