"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Globe,
  Mail,
  Music,
  Terminal,
  Trello,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DockApp = {
  icon: React.ElementType;
  label: string;
  gradient: string;
  active?: boolean;
};

const APPS: DockApp[] = [
  {
    icon: Mail,
    label: "Mail",
    gradient: "from-sky-400 to-blue-600",
    active: true,
  },
  { icon: Calendar, label: "Calendar", gradient: "from-rose-400 to-red-600" },
  { icon: Music, label: "Music", gradient: "from-fuchsia-400 to-pink-600" },
  {
    icon: Terminal,
    label: "Terminal",
    gradient: "from-zinc-600 to-zinc-900",
    active: true,
  },
  { icon: Trello, label: "Boards", gradient: "from-indigo-400 to-violet-600" },
  { icon: Globe, label: "Browser", gradient: "from-emerald-400 to-teal-600" },
];

const BASE = 40;
const PEAK = 68;
const RANGE = 130;

const DockIcon = ({
  app,
  running,
  mouseX,
  hovered,
  onHover,
  onSelect,
}: {
  app: DockApp;
  running: boolean;
  mouseX: MotionValue<number>;
  hovered: boolean;
  onHover: (label: string | null) => void;
  onSelect: (label: string) => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return RANGE;
    return val - (bounds.x + bounds.width / 2);
  });

  const sizeSync = useTransform(distance, [-RANGE, 0, RANGE], [BASE, PEAK, BASE]);
  const size = useSpring(sizeSync, { stiffness: 380, damping: 26 });
  const lift = useTransform(size, [BASE, PEAK], [0, -10]);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="pointer-events-none absolute -top-9 z-10 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {app.label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        type="button"
        aria-label={`Open ${app.label}`}
        aria-pressed={running}
        style={{ width: size, height: size, y: lift }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onSelect(app.label)}
        onMouseEnter={() => onHover(app.label)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(app.label)}
        onBlur={() => onHover(null)}
        className={cn(
          "relative flex items-center justify-center rounded-[14px] bg-gradient-to-br text-white",
          "shadow-[0_8px_20px_-8px_rgba(24,24,27,0.5),inset_0_1px_0_rgba(255,255,255,0.35)]",
          "transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          app.gradient
        )}
      >
        <app.icon aria-hidden className="h-[45%] w-[45%] drop-shadow-sm" />
      </motion.button>

      {/* Running-app indicator */}
      <span
        aria-hidden
        className={cn(
          "mt-1.5 h-1 w-1 rounded-full transition-opacity duration-200",
          running ? "bg-zinc-500 opacity-100 dark:bg-zinc-300" : "opacity-0"
        )}
      />
    </div>
  );
};

const Nav_04 = ({
  apps = APPS,
  onAppSelect,
  className,
}: {
  apps?: DockApp[];
  onAppSelect?: (label: string) => void;
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const [hovered, setHovered] = useState<string | null>(null);
  const [running, setRunning] = useState<string[]>(() =>
    apps.filter((a) => a.active).map((a) => a.label)
  );

  const handleSelect = (label: string) => {
    setRunning((r) =>
      r.includes(label) ? r.filter((l) => l !== label) : [...r, label]
    );
    onAppSelect?.(label);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-2xl items-end justify-center pb-4 pt-16",
        className
      )}
    >
      <motion.div
        role="toolbar"
        aria-label="Application dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setHovered(null);
        }}
        className="flex max-w-full items-end gap-2 rounded-2xl border border-zinc-200/80 bg-white/60 px-3 pb-2 pt-3 shadow-[0_20px_50px_-20px_rgba(24,24,27,0.35)] backdrop-blur-xl sm:gap-3 sm:px-4 dark:border-white/[0.1] dark:bg-zinc-900/50 dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)]"
      >
        {apps.map((app) => (
          <DockIcon
            key={app.label}
            app={app}
            running={running.includes(app.label)}
            mouseX={mouseX}
            hovered={hovered === app.label}
            onHover={setHovered}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Nav_04;
