import { Link } from "next-view-transitions";
import { ArrowUpRight, Box, SlidersHorizontal } from "lucide-react";
import Card06 from "@/components/xui/card/card-06";

export default function Showcase3D() {
  return (
    <section className="relative overflow-hidden border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40">
      {/* atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(139,92,246,0.16), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(244,63,94,0.12), transparent 70%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 backdrop-blur">
            <Box className="h-3 w-3 text-violet-500" />
            Interactive 3D
          </span>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Components with{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              real depth
            </span>
          </h2>
          <p className="mt-4 max-w-md text-pretty text-lg text-zinc-600 dark:text-zinc-400">
            Pure CSS 3D — no WebGL, no heavy dependencies. Move your cursor over
            the card. Every layer parallaxes, and it ships as copy-paste source
            you can tweak live in Studio.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/studio/card/card-06"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-900"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Customize in Studio
            </Link>
            <Link
              href="/docs/components/card"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-white dark:hover:bg-zinc-900"
            >
              View docs
              <ArrowUpRight className="h-4 w-4" />
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
