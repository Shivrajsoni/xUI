"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColorVariant {
  name: string;
  /** Tailwind classes for the swatch fill. */
  swatch: string;
  price: number;
  /** Units in stock per size. 0 = sold out. */
  stock: Record<string, number>;
}

export interface Shop_04Props {
  product?: string;
  sizes?: string[];
  variants?: ColorVariant[];
  /** Stock at or below this shows the low-stock amber state. */
  lowStockAt?: number;
  onChange?: (color: string, size: string, qty: number) => void;
  className?: string;
}

const defaultVariants: ColorVariant[] = [
  {
    name: "Olive",
    swatch: "bg-gradient-to-br from-lime-700 to-emerald-900",
    price: 148,
    stock: { XS: 12, S: 8, M: 3, L: 0, XL: 6 },
  },
  {
    name: "Charcoal",
    swatch: "bg-gradient-to-br from-zinc-600 to-zinc-900",
    price: 148,
    stock: { XS: 0, S: 14, M: 22, L: 9, XL: 2 },
  },
  {
    name: "Sand",
    swatch: "bg-gradient-to-br from-amber-200 to-stone-400",
    price: 136,
    stock: { XS: 7, S: 0, M: 11, L: 16, XL: 0 },
  },
];

const defaultSizes = ["XS", "S", "M", "L", "XL"];

const Shop_04 = ({
  product = "Atlas Field Jacket",
  sizes = defaultSizes,
  variants = defaultVariants,
  lowStockAt = 5,
  onChange,
  className,
}: Shop_04Props) => {
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const color = variants[colorIdx]!;
  const stock = color.stock[size] ?? 0;
  const low = stock > 0 && stock <= lowStockAt;
  const maxStock = 25;

  const update = (nextColor: number, nextSize: string, nextQty: number) => {
    setColorIdx(nextColor);
    setSize(nextSize);
    const variant = variants[nextColor]!;
    const clamped = Math.max(1, Math.min(nextQty, Math.max(1, variant.stock[nextSize] ?? 1)));
    setQty(clamped);
    onChange?.(variant.name, nextSize, clamped);
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header: name + live price */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{product}</h3>
          <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500" aria-live="polite">
            {color.name} · {size}
          </p>
        </div>
        <div className="flex h-7 items-baseline overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={color.price}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="font-mono text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50"
            >
              ${color.price}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Color swatches */}
      <fieldset className="mt-4">
        <legend className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Color
        </legend>
        <div className="mt-2 flex gap-2.5" role="radiogroup" aria-label="Select color">
          {variants.map((v, i) => (
            <motion.button
              key={v.name}
              type="button"
              role="radio"
              aria-checked={colorIdx === i}
              aria-label={`${v.name} — $${v.price}`}
              onClick={() => update(i, size, qty)}
              whileTap={{ scale: 0.88 }}
              className={cn(
                "relative h-8 w-8 rounded-full transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:ring-offset-zinc-950",
                v.swatch,
                colorIdx === i
                  ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100"
                  : "ring-1 ring-zinc-900/10 hover:ring-zinc-900/30 dark:ring-white/15 dark:hover:ring-white/35"
              )}
            />
          ))}
        </div>
      </fieldset>

      {/* Size grid */}
      <fieldset className="mt-4">
        <legend className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Size
        </legend>
        <div className="mt-2 grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Select size">
          {sizes.map((s) => {
            const soldOut = (color.stock[s] ?? 0) === 0;
            return (
              <div key={s} className="relative">
                <button
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  aria-disabled={soldOut}
                  aria-label={soldOut ? `${s} — sold out, notify me` : `Size ${s}`}
                  onClick={() => !soldOut && update(colorIdx, s, qty)}
                  onMouseEnter={() => soldOut && setTooltip(s)}
                  onMouseLeave={() => setTooltip((t) => (t === s ? null : t))}
                  onFocus={() => soldOut && setTooltip(s)}
                  onBlur={() => setTooltip((t) => (t === s ? null : t))}
                  className={cn(
                    "h-9 w-full rounded-lg border font-mono text-xs transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
                    soldOut
                      ? "cursor-help border-dashed border-zinc-200 text-zinc-300 line-through dark:border-zinc-800 dark:text-zinc-700"
                      : "active:scale-95",
                    !soldOut &&
                      (size === s
                        ? "border-zinc-900 bg-zinc-100 text-zinc-900 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200")
                  )}
                >
                  {s}
                </button>
                <AnimatePresence>
                  {tooltip === s && (
                    <motion.span
                      role="tooltip"
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      Notify me
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Quantity + stock */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => update(colorIdx, size, qty - 1)}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-zinc-100"
          >
            <Minus aria-hidden className="h-3.5 w-3.5" />
          </button>
          <span
            aria-live="polite"
            aria-label={`Quantity ${qty}`}
            className="w-8 overflow-hidden text-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={qty}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className="inline-block font-mono text-sm tabular-nums text-zinc-900 dark:text-zinc-100"
              >
                {qty}
              </motion.span>
            </AnimatePresence>
          </span>
          <button
            type="button"
            onClick={() => update(colorIdx, size, qty + 1)}
            disabled={stock === 0 || qty >= stock}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-zinc-100"
          >
            <Plus aria-hidden className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stock meter */}
        <div className="min-w-0 flex-1">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900"
            role="meter"
            aria-label="Stock level"
            aria-valuenow={stock}
            aria-valuemin={0}
            aria-valuemax={maxStock}
          >
            <motion.div
              animate={{
                width: `${Math.min(100, (stock / maxStock) * 100)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "h-full rounded-full",
                stock === 0
                  ? "bg-zinc-300 dark:bg-zinc-700"
                  : low
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              )}
            />
          </div>
          <p
            aria-live="polite"
            className={cn(
              "mt-1 text-right text-[10px] font-medium",
              stock === 0
                ? "text-zinc-400 dark:text-zinc-500"
                : low
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            {stock === 0 ? "Sold out" : low ? `Only ${stock} left` : "In stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop_04;
