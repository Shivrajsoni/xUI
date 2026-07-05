"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Brand {
  name: string;
  /** Tailwind classes for the wordmark's type treatment. */
  treatment: string;
  /** Hover color class — the grayscale→color moment. */
  hover: string;
}

const defaultBrands: Brand[] = [
  { name: "Northwind", treatment: "font-serif italic text-lg", hover: "hover:text-sky-600 dark:hover:text-sky-400" },
  { name: "VOLTA", treatment: "text-base font-black tracking-[0.2em]", hover: "hover:text-amber-600 dark:hover:text-amber-400" },
  { name: "helio", treatment: "font-mono text-lg lowercase", hover: "hover:text-orange-600 dark:hover:text-orange-400" },
  { name: "Axiom Labs", treatment: "text-base font-semibold tracking-tight", hover: "hover:text-emerald-600 dark:hover:text-emerald-400" },
  { name: "FJORD", treatment: "text-base font-light tracking-[0.35em]", hover: "hover:text-cyan-600 dark:hover:text-cyan-400" },
  { name: "Pulse", treatment: "text-lg font-extrabold italic", hover: "hover:text-rose-600 dark:hover:text-rose-400" },
  { name: "matterhorn", treatment: "font-serif text-lg lowercase tracking-wide", hover: "hover:text-indigo-600 dark:hover:text-indigo-400" },
  { name: "Kite & Co.", treatment: "text-base font-medium tracking-tight", hover: "hover:text-teal-600 dark:hover:text-teal-400" },
];

export interface Flow_02Props {
  brands?: Brand[];
  /** Drift speed in px/s. Hovering eases to roughly a third of this. */
  speed?: number;
  label?: string;
  className?: string;
}

const Flow_02 = ({
  brands = defaultBrands,
  speed = 55,
  label = "Trusted by teams at",
  className,
}: Flow_02Props) => {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const speedRef = useRef(speed);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      halfRef.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 64) / 1000;
    const target = hovered ? speed / 3 : speed;
    // Ease speed toward target — slows on hover, never stops.
    speedRef.current += (target - speedRef.current) * Math.min(1, dt * 6);
    let next = x.get() - speedRef.current * dt;
    const half = halfRef.current;
    if (half > 0 && next <= -half) next += half;
    x.set(next);
  });

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
        {label}
      </p>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {brands.map((brand) => (
                <span
                  key={`${copy}-${brand.name}`}
                  className={cn(
                    "cursor-default whitespace-nowrap px-6 text-zinc-400 transition-colors duration-300 dark:text-zinc-600 sm:px-8",
                    brand.treatment,
                    brand.hover
                  )}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Flow_02;
