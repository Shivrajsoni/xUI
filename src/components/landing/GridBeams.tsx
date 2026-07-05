"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CELL = 56;

/**
 * Interactive cross-line grid for the hero.
 * - Hairline grid fading to nothing at every boundary.
 * - A glowing patch of grid follows the cursor.
 * - Lightning threads fire along the grid lines nearest the pointer,
 *   and ambient threads keep sweeping on their own (also while scrolling).
 */
export default function GridBeams() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) setPos(null);
      else setPos({ x, y });
    };
    const leave = () => setPos(null);
    // Scrolling shifts the section under a still cursor — re-fire from the
    // last known pointer position so threads track while scrolling too.
    const scroll = () => {
      if (lastEvent.current) move(lastEvent.current);
    };
    const lastEvent = { current: null as PointerEvent | null };
    const remember = (e: PointerEvent) => {
      lastEvent.current = e;
      move(e);
    };

    window.addEventListener("pointermove", remember, { passive: true });
    window.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", remember);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  // Snap the threads to the nearest grid lines.
  const gx = pos ? Math.round(pos.x / CELL) * CELL : 0;
  const gy = pos ? Math.round(pos.y / CELL) * CELL : 0;

  const gridLight =
    "linear-gradient(to right, rgba(24,24,27,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.13) 1px, transparent 1px)";
  const gridDark =
    "linear-gradient(to right, rgba(250,250,250,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,250,0.10) 1px, transparent 1px)";
  const glowGrid =
    "linear-gradient(to right, rgba(56,189,248,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.55) 1px, transparent 1px)";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(70%_85%_at_50%_35%,black_35%,transparent_92%)]"
    >
      <style>{`
        @keyframes xui-thread-x { 0% { transform: translateX(-100%); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateX(1600%); opacity: 0; } }
        @keyframes xui-thread-y { 0% { transform: translateY(-100%); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateY(1600%); opacity: 0; } }
      `}</style>

      {/* Base cross-line grid */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{ backgroundImage: gridLight, backgroundSize: `${CELL}px ${CELL}px` }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ backgroundImage: gridDark, backgroundSize: `${CELL}px ${CELL}px` }}
      />

      {/* Glowing grid patch revealed around the cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: glowGrid,
          backgroundSize: `${CELL}px ${CELL}px`,
          opacity: pos ? 0.9 : 0,
          WebkitMaskImage: pos
            ? `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent 70%)`
            : undefined,
          maskImage: pos
            ? `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent 70%)`
            : undefined,
        }}
      />
      {/* Soft bloom under the cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(140px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.10), transparent 70%)`
            : undefined,
        }}
      />

      {/* Lightning threads on the grid lines nearest the pointer */}
      <motion.div
        className="absolute inset-y-0 w-px"
        animate={{ x: gx, opacity: pos ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        <div
          className="h-32 w-px bg-gradient-to-b from-transparent via-sky-500 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ animation: "xui-thread-y 2.4s linear infinite" }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 h-px"
        animate={{ y: gy, opacity: pos ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        <div
          className="h-px w-52 bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ animation: "xui-thread-x 2.8s linear infinite" }}
        />
      </motion.div>

      {/* Ambient threads that keep flowing on their own */}
      <div className="absolute inset-y-0 w-px" style={{ left: CELL * 4 }}>
        <div
          className="h-28 w-px bg-gradient-to-b from-transparent via-sky-400/50 to-transparent"
          style={{ animation: "xui-thread-y 7s linear infinite" }}
        />
      </div>
      <div className="absolute inset-y-0 w-px" style={{ right: CELL * 4 }}>
        <div
          className="h-28 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"
          style={{ animation: "xui-thread-y 9s linear infinite", animationDelay: "2.5s" }}
        />
      </div>
      <div className="absolute inset-x-0 h-px" style={{ top: CELL * 3 }}>
        <div
          className="h-px w-48 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
          style={{ animation: "xui-thread-x 8s linear infinite", animationDelay: "1.2s" }}
        />
      </div>
    </div>
  );
}
