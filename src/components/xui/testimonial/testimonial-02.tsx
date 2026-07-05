"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Quote = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const DEFAULT_QUOTES: Quote[] = [
  {
    quote:
      "It's the first component library where the defaults feel like design decisions, not placeholders.",
    name: "Alex Rivera",
    role: "Staff Engineer, Linear-ish",
    avatar: "/avatars/avatar-01.svg",
  },
  {
    quote:
      "We rebuilt our marketing site in four days. The motion work alone would have taken us a month.",
    name: "Sam Chen",
    role: "Design Engineer, Vantage",
    avatar: "/avatars/avatar-02.svg",
  },
  {
    quote:
      "Every component survives dark mode, keyboard nav, and our pickiest designer. Nothing else has.",
    name: "Maya Patel",
    role: "Frontend Lead, Northwind",
    avatar: "/avatars/avatar-03.svg",
  },
];

const Testimonial_02 = ({
  quotes = DEFAULT_QUOTES,
  label = "What builders say",
  intervalMs = 5000,
  className,
}: {
  quotes?: Quote[];
  /** Eyebrow label above the quote. Pass an empty string to hide it. */
  label?: string;
  /** Auto-rotate interval in milliseconds. */
  intervalMs?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const restart = useCallback(() => {
    stop();
    if (quotes.length < 2) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      intervalMs
    );
  }, [stop, quotes.length, intervalMs]);

  useEffect(() => {
    restart();
    return stop;
  }, [restart, stop]);

  if (quotes.length === 0) return null;

  const safeIndex = index % quotes.length;
  const active = quotes[safeIndex]!;

  return (
    <section
      className={cn(
        "relative w-full max-w-xl overflow-hidden rounded-2xl px-8 py-10 sm:px-12",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
      aria-label="Customer testimonial"
      onMouseEnter={stop}
      onMouseLeave={restart}
    >
      {/* Quotation mark watermark — fully inside the card so no edge ever cuts it */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-4 select-none font-serif text-[110px] leading-[0.7] text-zinc-100 dark:text-zinc-900"
      >
        &rdquo;
      </span>
      {/* Hairline top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/20"
      />

      {label ? (
        <p className="relative mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
          {label}
        </p>
      ) : null}

      <div className="relative min-h-[168px] sm:min-h-[148px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={safeIndex}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-serif text-xl italic leading-snug text-zinc-800 dark:text-zinc-100 sm:text-2xl">
              {active.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img
                src={active.avatar}
                alt=""
                className="h-9 w-9 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
              />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {active.name}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {active.role}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="relative mt-7 flex items-center gap-2">
        {quotes.map((q, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial from ${q.name}`}
            aria-current={i === safeIndex}
            onClick={() => {
              setIndex(i);
              restart();
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-600 dark:focus-visible:ring-offset-zinc-950",
              i === safeIndex
                ? "w-6 bg-zinc-800 dark:bg-zinc-200"
                : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial_02;
