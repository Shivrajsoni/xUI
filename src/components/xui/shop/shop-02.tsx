"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Ticket, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  /** Tailwind gradient classes used for the CSS-art thumbnail. */
  art: string;
}

export interface Shop_02Props {
  items?: CartItem[];
  shipping?: number;
  /** Order value at which shipping becomes free. */
  freeShippingAt?: number;
  onCheckout?: (total: number) => void;
  className?: string;
}

const defaultItems: CartItem[] = [
  {
    id: "runner",
    name: "Cloudrise Runner",
    variant: "Sunset / US 9",
    price: 128,
    qty: 1,
    art: "from-rose-400 to-orange-400 dark:from-rose-500 dark:to-orange-500",
  },
  {
    id: "tee",
    name: "Meridian Tee",
    variant: "Bone / M",
    price: 42,
    qty: 2,
    art: "from-zinc-300 to-stone-400 dark:from-zinc-500 dark:to-stone-600",
  },
  {
    id: "cap",
    name: "Fieldline Cap",
    variant: "Moss / OS",
    price: 34,
    qty: 1,
    art: "from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-600",
  },
];

const SpringNumber = ({ value, className }: { value: string; className?: string }) => (
  <span className={cn("relative inline-flex overflow-hidden", className)}>
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="inline-block tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

const Shop_02 = ({
  items: initialItems = defaultItems,
  shipping = 4.9,
  freeShippingAt = 250,
  onCheckout,
  className,
}: Shop_02Props) => {
  const [items, setItems] = useState(initialItems);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const freeShipping = subtotal >= freeShippingAt;
  const shipCost = items.length === 0 ? 0 : freeShipping ? 0 : shipping;
  const total = subtotal + shipCost;
  const remaining = freeShippingAt - subtotal;

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(9, i.qty + delta)) } : i))
    );

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-baseline justify-between px-4 pt-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your cart</h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <SpringNumber value={String(items.reduce((n, i) => n + i.qty, 0))} /> items
        </p>
      </div>

      {/* Line items */}
      <ul className="mt-3 px-4">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              exit={{ x: 56, opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="flex items-center gap-3 overflow-hidden border-b border-zinc-100 py-3 last:border-0 dark:border-zinc-900"
            >
              {/* CSS-art thumb */}
              <div
                aria-hidden
                className={cn(
                  "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br",
                  item.art
                )}
              >
                <div className="absolute bottom-1.5 left-1.5 h-3 w-8 rounded-full bg-white/70 dark:bg-white/30" />
                <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white/40" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </p>
                <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">{item.variant}</p>
                {/* Qty stepper */}
                <div className="mt-1.5 inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, -1)}
                    disabled={item.qty <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="flex h-6 w-6 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-zinc-100"
                  >
                    <Minus aria-hidden className="h-3 w-3" />
                  </button>
                  <span
                    aria-live="polite"
                    className="w-6 text-center font-mono text-xs tabular-nums text-zinc-900 dark:text-zinc-100"
                  >
                    <SpringNumber value={String(item.qty)} />
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(item.id, 1)}
                    disabled={item.qty >= 9}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="flex h-6 w-6 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-zinc-100"
                  >
                    <Plus aria-hidden className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="flex h-5 w-5 items-center justify-center rounded text-zinc-300 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-90 dark:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <X aria-hidden className="h-3.5 w-3.5" />
                </button>
                <p className="font-mono text-xs font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                  <SpringNumber value={`$${(item.price * item.qty).toFixed(2)}`} />
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <li className="py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
            Your cart is empty.
          </li>
        )}
      </ul>

      {/* Promo hint */}
      <div className="mx-4 mt-1 flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
        <Ticket aria-hidden className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400" aria-live="polite">
          {freeShipping ? (
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              You unlocked free shipping
            </span>
          ) : (
            <>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                ${remaining.toFixed(2)}
              </span>{" "}
              away from free shipping
            </>
          )}
        </p>
      </div>

      {/* Totals */}
      <div className="space-y-1.5 px-4 pt-3 text-xs">
        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Subtotal</span>
          <SpringNumber value={`$${subtotal.toFixed(2)}`} className="font-mono" />
        </div>
        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Shipping</span>
          <SpringNumber
            value={shipCost === 0 ? "Free" : `$${shipCost.toFixed(2)}`}
            className={cn("font-mono", shipCost === 0 && "text-emerald-600 dark:text-emerald-400")}
          />
        </div>
        <div className="flex justify-between border-t border-zinc-100 pt-2 text-sm font-semibold text-zinc-900 dark:border-zinc-900 dark:text-zinc-50">
          <span>Total</span>
          <SpringNumber value={`$${total.toFixed(2)}`} className="font-mono" />
        </div>
      </div>

      {/* Checkout */}
      <div className="p-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          disabled={items.length === 0}
          onClick={() => onCheckout?.(total)}
          className="group flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 dark:bg-emerald-500 dark:text-white dark:ring-offset-zinc-950 dark:hover:bg-emerald-400"
        >
          Checkout
          <ArrowRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default Shop_02;
