"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Lock, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface LineItem {
  name: string;
  detail: string;
  qty: number;
  price: number;
}

export interface Payment_02Props {
  items?: LineItem[];
  promoCode?: string;
  discountPct?: number;
  orderNumber?: string;
  shipping?: number;
  onPay?: (total: number) => void;
  className?: string;
}

const AnimatedAmount = ({ value }: { value: number }) => {
  const spring = useSpring(value, { stiffness: 120, damping: 22 });
  const display = useTransform(spring, (v) =>
    v.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

const Payment_02 = ({
  items = [
    { name: "Studio Headphones", detail: "Matte black", qty: 1, price: 249 },
    { name: "USB-C Cable", detail: "2 m braided", qty: 2, price: 19 },
    { name: "Carry Case", detail: "Hard shell", qty: 1, price: 39 },
  ],
  promoCode = "XUI20",
  discountPct = 20,
  orderNumber = "#48291",
  shipping = 12,
  onPay,
  className,
}: Payment_02Props) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = applied ? (subtotal * discountPct) / 100 : 0;
  const total = subtotal + shipping - discount;

  function applyCode() {
    if (code.trim().toUpperCase() === promoCode) {
      setApplied(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Order summary
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          {orderNumber}
        </span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item.name} className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-zinc-800 dark:text-zinc-200">
                {item.name}
                {item.qty > 1 && (
                  <span className="ml-1.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    ×{item.qty}
                  </span>
                )}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {item.detail}
              </p>
            </div>
            <span className="shrink-0 font-mono text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      {/* Promo code */}
      <div className="mt-5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
            <Input
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError(false);
              }}
              onKeyDown={(event) => event.key === "Enter" && applyCode()}
              placeholder="Promo code"
              disabled={applied}
              aria-label="Promo code"
              aria-invalid={error}
              className={cn(
                "h-9 pl-9 font-mono text-xs uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-sans",
                error &&
                  "border-rose-400 focus-visible:ring-rose-400 dark:border-rose-500/60"
              )}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={applyCode}
            disabled={applied || code.trim().length === 0}
            className="h-9 px-4 text-xs"
          >
            {applied ? "Applied" : "Apply"}
          </Button>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 overflow-hidden text-xs text-rose-500"
            >
              That code didn&apos;t work. Try {promoCode}.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="my-5 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800"
      />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Subtotal</dt>
          <dd className="font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
            ${subtotal.toFixed(2)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500 dark:text-zinc-400">Shipping</dt>
          <dd className="font-mono tabular-nums text-zinc-700 dark:text-zinc-300">
            ${shipping.toFixed(2)}
          </dd>
        </div>
        <AnimatePresence>
          {applied && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="flex justify-between overflow-hidden text-emerald-600 dark:text-emerald-400"
            >
              <dt className="flex items-center gap-1.5">
                {promoCode} · −{discountPct}%
                <button
                  type="button"
                  onClick={() => setApplied(false)}
                  aria-label="Remove promo code"
                  className="rounded-full p-0.5 text-emerald-600/60 transition-colors duration-200 hover:bg-emerald-500/10 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400/60 dark:hover:text-emerald-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </dt>
              <dd className="font-mono tabular-nums">−${discount.toFixed(2)}</dd>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-baseline justify-between border-t border-dashed border-zinc-200 pt-3 dark:border-zinc-800">
          <dt className="font-medium text-zinc-900 dark:text-zinc-100">Total</dt>
          <dd className="font-mono text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            <AnimatedAmount value={total} />
          </dd>
        </div>
      </dl>

      <Button
        className="mt-5 h-10 w-full gap-2 text-sm shadow-none transition-transform duration-150 active:scale-[0.98] bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
        type="button"
        onClick={() => onPay?.(total)}
      >
        <Lock aria-hidden className="h-3.5 w-3.5" />
        Pay ${total.toFixed(2)}
      </Button>
      <p className="mt-3 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        Payments are encrypted end-to-end
      </p>
    </div>
  );
};

export default Payment_02;
