"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Laptop,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ThemeChoice = "light" | "dark" | "system";

export type UserMenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  kbd?: string;
};

const THEME_OPTIONS: { value: ThemeChoice; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

const DEFAULT_ITEMS: UserMenuItem[] = [
  { icon: UserRound, label: "Profile", kbd: "⇧⌘P" },
  { icon: CreditCard, label: "Billing", kbd: "⌘B" },
  { icon: Settings, label: "Settings", kbd: "⌘," },
  { icon: Bell, label: "Notifications", kbd: "⌘N" },
];

const itemClasses = cn(
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium",
  "text-zinc-600 transition-colors duration-200 hover:bg-zinc-100/80 hover:text-zinc-900 active:bg-zinc-200/70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
  "dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 dark:active:bg-zinc-800/80 dark:focus-visible:ring-zinc-600"
);

const User_01 = ({
  name = "Maya Patel",
  email = "maya@acme.com",
  avatar = "/avatars/avatar-03.svg",
  plan = "Pro",
  items = DEFAULT_ITEMS,
  defaultOpen = true,
  onItemSelect,
  onThemeChange,
  onSignOut,
  className,
}: {
  name?: string;
  email?: string;
  avatar?: string;
  plan?: string;
  items?: UserMenuItem[];
  /** Whether the menu panel starts open. */
  defaultOpen?: boolean;
  /** Called with the item label when a menu item is pressed. */
  onItemSelect?: (label: string) => void;
  onThemeChange?: (theme: ThemeChoice) => void;
  onSignOut?: () => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [theme, setTheme] = useState<ThemeChoice>("system");
  const [online, setOnline] = useState(true);

  return (
    <div className={cn("flex w-full max-w-[280px] flex-col items-end gap-2", className)}>
      {/* Avatar trigger */}
      <button
        type="button"
        aria-label={`${open ? "Close" : "Open"} menu for ${name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full ring-2 ring-transparent transition-all duration-200 hover:ring-zinc-300 focus-visible:outline-none focus-visible:ring-zinc-400 active:scale-95 dark:hover:ring-zinc-700 dark:focus-visible:ring-zinc-600"
      >
        <img
          src={avatar}
          alt=""
          className="h-9 w-9 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence initial={false}>
        {open && (
      <motion.div
        role="menu"
        aria-label="User menu"
        initial={{ opacity: 0, y: -6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "w-full origin-top-right rounded-2xl p-1.5",
          "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.35)]",
          "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
        )}
      >
        {/* User header */}
        <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5">
          <img
            src={avatar}
            alt=""
            className="h-10 w-10 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                {name}
              </p>
              <span className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                {plan}
              </span>
            </div>
            <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">{email}</p>
          </div>
        </div>

        <div aria-hidden className="mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Menu items */}
        <div className="space-y-0.5">
          {items.map(({ icon: Icon, label, kbd }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              onClick={() => onItemSelect?.(label)}
              className={itemClasses}
            >
              <Icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" aria-hidden />
              <span className="flex-1">{label}</span>
              {kbd ? (
                <kbd className="font-mono text-[10px] tracking-wide text-zinc-300 dark:text-zinc-600">
                  {kbd}
                </kbd>
              ) : null}
            </button>
          ))}
        </div>

        <div aria-hidden className="mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Theme segmented control */}
        <div className="px-2.5 py-2">
          <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            Theme
          </p>
          <div
            role="radiogroup"
            aria-label="Theme"
            className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(value);
                    onThemeChange?.(value);
                  }}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium",
                    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
                    active
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="xui-user01-theme-thumb"
                      aria-hidden
                      className="absolute inset-0 rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <Icon className="relative h-3 w-3" aria-hidden />
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status toggle row */}
        <button
          type="button"
          role="menuitemcheckbox"
          aria-checked={online}
          onClick={() => setOnline((o) => !o)}
          className={itemClasses}
        >
          <span aria-hidden className="relative flex h-3.5 w-3.5 items-center justify-center">
            {online && (
              <span className="absolute h-2 w-2 rounded-full bg-emerald-500/30 motion-safe:animate-ping" />
            )}
            <span
              className={cn(
                "relative h-2 w-2 rounded-full transition-colors duration-200",
                online ? "bg-emerald-500" : "bg-amber-400"
              )}
            />
          </span>
          <span className="flex-1">Status</span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            {online ? "Online" : "Away"}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" aria-hidden />
        </button>

        <div aria-hidden className="mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-900" />

        {/* Sign out */}
        <button
          type="button"
          role="menuitem"
          onClick={() => onSignOut?.()}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium",
            "text-rose-500 transition-colors duration-200 hover:bg-rose-500/10 active:bg-rose-500/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400",
            "dark:text-rose-400 dark:hover:bg-rose-500/10 dark:active:bg-rose-500/20"
          )}
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          <span className="flex-1">Sign out</span>
          <kbd className="font-mono text-[10px] tracking-wide text-rose-300 dark:text-rose-500/50">
            ⇧⌘Q
          </kbd>
        </button>
      </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default User_01;
