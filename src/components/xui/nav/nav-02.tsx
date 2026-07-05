"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Nav_02 = ({
  links = ["Overview", "Features", "Pricing", "Blog"],
  defaultActive = 0,
  onChange,
  className,
}: {
  links?: string[];
  defaultActive?: number;
  onChange?: (index: number, link: string) => void;
  className?: string;
}) => {
  const [active, setActive] = useState(defaultActive);
  const layoutId = useId();

  return (
    <div className={cn("flex w-full max-w-xl justify-center py-4", className)}>
      <nav
        aria-label="Primary"
        className="relative flex max-w-full flex-wrap items-center justify-center gap-1 rounded-[26px] border border-zinc-200 bg-white/90 p-1.5 shadow-[0_12px_40px_-16px_rgba(24,24,27,0.3)] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-[0_16px_50px_-16px_rgba(0,0,0,0.8)]"
      >
        {links.map((link, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={link}
              type="button"
              whileTap={{ scale: 0.96 }}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                setActive(i);
                onChange?.(i, link);
              }}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:px-4",
                isActive
                  ? "text-white dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-sky-600 shadow-[0_4px_12px_-2px_rgba(2,132,199,0.45)] dark:bg-sky-500 dark:shadow-[0_4px_16px_-2px_rgba(56,189,248,0.35)]"
                />
              )}
              <span className="relative z-10">{link}</span>
            </motion.button>
          );
        })}
        {/* Hairline top highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/20"
        />
      </nav>
    </div>
  );
};

export default Nav_02;
