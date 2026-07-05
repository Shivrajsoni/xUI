"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Payment_01Props {
  holder?: string;
  number?: string;
  expiry?: string;
  cvv?: string;
  bank?: string;
  className?: string;
}

const Payment_01 = ({
  holder = "Alex Rivera",
  number = "5412 7534 8821 0049",
  expiry = "09/28",
  cvv = "482",
  bank = "xUI Bank",
  className,
}: Payment_01Props) => {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0..1
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 10, y: (px - 0.5) * 12 });
    setSheen({ x: px * 100, y: py * 100, active: true });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setSheen((s) => ({ ...s, active: false }));
  }

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div
        ref={cardRef}
        style={{ perspective: "1200px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Show card front" : "Show card back"}
          aria-pressed={flipped}
          animate={{
            rotateY: flipped ? 180 : 0,
            rotateX: tilt.x,
          }}
          style={{ transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileTap={{ scale: 0.98 }}
          className="relative block aspect-[8/5] w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
        >
          {/* extra tilt on Y merged via wrapper */}
          <motion.div
            animate={{ rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* ---------- FRONT ---------- */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#17181c] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6"
            >
              {/* Charcoal texture + top highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(255,255,255,0.08),transparent_55%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              {/* Moving sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: sheen.active ? 1 : 0,
                  background: `radial-gradient(280px circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.10), transparent 60%)`,
                }}
              />

              <div className="relative flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  {bank}
                </span>
                {/* Contactless waves */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 rotate-90 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M4 9a12 12 0 0 1 16 0" opacity="0.35" />
                  <path d="M6.5 12a8 8 0 0 1 11 0" opacity="0.6" />
                  <path d="M9 15a4.5 4.5 0 0 1 6 0" />
                </svg>
              </div>

              {/* EMV chip built from CSS */}
              <div className="relative -mt-1">
                <div className="relative h-8 w-11 overflow-hidden rounded-md border border-amber-200/40 bg-gradient-to-br from-amber-200 via-yellow-300/90 to-amber-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]">
                  <div aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-amber-700/40" />
                  <div aria-hidden className="absolute inset-y-0 left-1/3 w-px bg-amber-700/40" />
                  <div aria-hidden className="absolute inset-y-0 right-1/3 w-px bg-amber-700/40" />
                  <div aria-hidden className="absolute left-1/3 right-1/3 top-1/4 h-px bg-amber-700/30" />
                  <div aria-hidden className="absolute left-1/3 right-1/3 bottom-1/4 h-px bg-amber-700/30" />
                </div>
              </div>

              <div className="relative space-y-4">
                <p className="font-mono text-lg tracking-[0.18em] text-zinc-100 [text-shadow:0_1px_0_rgba(0,0,0,0.6)] sm:text-xl">
                  {number}
                </p>
                <div className="flex items-end justify-between">
                  <div className="space-y-0.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                      Card holder
                    </p>
                    <p className="text-sm font-medium tracking-wide text-zinc-200">
                      {holder}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                      Expires
                    </p>
                    <p className="font-mono text-sm text-zinc-200">{expiry}</p>
                  </div>
                  {/* Brand rings */}
                  <div aria-hidden className="flex -space-x-2.5">
                    <span className="h-7 w-7 rounded-full bg-zinc-400/80 mix-blend-screen" />
                    <span className="h-7 w-7 rounded-full bg-zinc-600/90 mix-blend-screen" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- BACK ---------- */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17181c] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(255,255,255,0.06),transparent_55%)]"
              />
              {/* Magnetic stripe */}
              <div className="relative mt-6 h-10 w-full bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

              {/* Signature strip + CVV */}
              <div className="relative mx-5 mt-5 flex h-9 items-center overflow-hidden rounded-md bg-zinc-100">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(24,24,27,0.06)_6px,rgba(24,24,27,0.06)_7px)]"
                />
                <span className="relative ml-auto mr-3 rounded-sm bg-white px-2 py-0.5 font-mono text-sm italic tracking-widest text-zinc-800 shadow-sm">
                  {cvv}
                </span>
              </div>

              <div className="relative mx-5 mt-auto mb-5 flex items-end justify-between">
                <p className="max-w-[70%] text-[8px] leading-relaxed text-zinc-600">
                  This card is property of {bank}. Use subject to the
                  cardholder agreement. If found, please return to any branch.
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                  {bank}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default Payment_01;
