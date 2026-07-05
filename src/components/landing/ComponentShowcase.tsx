import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import Chat_01 from "@/components/xui/chat/chat-01";
import Payment_01 from "@/components/xui/payment/payment-01";
import Stat_02 from "@/components/xui/stat/stat-02";
import Input_01 from "@/components/xui/input/input-01";
import Nav_04 from "@/components/xui/nav/nav-04";
import Card_05 from "@/components/xui/card/card-05";

/* Crosshair tick rendered at each tile corner — quiet blueprint chrome. */
function CornerTick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-2.5 w-2.5 text-zinc-300 transition-colors duration-300 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400",
        className
      )}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

function ShowcaseTile({
  title,
  href,
  className,
  children,
}: {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-zinc-200/80 bg-white transition-colors duration-300 hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700",
        className
      )}
    >
      <CornerTick className="-left-[5px] -top-[5px]" />
      <CornerTick className="-right-[5px] -top-[5px]" />
      <CornerTick className="-bottom-[5px] -left-[5px]" />
      <CornerTick className="-bottom-[5px] -right-[5px]" />

      <div className="flex items-center justify-between px-4 pt-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
          {title}
        </span>
        <Link
          href={href}
          aria-label={`View ${title} components`}
          className="text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-zinc-600 dark:text-zinc-700 dark:hover:text-zinc-300"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden p-5 pt-4 sm:p-6 [&>*]:min-w-0 [&>*]:max-w-full">
        {children}
      </div>
    </div>
  );
}

export default function ComponentShowcase() {
  return (
    <section className="border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        {/* Editorial section header */}
        <div className="mb-14">
          <h2 className="max-w-md text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Live, not screenshots.{" "}
            <span className="font-display italic font-normal text-zinc-500 dark:text-zinc-400">
              Try them here.
            </span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ShowcaseTile
            title="AI Chat"
            href="/docs/components/chat"
            className="lg:row-span-2"
          >
            <Chat_01 />
          </ShowcaseTile>
          <ShowcaseTile title="Payment" href="/docs/components/payment">
            <Payment_01 />
          </ShowcaseTile>
          <ShowcaseTile title="Stats" href="/docs/components/stat">
            <Stat_02 />
          </ShowcaseTile>
          <ShowcaseTile title="Inputs" href="/docs/components/input">
            <Input_01 />
          </ShowcaseTile>
          <ShowcaseTile title="Navigation" href="/docs/components/nav">
            <div className="flex w-full justify-center py-8">
              <Nav_04 />
            </div>
          </ShowcaseTile>
        </div>

        {/* Wide text-reveal tile */}
        <div className="group relative mt-6 rounded-xl border border-zinc-200/80 transition-colors duration-300 hover:border-zinc-300 dark:border-zinc-800/80 dark:hover:border-zinc-700">
          <CornerTick className="-left-[5px] -top-[5px]" />
          <CornerTick className="-right-[5px] -top-[5px]" />
          <CornerTick className="-bottom-[5px] -left-[5px]" />
          <CornerTick className="-bottom-[5px] -right-[5px]" />
          <div className="flex items-center justify-between px-4 pt-3.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              Text reveal
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300 dark:text-zinc-600">
              Interactive
            </span>
          </div>
          <div className="flex items-center justify-center overflow-x-auto p-6 sm:p-10">
            <Card_05 text="Hover over me" revealText="You found me" />
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Explore all 108 components
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
