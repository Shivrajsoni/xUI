"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Link2,
  Mail,
  Plus,
  QrCode,
  Share2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type SharePermission = "Viewer" | "Editor";

export interface SharePerson {
  name: string;
  email: string;
  avatar: string;
  permission: SharePermission;
  /** Owners keep a fixed label instead of a toggle chip. */
  owner?: boolean;
}

export interface Modal_02Props {
  documentName?: string;
  shareUrl?: string;
  people?: SharePerson[];
  onInvite?: (email: string) => void;
  onPermissionChange?: (email: string, permission: SharePermission) => void;
  className?: string;
}

const defaultPeople: SharePerson[] = [
  {
    name: "Alex Rivera",
    email: "alex@lumina.co",
    avatar: "/avatars/avatar-01.svg",
    permission: "Editor",
    owner: true,
  },
  {
    name: "Sam Chen",
    email: "sam@lumina.co",
    avatar: "/avatars/avatar-02.svg",
    permission: "Editor",
  },
  {
    name: "Maya Patel",
    email: "maya@lumina.co",
    avatar: "/avatars/avatar-03.svg",
    permission: "Viewer",
  },
];

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

const Modal_02 = ({
  documentName = "Q3 Product Roadmap",
  shareUrl = "lumina.co/d/q3-roadmap",
  people: initialPeople = defaultPeople,
  onInvite,
  onPermissionChange,
  className,
}: Modal_02Props) => {
  const [open, setOpen] = useState(true);
  const [people, setPeople] = useState(initialPeople);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`https://${shareUrl}`).catch(() => {});
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const togglePermission = (target: SharePerson) => {
    const next: SharePermission =
      target.permission === "Viewer" ? "Editor" : "Viewer";
    setPeople((prev) =>
      prev.map((p) => (p.email === target.email ? { ...p, permission: next } : p))
    );
    onPermissionChange?.(target.email, next);
  };

  const handleInvite = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    if (people.some((p) => p.email === trimmed)) {
      setEmail("");
      return;
    }
    setPeople((prev) => [
      ...prev,
      {
        name: trimmed.split("@")[0].replace(/[._-]/g, " "),
        email: trimmed,
        avatar: "/avatars/avatar-04.svg",
        permission: "Viewer",
      },
    ]);
    onInvite?.(trimmed);
    setEmail("");
  };

  const exportActions = [
    { icon: Mail, label: "Share via email" },
    { icon: QrCode, label: "Show QR code" },
    { icon: Link2, label: "Embed link" },
    { icon: Download, label: "Export as PDF" },
  ];

  return (
    <div
      className={cn(
        "relative flex min-h-[480px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "gap-2 text-xs transition-transform duration-150 active:scale-[0.97]",
          open && "invisible"
        )}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <Share2 aria-hidden className="h-3.5 w-3.5 text-sky-500" />
        Share document
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-[2px] dark:bg-zinc-950/60"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-02-title"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={spring}
              className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_-24px_rgba(24,24,27,0.5)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2
                    id="modal-02-title"
                    className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                  >
                    Share &ldquo;{documentName}&rdquo;
                  </h2>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Anyone with the link can view
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close share dialog"
                  className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </div>

              {/* Copy link row */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 pl-3 pr-1.5 dark:border-zinc-800 dark:bg-zinc-900">
                <Link2
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                />
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                  {shareUrl}
                </span>
                <div className="relative shrink-0">
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        role="status"
                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={spring}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCopy}
                    aria-label={copied ? "Link copied" : "Copy link"}
                    className={cn(
                      "h-7 gap-1.5 px-2.5 text-[11px] transition-transform duration-150 active:scale-[0.95]",
                      copied
                        ? "bg-emerald-600 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-600"
                        : "bg-sky-600 text-white hover:bg-sky-600/90 focus-visible:ring-sky-500 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-500"
                    )}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={spring}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Check aria-hidden className="h-3 w-3" /> Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={spring}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Copy aria-hidden className="h-3 w-3" /> Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>

              {/* People */}
              <ul className="mt-4 space-y-1" aria-label="People with access">
                {people.map((person) => (
                  <motion.li
                    key={person.email}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring}
                    className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.avatar}
                      alt=""
                      className="h-7 w-7 shrink-0 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium capitalize text-zinc-800 dark:text-zinc-200">
                        {person.name}
                      </p>
                      <p className="truncate text-[10px] text-zinc-400 dark:text-zinc-500">
                        {person.email}
                      </p>
                    </div>
                    {person.owner ? (
                      <span className="shrink-0 px-2 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Owner
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => togglePermission(person)}
                        aria-label={`${person.name}: ${person.permission}. Switch to ${
                          person.permission === "Viewer" ? "Editor" : "Viewer"
                        }`}
                        className={cn(
                          "shrink-0 overflow-hidden rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95",
                          person.permission === "Editor"
                            ? "border-sky-500/30 bg-sky-500/10 text-sky-600 hover:bg-sky-500/15 dark:text-sky-400"
                            : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        )}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={person.permission}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={spring}
                            className="inline-block"
                          >
                            {person.permission}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Invite */}
              <div className="mt-3 flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                  type="email"
                  placeholder="jordan@lumina.co"
                  aria-label="Invite by email"
                  className="h-8 flex-1 text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleInvite}
                  disabled={!email.trim().includes("@")}
                  className="h-8 gap-1 px-3 text-xs transition-transform duration-150 active:scale-[0.96]"
                >
                  <Plus aria-hidden className="h-3.5 w-3.5" /> Add
                </Button>
              </div>

              {/* Export row */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
                {exportActions.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    title={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal_02;
