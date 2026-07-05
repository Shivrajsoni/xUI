"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus, Search, ShoppingBag, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Header_04Props {
  brand?: string;
  categories?: string[];
  initialCartCount?: number;
  wishlistCount?: number;
  onSearch?: (query: string) => void;
  onNavigate?: (category: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  className?: string;
}

const Header_04 = ({
  brand = "OSLO&CO",
  categories = ["New in", "Women", "Men", "Home", "Sale"],
  initialCartCount = 2,
  wishlistCount = 4,
  onSearch,
  onNavigate,
  onCartClick,
  onWishlistClick,
  className,
}: Header_04Props) => {
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");

  return (
    <div
      className={cn(
        "w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Free shipping micro-banner */}
      <p className="flex items-center justify-center gap-1.5 bg-rose-600 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-white dark:bg-rose-500">
        <Truck aria-hidden className="h-3 w-3 shrink-0" />
        <span className="truncate">Free shipping on orders over $75 · Returns within 30 days</span>
      </p>

      <header className="border-b border-zinc-200 dark:border-zinc-800">
        {/* Main bar */}
        <div className="flex items-center gap-3 px-4 py-3 sm:gap-5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("home");
            }}
            className="shrink-0 rounded-md px-1 font-serif text-lg font-semibold tracking-tight text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-zinc-100"
          >
            {brand}
          </a>

          {/* Search */}
          <div className="relative min-w-0 flex-1 sm:mx-auto sm:max-w-sm">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) onSearch?.(query.trim());
              }}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-9 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-[border-color,box-shadow,background-color] duration-200 hover:border-zinc-300 focus:border-rose-500/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,63,94,0.12)] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:hover:border-zinc-700 dark:focus:border-rose-500/50 dark:focus:bg-zinc-950"
            />
          </div>

          {/* Icons */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label={`Wishlist, ${wishlistCount} items`}
              onClick={() => onWishlistClick?.()}
              className="relative rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-90 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <Heart aria-hidden className="h-4.5 w-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 font-mono text-[9px] font-medium tabular-nums text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => onCartClick?.()}
              className="relative rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-90 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <ShoppingBag aria-hidden className="h-4.5 w-4.5" />
              <AnimatePresence mode="popLayout" initial={false}>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 font-mono text-[9px] font-medium tabular-nums text-white dark:bg-rose-500"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Category links */}
        <nav
          aria-label="Categories"
          className="flex gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-current={activeCategory === cat ? "page" : undefined}
              onClick={() => {
                setActiveCategory(cat);
                onNavigate?.(cat);
              }}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-95",
                activeCategory === cat
                  ? "bg-rose-600 text-white dark:bg-rose-500 dark:text-white"
                  : cat === "Sale"
                    ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* Faux page strip with a live product row */}
      <div className="bg-zinc-50/60 px-5 py-5 dark:bg-zinc-900/30">
        <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div
            aria-hidden
            className="h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Alpine wool overshirt
            </p>
            <p className="mt-0.5 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              $128.00
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setCartCount((c) => c + 1)}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-rose-600 py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-rose-500 dark:hover:bg-rose-400 dark:ring-offset-zinc-950"
          >
            <Plus aria-hidden className="h-3.5 w-3.5" />
            Add to cart
          </motion.button>
        </div>
        <div aria-hidden className="mt-4 grid grid-cols-3 gap-3">
          <div className="h-12 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
          <div className="h-12 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
          <div className="h-12 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
};

export default Header_04;
