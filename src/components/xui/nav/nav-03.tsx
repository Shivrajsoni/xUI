"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CreditCard,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  icon: React.ElementType;
  label: string;
  badge?: number;
};

type NavItem = SidebarNavItem;

const WORKSPACE_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Inbox, label: "Inbox", badge: 12 },
  { icon: FolderKanban, label: "Projects" },
  { icon: Users, label: "Members" },
];

const SETTINGS_ITEMS: NavItem[] = [
  { icon: Settings, label: "General" },
  { icon: CreditCard, label: "Billing" },
  { icon: Shield, label: "Security" },
  { icon: Bell, label: "Notifications" },
];

const Nav_03 = ({
  workspace = "Northwind",
  plan = "Pro plan",
  userName = "Maya Patel",
  userRole = "Design Lead",
  avatarSrc = "/avatars/avatar-01.svg",
  workspaceItems = WORKSPACE_ITEMS,
  settingsItems = SETTINGS_ITEMS,
  defaultActive = "Inbox",
  onNavigate,
  onUserMenuClick,
  className,
}: {
  workspace?: string;
  plan?: string;
  userName?: string;
  userRole?: string;
  avatarSrc?: string;
  workspaceItems?: SidebarNavItem[];
  settingsItems?: SidebarNavItem[];
  defaultActive?: string;
  onNavigate?: (label: string) => void;
  onUserMenuClick?: () => void;
  className?: string;
}) => {
  const [active, setActive] = useState(defaultActive);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const renderItem = (item: NavItem) => {
    const isActive = active === item.label;
    return (
      <button
        key={item.label}
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => {
          setActive(item.label);
          onNavigate?.(item.label);
        }}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          isActive
            ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.07] dark:text-zinc-50"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
        )}
      >
        <item.icon
          aria-hidden
          className={cn(
            "h-4 w-4 shrink-0 transition-colors duration-200",
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
          )}
        />
        <span className="truncate">{item.label}</span>
        {item.badge !== undefined && (
          <span className="ml-auto rounded-full bg-indigo-50 px-1.5 py-px font-mono text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-[500px] w-full max-w-64 flex-col rounded-2xl border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Brand row */}
      <div className="flex items-center gap-2.5 border-b border-zinc-100 px-4 py-3.5 dark:border-white/[0.06]">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_4px_12px_-2px_rgba(99,102,241,0.5)]">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-50">
            {workspace}
          </p>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600">
            {plan}
          </p>
        </div>
      </div>

      {/* Nav sections */}
      <nav aria-label="Sidebar" className="flex-1 overflow-y-auto px-2.5 py-3">
        <p className="px-2.5 pb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          Workspace
        </p>
        <div className="space-y-0.5">{workspaceItems.map(renderItem)}</div>

        <button
          type="button"
          aria-expanded={settingsOpen}
          onClick={() => setSettingsOpen((v) => !v)}
          className="mt-4 flex w-full items-center justify-between rounded-md px-2.5 pb-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            Settings
          </span>
          <motion.span
            animate={{ rotate: settingsOpen ? 0 : -90 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="text-zinc-400 dark:text-zinc-600"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {settingsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="overflow-hidden"
            >
              <div className="space-y-0.5 pb-1">
                {settingsItems.map(renderItem)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* User row */}
      <div className="flex items-center gap-2.5 border-t border-zinc-100 px-3 py-3 dark:border-white/[0.06]">
        <img
          src={avatarSrc}
          alt=""
          className="h-8 w-8 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-700"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
            {userName}
          </p>
          <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-500">
            {userRole}
          </p>
        </div>
        <motion.button
          type="button"
          aria-label="User menu"
          whileTap={{ scale: 0.92 }}
          onClick={onUserMenuClick}
          className="rounded-md p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden />
        </motion.button>
      </div>
    </aside>
  );
};

export default Nav_03;
