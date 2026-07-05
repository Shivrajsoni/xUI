"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Copy,
  Download,
  FileCode2,
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FileKind = "folder" | "code" | "image" | "doc";

export interface FileNode {
  id: string;
  name: string;
  kind: FileKind;
  size?: string;
  modified: string;
  children?: FileNode[];
}

const defaultFiles: FileNode[] = [
  {
    id: "f1",
    name: "design-system",
    kind: "folder",
    modified: "2 hours ago",
    children: [
      { id: "f1a", name: "tokens.json", kind: "code", size: "18 KB", modified: "2 hours ago" },
      { id: "f1b", name: "buttons.fig", kind: "image", size: "4.2 MB", modified: "yesterday" },
      { id: "f1c", name: "guidelines.md", kind: "doc", size: "9 KB", modified: "3 days ago" },
    ],
  },
  {
    id: "f2",
    name: "marketing-site",
    kind: "folder",
    modified: "yesterday",
    children: [
      { id: "f2a", name: "hero.tsx", kind: "code", size: "6 KB", modified: "yesterday" },
      { id: "f2b", name: "og-image.png", kind: "image", size: "812 KB", modified: "4 days ago" },
    ],
  },
  { id: "f3", name: "roadmap-q3.md", kind: "doc", size: "14 KB", modified: "Jun 30" },
  { id: "f4", name: "analytics.ts", kind: "code", size: "22 KB", modified: "Jun 27" },
  { id: "f5", name: "team-photo.jpg", kind: "image", size: "2.8 MB", modified: "Jun 24" },
];

const kindIcon: Record<Exclude<FileKind, "folder">, { icon: typeof FileText; color: string }> = {
  code: { icon: FileCode2, color: "text-sky-500" },
  image: { icon: FileImage, color: "text-violet-500" },
  doc: { icon: FileText, color: "text-zinc-400 dark:text-zinc-500" },
};

export interface Table_04Props {
  files?: FileNode[];
  path?: string[];
  onAction?: (action: "download" | "duplicate" | "delete", file: FileNode) => void;
  className?: string;
}

const menuActions = [
  { id: "download", label: "Download", icon: Download },
  { id: "duplicate", label: "Duplicate", icon: Copy },
  { id: "delete", label: "Delete", icon: Trash2, danger: true },
] as const;

const Table_04 = ({
  files = defaultFiles,
  path = ["Workspace", "Projects"],
  onAction,
  className,
}: Table_04Props) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["f1"]));
  const [selected, setSelected] = useState<string | null>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuFor) return;
    const close = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setMenuFor(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenuFor(null);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [menuFor]);

  const toggleFolder = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const renderRow = (file: FileNode, depth: number) => {
    const isFolder = file.kind === "folder";
    const isOpen = expanded.has(file.id);
    const isSelected = selected === file.id;
    const Icon = isFolder
      ? isOpen
        ? FolderOpen
        : Folder
      : kindIcon[file.kind as Exclude<FileKind, "folder">].icon;
    const iconColor = isFolder
      ? "text-amber-500"
      : kindIcon[file.kind as Exclude<FileKind, "folder">].color;

    return (
      <React.Fragment key={file.id}>
        <div
          role="row"
          className={cn(
            "group relative flex items-center gap-2.5 rounded-lg py-2 pr-1 transition-colors duration-150",
            isSelected
              ? "bg-sky-500/[0.07] dark:bg-sky-500/[0.1]"
              : "hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
          )}
          style={{ paddingLeft: `${8 + depth * 20}px` }}
        >
          <button
            type="button"
            onClick={() => {
              setSelected(file.id);
              if (isFolder) toggleFolder(file.id);
            }}
            aria-expanded={isFolder ? isOpen : undefined}
            aria-label={isFolder ? `${isOpen ? "Collapse" : "Expand"} ${file.name}` : `Select ${file.name}`}
            className="flex min-w-0 flex-1 items-center gap-2.5 rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.995]"
          >
            {isFolder ? (
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex shrink-0"
                aria-hidden
              >
                <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
              </motion.span>
            ) : (
              <span className="w-3.5 shrink-0" aria-hidden />
            )}
            <Icon className={cn("h-4 w-4 shrink-0", iconColor)} aria-hidden />
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
              {file.name}
            </span>
            <span className="hidden w-16 shrink-0 text-right font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-600 sm:block">
              {file.size ?? "—"}
            </span>
            <span className="hidden w-20 shrink-0 truncate text-right text-[11px] text-zinc-400 dark:text-zinc-600 sm:block">
              {file.modified}
            </span>
          </button>

          {/* Kebab */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuFor((m) => (m === file.id ? null : file.id));
              }}
              aria-label={`Actions for ${file.name}`}
              aria-expanded={menuFor === file.id}
              aria-haspopup="menu"
              className={cn(
                "rounded-md p-1 text-zinc-400 transition-all hover:bg-zinc-200/60 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
                menuFor === file.id
                  ? "opacity-100"
                  : "opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
              )}
            >
              <MoreVertical className="h-3.5 w-3.5" aria-hidden />
            </button>
            <AnimatePresence>
              {menuFor === file.id && (
                <motion.div
                  role="menu"
                  aria-label={`${file.name} actions`}
                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className="absolute right-0 top-7 z-20 w-36 origin-top-right rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {menuActions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onAction?.(action.id, file);
                        setMenuFor(null);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]",
                        "danger" in action && action.danger
                          ? "text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
                          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      )}
                    >
                      <action.icon className="h-3.5 w-3.5" aria-hidden />
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Children */}
        {isFolder && (
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 34 }}
                className="overflow-hidden"
              >
                {file.children?.map((child) => renderRow(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </React.Fragment>
    );
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 border-b border-zinc-100 px-4 py-3 text-xs dark:border-zinc-900"
      >
        {path.map((segment, i) => (
          <React.Fragment key={segment}>
            {i > 0 && (
              <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-700" aria-hidden />
            )}
            <span
              aria-current={i === path.length - 1 ? "page" : undefined}
              className={cn(
                i === path.length - 1
                  ? "font-semibold text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {segment}
            </span>
          </React.Fragment>
        ))}
        <span className="ml-auto font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-600">
          {files.length} items
        </span>
      </nav>

      {/* Rows */}
      <div role="table" aria-label="Files" className="p-2">
        {files.map((file) => renderRow(file, 0))}
      </div>
    </div>
  );
};

export default Table_04;
