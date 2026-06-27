import { Link } from "next-view-transitions";
import { ArrowUpRight, LayoutTemplate } from "lucide-react";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

export default function Templates() {
  return (
    <section id="templates" className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
          <LayoutTemplate className="h-3 w-3 text-fuchsia-500" />
          Templates
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Start from a template
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Full-page layouts built from xUI components. Preview, copy the source,
          and make it yours.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div
            key={t.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-black/40"
          >
            {/* Full-card click target. Kept as a sibling (not an ancestor) of the
                preview so the template's own <a> tags don't nest inside an <a>. */}
            <Link
              href={`/templates/${t.slug}`}
              aria-label={`Preview ${t.title} template`}
              className="absolute inset-0 z-10"
            />

            {/* Scaled, non-interactive live preview */}
            <div
              className={cn(
                "relative h-52 overflow-hidden border-b border-zinc-100 dark:border-zinc-800",
                t.dark ? "bg-zinc-950" : "bg-zinc-50 dark:bg-zinc-900"
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 origin-top-left"
                style={{ width: "250%", height: "250%", transform: "scale(0.4)" }}
              >
                <TemplateRenderer slug={t.slug} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/30" />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{t.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{t.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
