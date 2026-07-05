"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  avatar: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Shipped our entire dashboard rebuild in a weekend. The defaults are just… correct.",
    name: "Alex Rivera",
    handle: "@alexbuilds",
    avatar: "/avatars/avatar-01.svg",
  },
  {
    quote:
      "Copy, paste, done. First component library that didn't make me fight the styles.",
    name: "Sam Chen",
    handle: "@samchen_dev",
    avatar: "/avatars/avatar-02.svg",
  },
  {
    quote:
      "Dark mode worked out of the box. I checked twice because I didn't believe it.",
    name: "Maya Patel",
    handle: "@mayacodes",
    avatar: "/avatars/avatar-03.svg",
  },
  {
    quote:
      "Our design team stopped sending me Figma nitpicks. That alone is worth it.",
    name: "Jordan Lee",
    handle: "@jordanships",
    avatar: "/avatars/avatar-04.svg",
  },
  {
    quote:
      "The animations feel expensive. Clients keep asking who did our motion work.",
    name: "Priya Sharma",
    handle: "@priyauiux",
    avatar: "/avatars/avatar-02.svg",
  },
  {
    quote:
      "Cut our frontend sprint estimates in half. My PM thinks I got faster. I didn't.",
    name: "Diego Marín",
    handle: "@diegodevs",
    avatar: "/avatars/avatar-01.svg",
  },
  {
    quote:
      "Accessible by default, typed end to end. This is how components should ship.",
    name: "Nina Kowalski",
    handle: "@ninafrontend",
    avatar: "/avatars/avatar-04.svg",
  },
  {
    quote:
      "I deleted 4,000 lines of custom CSS after migrating. Zero regrets, zero regressions.",
    name: "Omar Haddad",
    handle: "@omarwrites_ts",
    avatar: "/avatars/avatar-03.svg",
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <figure
    className={cn(
      "w-[290px] shrink-0 select-none rounded-2xl p-5",
      "border border-zinc-200 bg-white shadow-[0_8px_30px_-18px_rgba(24,24,27,0.25)]",
      "transition-colors duration-300 hover:border-zinc-300",
      "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,0.8)] dark:hover:border-zinc-700"
    )}
  >
    <div aria-hidden className="mb-3 flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3 w-3 fill-amber-400/90 text-amber-400/90"
          strokeWidth={1}
        />
      ))}
    </div>
    <blockquote className="text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      &ldquo;{t.quote}&rdquo;
    </blockquote>
    <figcaption className="mt-4 flex items-center gap-3">
      <img
        src={t.avatar}
        alt=""
        className="h-8 w-8 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
      />
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
          {t.name}
        </p>
        <p className="truncate font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          {t.handle}
        </p>
      </div>
    </figcaption>
  </figure>
);

const MarqueeRow = ({
  items,
  reverse = false,
  duration = 42,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
}) => (
  <div className="group flex overflow-hidden">
    <div
      className="flex shrink-0 gap-4 pr-4 will-change-transform group-hover:[animation-play-state:paused]"
      style={{
        animation: `xui-marquee ${duration}s linear infinite ${
          reverse ? "reverse" : "normal"
        }`,
      }}
    >
      {items.map((t, i) => (
        <TestimonialCard key={`a-${i}`} t={t} />
      ))}
    </div>
    <div
      aria-hidden
      className="flex shrink-0 gap-4 pr-4 will-change-transform group-hover:[animation-play-state:paused]"
      style={{
        animation: `xui-marquee ${duration}s linear infinite ${
          reverse ? "reverse" : "normal"
        }`,
      }}
    >
      {items.map((t, i) => (
        <TestimonialCard key={`b-${i}`} t={t} />
      ))}
    </div>
  </div>
);

const Testimonial_01 = ({
  testimonials = DEFAULT_TESTIMONIALS,
  label = "Loved by 12,000+ developers",
  className,
}: {
  testimonials?: Testimonial[];
  /** Header line above the marquee. Pass an empty string to hide it. */
  label?: string;
  className?: string;
}) => {
  const half = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, half);
  const rowTwo = testimonials.slice(half);

  return (
    <section
      className={cn("relative w-full max-w-3xl overflow-hidden py-2", className)}
      aria-label="Customer testimonials"
    >
      <style>{`@keyframes xui-marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }`}</style>

      {label ? (
        <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
          {label}
        </p>
      ) : null}

      <div
        className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <MarqueeRow items={rowOne} duration={44} />
        <MarqueeRow items={rowTwo.length ? rowTwo : rowOne} reverse duration={52} />
      </div>
    </section>
  );
};

export default Testimonial_01;
