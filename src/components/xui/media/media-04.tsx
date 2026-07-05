"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string;
  caption: string;
  location: string;
  /** Tailwind gradient classes for the artwork. */
  art: string;
  /** Extra decorative layer (CSS background value). */
  glow: string;
}

export interface Media_04Props {
  images?: GalleryImage[];
  initialIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: "dawn",
    caption: "First light over the ridge",
    location: "Dolomites, Italy",
    art: "from-orange-300 via-rose-400 to-purple-600",
    glow: "radial-gradient(ellipse at 30% 75%, rgba(255,237,213,0.7), transparent 55%)",
  },
  {
    id: "reef",
    caption: "Shallow reef at noon",
    location: "Gili Air, Indonesia",
    art: "from-cyan-300 via-sky-500 to-blue-700",
    glow: "radial-gradient(ellipse at 70% 20%, rgba(207,250,254,0.65), transparent 50%)",
  },
  {
    id: "dune",
    caption: "Wind lines on the dune",
    location: "Sossusvlei, Namibia",
    art: "from-amber-300 via-orange-500 to-red-700",
    glow: "radial-gradient(ellipse at 20% 30%, rgba(254,243,199,0.6), transparent 55%)",
  },
];

const Media_04 = ({
  images = defaultImages,
  initialIndex = 0,
  onSelect,
  className,
}: Media_04Props) => {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0))
  );
  const [zoomed, setZoomed] = useState(false);
  const current = images[index];

  const go = (next: number) => {
    const clamped = (next + images.length) % images.length;
    setIndex(clamped);
    setZoomed(false);
    onSelect?.(clamped);
  };

  if (!current) return null;

  return (
    <div
      role="region"
      aria-label="Image gallery"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
      }}
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: zoomed ? 1.7 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{ transformOrigin: "65% 35%" }}
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                current.art
              )}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: current.glow }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label="Previous image"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label="Next image"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </motion.button>

        {/* Zoom */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          aria-pressed={zoomed}
          onClick={() => setZoomed((v) => !v)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {zoomed ? (
            <ZoomOut className="h-4 w-4" />
          ) : (
            <ZoomIn className="h-4 w-4" />
          )}
        </motion.button>

        {/* Caption bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm font-medium text-white">
                {current.caption}
              </p>
              <p className="text-xs text-white/60">{current.location}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter */}
        <span className="absolute left-2 top-2 rounded-full bg-black/35 px-2 py-0.5 font-mono text-[10px] tabular-nums text-white/90 backdrop-blur-sm">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            whileTap={{ scale: 0.95 }}
            aria-label={`Show image: ${img.caption}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
              i === index
                ? "ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-zinc-950"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                img.art
              )}
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: img.glow }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Media_04;
