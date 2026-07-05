import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import InstallCommand from "./InstallCommand";

export default function ClosingCta() {
  return (
    <section className="border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:py-28">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Stop rebuilding{" "}
          <span className="font-display italic font-normal text-zinc-500 dark:text-zinc-400">
            the basics
          </span>
          .
        </h2>
        <p className="mt-4 max-w-md text-pretty text-zinc-600 dark:text-zinc-400">
          One command adds a component with every file and dependency it needs.
          The source lands in your project — yours to keep.
        </p>
        <div className="mt-8 w-full max-w-md">
          <InstallCommand />
        </div>
        <Link
          href="/docs"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Read the docs
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
