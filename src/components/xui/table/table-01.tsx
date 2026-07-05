"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, Check, ChevronUp, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MemberStatus = "active" | "pending" | "offline";

export interface TableRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: MemberStatus;
  /** Monthly revenue in dollars */
  mrr: number;
}

export type SortKey = "name" | "role" | "status" | "mrr";

const defaultRows: TableRow[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@acme.io",
    avatar: "/avatars/avatar-01.svg",
    role: "Engineering",
    status: "active",
    mrr: 4820,
  },
  {
    id: "u2",
    name: "Sam Chen",
    email: "sam@acme.io",
    avatar: "/avatars/avatar-02.svg",
    role: "Design",
    status: "pending",
    mrr: 1290,
  },
  {
    id: "u3",
    name: "Maya Patel",
    email: "maya@acme.io",
    avatar: "/avatars/avatar-03.svg",
    role: "Product",
    status: "active",
    mrr: 3675,
  },
  {
    id: "u4",
    name: "Jordan Lee",
    email: "jordan@acme.io",
    avatar: "/avatars/avatar-04.svg",
    role: "Marketing",
    status: "offline",
    mrr: 940,
  },
  {
    id: "u5",
    name: "Priya Sharma",
    email: "priya@acme.io",
    avatar: "/avatars/avatar-02.svg",
    role: "Engineering",
    status: "active",
    mrr: 5210,
  },
];

const statusStyles: Record<MemberStatus, { dot: string; pill: string; label: string }> = {
  active: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    label: "Active",
  },
  pending: {
    dot: "bg-amber-500",
    pill: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    label: "Pending",
  },
  offline: {
    dot: "bg-zinc-400 dark:bg-zinc-600",
    pill: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400",
    label: "Offline",
  },
};

const statusOrder: Record<MemberStatus, number> = { active: 0, pending: 1, offline: 2 };

function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-950",
        "active:scale-90",
        checked || indeterminate
          ? "border-sky-600 bg-sky-600 text-white dark:border-sky-500 dark:bg-sky-500"
          : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
      )}
    >
      <AnimatePresence initial={false}>
        {(checked || indeterminate) && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center justify-center"
          >
            {indeterminate && !checked ? (
              <span className="h-0.5 w-2 rounded-full bg-white" />
            ) : (
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export interface Table_01Props {
  rows?: TableRow[];
  onArchive?: (ids: string[]) => void;
  onDelete?: (ids: string[]) => void;
  className?: string;
}

const Table_01 = ({ rows = defaultRows, onArchive, onDelete, className }: Table_01Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let d = 0;
      if (sortKey === "mrr") d = a.mrr - b.mrr;
      else if (sortKey === "status") d = statusOrder[a.status] - statusOrder[b.status];
      else d = a[sortKey].localeCompare(b[sortKey]);
      return asc ? d : -d;
    });
    return copy;
  }, [rows, sortKey, asc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const toggleRow = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allSelected = selected.size === rows.length && rows.length > 0;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));

  const clear = () => setSelected(new Set());

  const headerCell = (key: SortKey, title: string, alignRight?: boolean) => (
    <th scope="col" className={cn("px-3 py-2.5 first:pl-4", alignRight && "text-right")}>
      <button
        type="button"
        onClick={() => toggleSort(key)}
        aria-label={`Sort by ${title}, ${sortKey === key && asc ? "descending" : "ascending"}`}
        className={cn(
          "group inline-flex items-center gap-1 rounded text-[11px] font-medium uppercase tracking-wider transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          "active:scale-95",
          sortKey === key
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
        )}
      >
        {title}
        <motion.span
          animate={{
            rotate: sortKey === key && !asc ? 180 : 0,
            opacity: sortKey === key ? 1 : 0,
            scale: sortKey === key ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="inline-flex"
          aria-hidden
        >
          <ChevronUp className="h-3 w-3" />
        </motion.span>
      </button>
    </th>
  );

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Team members</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{rows.length} people</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-900">
              <th scope="col" className="w-10 py-2.5 pl-4">
                <Checkbox
                  checked={allSelected}
                  indeterminate={selected.size > 0 && !allSelected}
                  onChange={toggleAll}
                  label={allSelected ? "Deselect all rows" : "Select all rows"}
                />
              </th>
              {headerCell("name", "Member")}
              {headerCell("role", "Team")}
              {headerCell("status", "Status")}
              {headerCell("mrr", "MRR", true)}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const isSelected = selected.has(row.id);
              const status = statusStyles[row.status];
              return (
                <tr
                  key={row.id}
                  onClick={() => toggleRow(row.id)}
                  className={cn(
                    "cursor-pointer border-b border-zinc-50 transition-colors duration-150 last:border-b-0 dark:border-zinc-900/60",
                    isSelected
                      ? "bg-sky-500/[0.06] dark:bg-sky-500/[0.08]"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  )}
                >
                  <td className="py-2.5 pl-4">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      label={`Select ${row.name}`}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={row.avatar}
                        alt=""
                        className="h-7 w-7 shrink-0 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                          {row.name}
                        </p>
                        <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
                          {row.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {row.role}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
                        status.pill
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} aria-hidden />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 pr-4 text-right font-mono text-xs tabular-nums text-zinc-700 dark:text-zinc-300">
                    ${row.mrr.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bulk actions bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: 56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 56, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95"
          >
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="font-mono tabular-nums">{selected.size}</span> selected
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onArchive?.([...selected])}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <Archive className="h-3.5 w-3.5" aria-hidden />
                Archive
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete?.([...selected]);
                  clear();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-95 dark:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                Delete
              </button>
              <button
                type="button"
                onClick={clear}
                aria-label="Clear selection"
                className="ml-1 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Table_01;
