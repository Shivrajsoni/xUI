"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Modal_01Props {
  /** Name the user must type to arm the delete button. */
  resourceName?: string;
  /** Human label for the kind of resource being deleted. */
  resourceType?: string;
  onDelete?: (name: string) => void;
  onCancel?: () => void;
  className?: string;
}

type Phase = "idle" | "deleting" | "done";

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

const Modal_01 = ({
  resourceName = "acme-website",
  resourceType = "project",
  onDelete,
  onCancel,
  className,
}: Modal_01Props) => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const matches = value.trim() === resourceName;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const close = (cancelled: boolean) => {
    if (cancelled) onCancel?.();
    setOpen(false);
    setValue("");
    setPhase("idle");
  };

  const handleDelete = () => {
    if (!matches || phase !== "idle") return;
    setPhase("deleting");
    onDelete?.(resourceName);
    timers.current.push(setTimeout(() => setPhase("done"), 1300));
    timers.current.push(setTimeout(() => close(false), 2200));
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[420px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      {/* Re-open trigger, shown once the dialog is dismissed */}
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
        <Trash2 aria-hidden className="h-3.5 w-3.5 text-rose-500" />
        Delete {resourceType}
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
              aria-labelledby="modal-01-title"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={spring}
              className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_-24px_rgba(24,24,27,0.5)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 ring-1 ring-inset ring-rose-500/20">
                <Trash2 aria-hidden className="h-5 w-5 text-rose-500" />
              </div>

              <h2
                id="modal-01-title"
                className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Delete this {resourceType}?
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  {resourceName}
                </span>{" "}
                and all of its deployments, domains and analytics will be
                permanently removed. This action cannot be undone.
              </p>

              <label
                htmlFor="modal-01-confirm"
                className="mt-4 block text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Type{" "}
                <span className="font-mono text-zinc-900 dark:text-zinc-200">
                  {resourceName}
                </span>{" "}
                to confirm
              </label>
              <Input
                id="modal-01-confirm"
                value={value}
                disabled={phase !== "idle"}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                autoComplete="off"
                spellCheck={false}
                placeholder={resourceName}
                className={cn(
                  "mt-1.5 h-9 font-mono text-xs transition-shadow",
                  matches &&
                    "border-rose-500/50 focus-visible:ring-rose-500/40 dark:border-rose-500/40"
                )}
              />

              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={phase === "deleting"}
                  onClick={() => close(true)}
                  className="h-9 flex-1 text-xs transition-transform duration-150 active:scale-[0.97]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={!matches || phase !== "idle"}
                  onClick={handleDelete}
                  className={cn(
                    "h-9 flex-1 overflow-hidden text-xs transition-transform duration-150 active:scale-[0.97]",
                    "bg-rose-600 text-white hover:bg-rose-600/90 focus-visible:ring-rose-500 disabled:opacity-50",
                    "dark:bg-rose-600 dark:text-white dark:hover:bg-rose-500",
                    phase === "done" &&
                      "bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-600"
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {phase === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={spring}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Trash2 aria-hidden className="h-3.5 w-3.5" />
                        Delete {resourceType}
                      </motion.span>
                    )}
                    {phase === "deleting" && (
                      <motion.span
                        key="deleting"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={spring}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin" />
                        Deleting…
                      </motion.span>
                    )}
                    {phase === "done" && (
                      <motion.span
                        key="done"
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={spring}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check aria-hidden className="h-3.5 w-3.5" />
                        Deleted
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal_01;
