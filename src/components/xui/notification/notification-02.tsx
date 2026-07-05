"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastKind = "success" | "error" | "loading";

export type ToastContent = { title: string; description: string };

type Toast = ToastContent & {
  id: number;
  kind: ToastKind;
};

const TOAST_COPY: Record<ToastKind, ToastContent> = {
  success: {
    title: "Payment sent",
    description: "$1,280.00 to Maya Patel arrived instantly.",
  },
  error: {
    title: "Upload failed",
    description: "quarterly-report.pdf exceeded the 25 MB limit.",
  },
  loading: {
    title: "Deploying build",
    description: "v2.14.1 rolling out to production…",
  },
};

const DURATION = 4200;
const MAX_VISIBLE = 3;

function ToastIcon({ kind }: { kind: ToastKind }) {
  if (kind === "success")
    return (
      <CheckCircle2
        className="h-[18px] w-[18px] shrink-0 text-emerald-500"
        aria-hidden
      />
    );
  if (kind === "error")
    return (
      <XCircle className="h-[18px] w-[18px] shrink-0 text-rose-500" aria-hidden />
    );
  return (
    <Loader2
      className="h-[18px] w-[18px] shrink-0 animate-spin text-sky-500"
      aria-hidden
    />
  );
}

const Notification_02 = ({
  title = "Toast stack",
  presets = TOAST_COPY,
  duration = DURATION,
  className,
}: {
  title?: string;
  presets?: Record<ToastKind, ToastContent>;
  duration?: number;
  className?: string;
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const push = useCallback(
    (kind: ToastKind) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, kind, ...presets[kind] }]);
      timers.current.set(
        id,
        setTimeout(() => remove(id), duration)
      );
    },
    [remove, presets, duration]
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-w-lg overflow-hidden rounded-2xl",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(24,24,27,0.06)_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]"
      />

      <div className="relative flex min-h-[340px] flex-col p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {title}
        </span>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => push("success")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-600 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-emerald-400 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10"
          >
            Success
          </button>
          <button
            type="button"
            onClick={() => push("error")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-rose-400 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10"
          >
            Error
          </button>
          <button
            type="button"
            onClick={() => push("loading")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-600 shadow-sm transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-sky-400 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10"
          >
            Loading
          </button>
        </div>

        {toasts.length === 0 && (
          <p className="mt-auto mb-auto self-center text-xs text-zinc-300 dark:text-zinc-700">
            Fire a toast to see the stack
          </p>
        )}

        {/* Stack anchored bottom-right */}
        <div
          className="pointer-events-none absolute inset-x-5 bottom-5 flex justify-end"
          aria-live="polite"
        >
          <div className="relative h-[84px] w-full max-w-[320px]">
            <AnimatePresence>
              {toasts.map((toast, i) => {
                const fromFront = toasts.length - 1 - i; // 0 = newest
                if (fromFront >= MAX_VISIBLE + 1) return null;
                const hidden = fromFront >= MAX_VISIBLE;
                return (
                  <motion.div
                    key={toast.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{
                      opacity: hidden ? 0 : 1,
                      y: fromFront * -12,
                      scale: 1 - fromFront * 0.05,
                      zIndex: 10 - fromFront,
                    }}
                    exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ transformOrigin: "bottom center" }}
                    className="pointer-events-auto absolute inset-x-0 bottom-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_12px_40px_-12px_rgba(24,24,27,0.3)] dark:border-zinc-700/80 dark:bg-zinc-900 dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-start gap-3 p-3.5">
                      <ToastIcon kind={toast.kind} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium leading-tight text-zinc-900 dark:text-zinc-50">
                          {toast.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {toast.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(toast.id)}
                        aria-label="Dismiss notification"
                        className="rounded-md p-0.5 text-zinc-300 transition-colors duration-200 hover:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {/* Auto-dismiss progress hairline */}
                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: duration / 1000, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                      className={cn(
                        "h-px w-full",
                        toast.kind === "success" && "bg-emerald-500/60",
                        toast.kind === "error" && "bg-rose-500/60",
                        toast.kind === "loading" && "bg-sky-500/60"
                      )}
                      aria-hidden
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification_02;
