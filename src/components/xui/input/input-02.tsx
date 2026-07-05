"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  FileArchive,
  FileImage,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadFile = {
  id: string;
  name: string;
  size: number;
  kind: "image" | "doc" | "archive";
  progress: number; // 0-100
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const kindFor = (name: string): UploadFile["kind"] => {
  if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) return "image";
  if (/\.(zip|tar|gz|rar)$/i.test(name)) return "archive";
  return "doc";
};

const KindIcon = ({ kind }: { kind: UploadFile["kind"] }) => {
  const Icon =
    kind === "image" ? FileImage : kind === "archive" ? FileArchive : FileText;
  return <Icon className="h-4 w-4" aria-hidden />;
};

const seedFiles: UploadFile[] = [
  {
    id: "seed-1",
    name: "brand-guidelines.pdf",
    size: 2.4 * 1024 * 1024,
    kind: "doc",
    progress: 100,
  },
  {
    id: "seed-2",
    name: "hero-cover.png",
    size: 840 * 1024,
    kind: "image",
    progress: 100,
  },
];

export type Input02Props = {
  title?: string;
  /** Short note next to the title, e.g. the upload limit. */
  limitNote?: string;
  /** Helper copy inside the drop zone. */
  hint?: string;
  /** Files shown on first render. */
  initialFiles?: UploadFile[];
  /** Called when files are added or removed (not on progress ticks). */
  onFilesChange?: (files: UploadFile[]) => void;
  className?: string;
};

const Input_02 = ({
  title = "Upload assets",
  limitNote = "Max 25 MB",
  hint = "PNG, PDF, ZIP up to 25 MB each",
  initialFiles = seedFiles,
  onFilesChange,
  className,
}: Input02Props) => {
  const [files, setFiles] = useState<UploadFile[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearInterval(t));
  }, []);

  const addFiles = (incoming: { name: string; size: number }[]) => {
    const next: UploadFile[] = incoming.map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      size: f.size,
      kind: kindFor(f.name),
      progress: 0,
    }));
    const merged = [...files, ...next];
    setFiles(merged);
    onFilesChange?.(merged);
    next.forEach((file) => {
      const timer = window.setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, progress: Math.min(100, f.progress + 9 + Math.random() * 14) }
              : f
          )
        );
      }, 180);
      timersRef.current.push(timer);
      window.setTimeout(() => window.clearInterval(timer), 2600);
    });
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const dropped = Array.from(event.dataTransfer.files).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    if (dropped.length) addFiles(dropped);
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          {limitNote}
        </span>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-7 text-center transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
          dragging
            ? "border-sky-500 bg-sky-500/5 dark:border-sky-400 dark:bg-sky-400/5"
            : "border-zinc-300 bg-zinc-50/60 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        )}
      >
        <motion.span
          animate={dragging ? { y: [0, -6, 0] } : { y: 0 }}
          transition={
            dragging
              ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 300, damping: 25 }
          }
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200",
            dragging
              ? "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400"
              : "border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
          )}
        >
          <UploadCloud className="h-5 w-5" aria-hidden />
        </motion.span>
        <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          {dragging ? "Drop to upload" : "Drag files here or click to browse"}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {hint}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? []).map((f) => ({
            name: f.name,
            size: f.size,
          }));
          if (picked.length) addFiles(picked);
          e.target.value = "";
        }}
      />

      <ul className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {files.map((file) => {
            const done = file.progress >= 100;
            return (
              <motion.li
                key={file.id}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                  <KindIcon kind={file.kind} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      {file.name}
                    </p>
                    <span className="shrink-0 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                      {formatSize(file.size)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          done ? "bg-emerald-500" : "bg-sky-500 dark:bg-sky-400"
                        )}
                        initial={false}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.25 }}
                      />
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      {done ? (
                        <motion.span
                          key="done"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        >
                          <Check className="h-2.5 w-2.5" aria-hidden />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="pct"
                          exit={{ opacity: 0 }}
                          className="w-4 font-mono text-[10px] tabular-nums text-zinc-400"
                        >
                          {Math.round(file.progress)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => {
                    const next = files.filter((f) => f.id !== file.id);
                    setFiles(next);
                    onFilesChange?.(next);
                  }}
                  className="shrink-0 rounded-md p-1 text-zinc-400 transition-colors duration-200 hover:bg-zinc-200/60 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          {files.length} file{files.length === 1 ? "" : "s"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          {formatSize(totalSize)} total
        </span>
      </div>
    </div>
  );
};

export default Input_02;
