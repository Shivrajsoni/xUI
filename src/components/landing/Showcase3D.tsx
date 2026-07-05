import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import Card06 from "@/components/xui/card/card-06";

const facts = [
  { label: "Renderer", value: "Pure CSS 3D" },
  { label: "Dependencies", value: "None" },
  { label: "Delivery", value: "Copy-paste source" },
];

export default function Showcase3D() {
  return (
    <section className="border-t border-zinc-200/70 bg-zinc-50/60 dark:border-zinc-800/70 dark:bg-zinc-950/50">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Components with{" "}
            <span className="font-display italic font-normal text-zinc-500 dark:text-zinc-400">
              real depth
            </span>
            .
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
            Move your cursor over the card — every layer parallaxes in pure
            CSS. No WebGL, no heavy dependencies, and the whole thing ships as
            source you can read in one sitting.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-200/80 dark:border-zinc-800/80 dark:bg-zinc-800/80">
            {facts.map((f) => (
              <div
                key={f.label}
                className="bg-white px-4 py-3 dark:bg-zinc-950"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                  {f.label}
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Link
              href="/docs/components/card"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                Get the source
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card06 />
        </div>
      </div>
    </section>
  );
}
