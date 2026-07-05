"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductSlide {
  /** Tailwind gradient classes for the slide backdrop. */
  gradient: string;
  /** Accessible label for the slide. */
  label: string;
}

export interface Shop_01Props {
  name?: string;
  collection?: string;
  price?: number;
  compareAt?: number;
  sizes?: string[];
  slides?: ProductSlide[];
  onAddToCart?: (size: string) => void;
  onWishlist?: (wishlisted: boolean) => void;
  className?: string;
}

const defaultSlides: ProductSlide[] = [
  {
    gradient: "from-orange-200 via-rose-200 to-amber-100 dark:from-orange-950 dark:via-rose-950 dark:to-amber-950",
    label: "Sunset colorway, side profile",
  },
  {
    gradient: "from-sky-200 via-indigo-200 to-cyan-100 dark:from-sky-950 dark:via-indigo-950 dark:to-cyan-950",
    label: "Glacier colorway, top view",
  },
  {
    gradient: "from-emerald-200 via-teal-200 to-lime-100 dark:from-emerald-950 dark:via-teal-950 dark:to-lime-950",
    label: "Moss colorway, detail shot",
  },
];

/** Abstract sneaker built from CSS shapes — no external imagery. */
const SneakerArt = ({ variant }: { variant: number }) => (
  <div aria-hidden className="relative h-full w-full">
    {/* sole */}
    <div className="absolute bottom-[22%] left-[12%] h-[9%] w-[76%] rounded-full bg-white/80 shadow-sm dark:bg-white/20" />
    {/* body */}
    <div
      className={cn(
        "absolute bottom-[29%] left-[16%] h-[26%] w-[68%] rounded-[45%_55%_18%_22%/80%_90%_20%_25%]",
        variant === 0 && "bg-gradient-to-br from-rose-400 to-orange-500 dark:from-rose-500 dark:to-orange-600",
        variant === 1 && "bg-gradient-to-br from-indigo-400 to-sky-500 dark:from-indigo-500 dark:to-sky-600",
        variant === 2 && "bg-gradient-to-br from-teal-400 to-emerald-500 dark:from-teal-500 dark:to-emerald-600"
      )}
    />
    {/* collar */}
    <div className="absolute bottom-[48%] left-[58%] h-[14%] w-[20%] rounded-t-full bg-zinc-900/80 dark:bg-zinc-100/70" />
    {/* laces */}
    <div className="absolute bottom-[42%] left-[34%] flex w-[22%] flex-col gap-[3px]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-[3px] w-full -rotate-6 rounded-full bg-white/90 dark:bg-white/60" />
      ))}
    </div>
    {/* floor shadow */}
    <div className="absolute bottom-[17%] left-[18%] h-[4%] w-[64%] rounded-full bg-zinc-900/10 blur-[3px] dark:bg-black/40" />
  </div>
);

const Shop_01 = ({
  name = "Cloudrise Runner",
  collection = "Trail Series",
  price = 128,
  compareAt = 165,
  sizes = ["7", "8", "9", "10", "11"],
  slides = defaultSlides,
  onAddToCart,
  onWishlist,
  className,
}: Shop_01Props) => {
  const [slide, setSlide] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [size, setSize] = useState("9");
  const [added, setAdded] = useState(false);

  const toggleWishlist = () => {
    const next = !wishlisted;
    setWishlisted(next);
    onWishlist?.(next);
  };

  const addToCart = () => {
    if (added) return;
    setAdded(true);
    onAddToCart?.(size);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Gallery */}
      <div className="group relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) {
              setSlide((s) => Math.min(slides.length - 1, s + 1));
            } else if (info.offset.x > 50 || info.velocity.x > 400) {
              setSlide((s) => Math.max(0, s - 1));
            }
          }}
          animate={{ x: `-${slide * 100}%` }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
        >
          {slides.map((s, i) => (
            <div
              key={s.label}
              role="img"
              aria-label={`${name} — ${s.label}`}
              className={cn("h-full w-full shrink-0 bg-gradient-to-br", s.gradient)}
            >
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110">
                <SneakerArt variant={i % 3} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Wishlist */}
        <motion.button
          type="button"
          onClick={toggleWishlist}
          whileTap={{ scale: 0.85 }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:bg-zinc-900/85 dark:hover:bg-zinc-900"
        >
          <motion.span
            key={wishlisted ? "on" : "off"}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex"
          >
            <Heart
              aria-hidden
              className={cn(
                "h-4 w-4 transition-colors",
                wishlisted ? "fill-rose-500 text-rose-500" : "text-zinc-600 dark:text-zinc-300"
              )}
            />
          </motion.span>
        </motion.button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" role="tablist" aria-label="Product photos">
          {slides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`View photo ${i + 1}: ${s.label}`}
              onClick={() => setSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
                slide === i
                  ? "w-5 bg-zinc-900 dark:bg-zinc-100"
                  : "w-1.5 bg-zinc-900/30 hover:bg-zinc-900/50 dark:bg-white/40 dark:hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {collection}
            </p>
            <h3 className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
              ${price}
            </p>
            {compareAt > price && (
              <p className="font-mono text-xs tabular-nums text-zinc-400 line-through dark:text-zinc-500">
                ${compareAt}
              </p>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Select size">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              className={cn(
                "h-8 min-w-8 rounded-lg border px-2 font-mono text-xs tabular-nums transition-all duration-150 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                size === s
                  ? "border-zinc-900 bg-zinc-100 text-zinc-900 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Add to cart */}
        <motion.button
          type="button"
          onClick={addToCart}
          whileTap={{ scale: 0.97 }}
          aria-label={added ? "Added to cart" : `Add ${name}, size ${size}, to cart`}
          className={cn(
            "mt-4 flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-lg text-xs font-medium transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-offset-zinc-950",
            added
              ? "bg-emerald-600 text-white focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:text-emerald-950"
              : "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="flex items-center gap-1.5"
              >
                <Check aria-hidden className="h-3.5 w-3.5" />
                Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="flex items-center gap-1.5"
              >
                <ShoppingBag aria-hidden className="h-3.5 w-3.5" />
                Add to cart — ${price}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Shop_01;
