"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, PenLine, Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewSnippet {
  id: string;
  author: string;
  rating: number;
  text: string;
  helpful: number;
}

export interface Shop_03Props {
  average?: number;
  totalReviews?: number;
  /** Counts for 5 → 1 stars, in that order. */
  distribution?: [number, number, number, number, number];
  verifiedPercent?: number;
  reviews?: ReviewSnippet[];
  onWriteReview?: () => void;
  onHelpful?: (id: string, helpful: boolean) => void;
  className?: string;
}

const defaultReviews: ReviewSnippet[] = [
  {
    id: "r1",
    author: "Maya Patel",
    rating: 5,
    text: "True to size and the cushioning holds up on long trail days. Third pair for our whole crew.",
    helpful: 24,
  },
  {
    id: "r2",
    author: "Sam Chen",
    rating: 4,
    text: "Great grip in wet conditions. Laces could be a touch longer, but overall a keeper.",
    helpful: 11,
  },
];

const Stars = ({ value, className }: { value: number; className?: string }) => (
  <div
    className={cn("relative inline-flex", className)}
    role="img"
    aria-label={`${value} out of 5 stars`}
  >
    <div className="flex gap-0.5 text-zinc-200 dark:text-zinc-800" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
    <div
      className="absolute inset-0 flex gap-0.5 overflow-hidden text-amber-400"
      style={{ width: `${(value / 5) * 100}%` }}
      aria-hidden
    >
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 shrink-0 fill-current" />
      ))}
    </div>
  </div>
);

const Shop_03 = ({
  average = 4.6,
  totalReviews = 1284,
  distribution = [942, 226, 78, 24, 14],
  verifiedPercent = 92,
  reviews = defaultReviews,
  onWriteReview,
  onHelpful,
  className,
}: Shop_03Props) => {
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const max = Math.max(...distribution, 1);

  const toggleHelpful = (id: string) => {
    setVoted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      onHelpful?.(id, next[id]!);
      return next;
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Summary row */}
      <div className="flex items-start gap-4">
        <div>
          <p className="font-mono text-4xl font-semibold tabular-nums leading-none text-zinc-900 dark:text-zinc-50">
            {average.toFixed(1)}
          </p>
          <Stars value={average} className="mt-1.5" />
          <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            {totalReviews.toLocaleString()} reviews
          </p>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-1.5 pt-0.5">
          {distribution.map((count, i) => {
            const stars = 5 - i;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-2 font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-500">
                  {stars}
                </span>
                <div
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
                  role="progressbar"
                  aria-label={`${stars} star reviews`}
                  aria-valuenow={count}
                  aria-valuemin={0}
                  aria-valuemax={max}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / max) * 100}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      delay: 0.15 + i * 0.07,
                    }}
                    className="h-full rounded-full bg-amber-400"
                  />
                </div>
                <span className="w-7 text-right font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-500">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified chip */}
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
        <BadgeCheck aria-hidden className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {verifiedPercent}% verified purchases
        </span>
      </div>

      {/* Highlighted snippets */}
      <div className="mt-3 space-y-2.5">
        {reviews.map((review) => {
          const isVoted = !!voted[review.id];
          return (
            <figure
              key={review.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 dark:border-zinc-900 dark:bg-zinc-900/50"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    {review.author}
                  </span>
                  <Stars value={review.rating} />
                </div>
              </div>
              <blockquote className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <motion.button
                type="button"
                onClick={() => toggleHelpful(review.id)}
                whileTap={{ scale: 0.92 }}
                aria-pressed={isVoted}
                aria-label={`Mark review by ${review.author} as helpful`}
                className={cn(
                  "mt-2 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                  isVoted
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-zinc-300"
                )}
              >
                <motion.span
                  key={isVoted ? "on" : "off"}
                  initial={{ rotate: isVoted ? -20 : 0, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="flex"
                >
                  <ThumbsUp aria-hidden className={cn("h-3 w-3", isVoted && "fill-current")} />
                </motion.span>
                Helpful ·{" "}
                <span className="font-mono tabular-nums">{review.helpful + (isVoted ? 1 : 0)}</span>
              </motion.button>
            </figure>
          );
        })}
      </div>

      {/* Write review CTA */}
      <button
        type="button"
        onClick={() => onWriteReview?.()}
        className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
      >
        <PenLine aria-hidden className="h-3.5 w-3.5" />
        Write a review
      </button>
    </div>
  );
};

export default Shop_03;
