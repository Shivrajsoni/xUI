"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Nextjs from "@/components/icons/nextjs";
import ReactIcon from "@/components/icons/react";
import ShadcnIcon from "@/components/icons/shadcn";

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 54 33" className={className} role="img" aria-labelledby="tw-title">
    <title id="tw-title">Tailwind CSS</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
      clipRule="evenodd"
    />
  </svg>
);

const stack = [
  {
    name: "Tailwind CSS",
    sub: "v4",
    icon: TailwindIcon,
    accent: "group-hover:text-sky-500",
    glow: "group-hover:shadow-[0_16px_40px_-12px_rgba(56,189,248,0.45)]",
  },
  {
    name: "shadcn/ui",
    sub: "registry",
    icon: ShadcnIcon,
    accent: "group-hover:text-zinc-900 dark:group-hover:text-white",
    glow: "group-hover:shadow-[0_16px_40px_-12px_rgba(113,113,122,0.45)]",
  },
  {
    name: "Next.js",
    sub: "16",
    icon: Nextjs,
    accent: "group-hover:text-zinc-900 dark:group-hover:text-white",
    glow: "group-hover:shadow-[0_16px_40px_-12px_rgba(113,113,122,0.45)]",
  },
  {
    name: "React",
    sub: "19",
    icon: ReactIcon,
    accent: "group-hover:text-cyan-500",
    glow: "group-hover:shadow-[0_16px_40px_-12px_rgba(34,211,238,0.45)]",
  },
];

export default function Features() {
  return (
    <div className="w-full">
      <p className="mb-7 text-center font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
        Built on the tools you already use
      </p>
      <div className="mx-auto flex max-w-lg items-start justify-center gap-7 sm:gap-12">
        {stack.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center gap-2.5"
            >
              {/* Each icon floats on its own gentle cycle, offset per item */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.55,
                }}
                whileHover={{ scale: 1.12, y: -4 }}
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl",
                  "border border-zinc-200/80 bg-white/80 shadow-[0_10px_30px_-14px_rgba(24,24,27,0.3)] backdrop-blur",
                  "dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[0_10px_30px_-14px_rgba(0,0,0,0.8)]",
                  "transition-shadow duration-300",
                  item.glow
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 text-zinc-500 transition-colors duration-300 dark:text-zinc-400",
                    item.accent
                  )}
                />
              </motion.div>
              <span className="flex flex-col items-center leading-tight">
                <span className="text-[11px] font-medium text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100 sm:text-xs">
                  {item.name}
                </span>
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-600">
                  {item.sub}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
