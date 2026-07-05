"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import {
  AudioLines,
  Globe2,
  Keyboard,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StreamCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultCards: StreamCard[] = [
  {
    icon: <AudioLines aria-hidden className="h-4 w-4" />,
    title: "Natural dictation",
    description: "Speak in full sentences — filler words vanish on their own.",
  },
  {
    icon: <Zap aria-hidden className="h-4 w-4" />,
    title: "Instant everywhere",
    description: "Works in every text field, from email to your IDE.",
  },
  {
    icon: <Globe2 aria-hidden className="h-4 w-4" />,
    title: "62 languages",
    description: "Switch mid-sentence. Accents welcome, no setup.",
  },
  {
    icon: <Sparkles aria-hidden className="h-4 w-4" />,
    title: "Auto-formatting",
    description: "Lists, punctuation, and casing handled as you talk.",
  },
  {
    icon: <ShieldCheck aria-hidden className="h-4 w-4" />,
    title: "Private by default",
    description: "Audio is processed and discarded — never stored.",
  },
  {
    icon: <Keyboard aria-hidden className="h-4 w-4" />,
    title: "Keyboard optional",
    description: "Hold one key to talk, release to see polished text.",
  },
];

export interface Flow_04Props {
  cards?: StreamCard[];
  /** Drift speed in px/s. */
  speed?: number;
  className?: string;
}

const Flow_04 = ({ cards = defaultCards, speed = 32, className }: Flow_04Props) => {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

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

  // Keep x inside (-half, 0] so the doubled track loops seamlessly,
  // including while drag momentum is running.
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const half = halfRef.current;
      if (half <= 0) return;
      if (v <= -half) x.set(v + half);
      else if (v > 0) x.set(v - half);
    });
    return unsub;
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || dragging) return;
    const dt = Math.min(delta, 64) / 1000;
    x.set(x.get() - speed * dt);
  });

  return (
    <div
      className={cn(
        "w-full max-w-2xl overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <motion.div
        ref={trackRef}
        drag="x"
        style={{ x }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-3 pr-3"
        aria-label="Feature stream — drag to browse"
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3">
            {cards.map((card) => (
              <div
                key={`${copy}-${card.title}`}
                className={cn(
                  "w-52 shrink-0 select-none rounded-xl border border-zinc-200 bg-white p-4",
                  "shadow-[0_10px_30px_-18px_rgba(24,24,27,0.3)] transition-colors duration-200",
                  "hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                )}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  {card.icon}
                </span>
                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Flow_04;
