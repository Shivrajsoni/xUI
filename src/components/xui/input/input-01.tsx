"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type Input01Props = {
  /** Code that counts as a successful verification. */
  correctCode?: string;
  /** Number of digit boxes. Defaults to the length of `correctCode`. */
  length?: number;
  title?: string;
  /** Address shown in the helper copy. */
  email?: string;
  /** Seconds before the resend button re-enables. */
  resendCooldown?: number;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  className?: string;
};

const formatCooldown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

const Input_01 = ({
  correctCode = "424242",
  length = correctCode.length,
  title = "Verify your device",
  email = "maya@acme.co",
  resendCooldown = 24,
  onVerify,
  onResend,
  className,
}: Input01Props) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [cooldown, setCooldown] = useState(resendCooldown);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(
      () => setCooldown((s) => Math.max(0, s - 1)),
      1000
    );
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const commit = (next: string[]) => {
    setDigits(next);
    if (next.every((d) => d !== "")) {
      const code = next.join("");
      if (code === correctCode) {
        setStatus("success");
        inputsRef.current[length - 1]?.blur();
        onVerify?.(code);
      } else {
        setStatus("error");
        window.setTimeout(() => {
          setDigits(Array(length).fill(""));
          setStatus("idle");
          inputsRef.current[0]?.focus();
        }, 450);
      }
    } else {
      setStatus("idle");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (status === "success") return;
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    commit(next);
    if (char && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (status === "success") return;
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        next[index - 1] = "";
        setDigits(next);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (status === "success") return;
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    const next = Array(length).fill("");
    pasted.split("").forEach((c, i) => (next[i] = c));
    commit(next);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  const handleResend = () => {
    if (cooldown > 0 || status === "success") return;
    setDigits(Array(length).fill(""));
    setStatus("idle");
    setCooldown(resendCooldown);
    inputsRef.current[0]?.focus();
    onResend?.();
  };

  const success = status === "success";

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300",
                success
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
              )}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Enter the {length}-digit code sent to{" "}
            <span className="whitespace-nowrap font-medium text-zinc-700 dark:text-zinc-300">
              {email}
            </span>
          </p>
        </div>
      </div>

      <motion.div
        animate={status === "error" ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 flex justify-between gap-1.5 sm:gap-2"
      >
        {digits.map((digit, i) => {
          const focused = focusedIndex === i && !success;
          return (
            <motion.div
              key={i}
              animate={{ scale: focused ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative min-w-0 flex-1 max-w-10 sm:max-w-11"
            >
              <input
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                aria-label={`Digit ${i + 1} of ${length}`}
                value={digit}
                disabled={success}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                className={cn(
                  "h-12 w-full min-w-0 rounded-xl border text-center text-lg font-semibold tabular-nums outline-none transition-all duration-200 sm:h-14",
                  success
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-400"
                    : cn(
                        "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
                        focused &&
                          "border-indigo-500 ring-2 ring-indigo-500/25 dark:border-indigo-400 dark:ring-indigo-400/25"
                      )
                )}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {success ? (
            <motion.span
              key="verified"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-600 dark:text-emerald-400"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15"
              >
                <Check className="h-3 w-3" aria-hidden />
              </motion.span>
              Verified
            </motion.span>
          ) : (
            <motion.span
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[13px] text-zinc-400 dark:text-zinc-500"
            >
              Didn&apos;t get it?
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || success}
          className={cn(
            "rounded-md font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
            cooldown > 0 || success
              ? "cursor-default text-zinc-400 dark:text-zinc-500"
              : "text-indigo-600 hover:text-indigo-700 active:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          )}
        >
          {cooldown > 0 ? `Resend code (${formatCooldown(cooldown)})` : "Resend code"}
        </button>
      </div>
    </div>
  );
};

export default Input_01;
