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
      fill="#38bdf8"
      fillRule="evenodd"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
      clipRule="evenodd"
    />
  </svg>
);

const stack = [
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "shadcn/ui", icon: ShadcnIcon },
  { name: "Next.js", icon: Nextjs },
  { name: "React", icon: ReactIcon },
];

export default function Features() {
  return (
    <div className="w-full">
      <p className="mb-5 text-center text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        Built with the tools you already use
      </p>
      <div className="mx-auto grid max-w-md grid-cols-4 items-start gap-4 sm:gap-8">
        {stack.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="group flex flex-col items-center gap-2 text-zinc-700 dark:text-zinc-300"
            >
              <Icon
                className={cn(
                  "h-7 w-7 transition-transform duration-200 group-hover:scale-110",
                  "text-black dark:text-white"
                )}
              />
              <span className="text-center text-[11px] font-medium text-zinc-500 dark:text-zinc-400 sm:text-xs">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
