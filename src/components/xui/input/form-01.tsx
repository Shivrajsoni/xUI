"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const GitHubGlyph = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const GoogleGlyph = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      fill="#4285F4"
      d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.81Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-3c-1.07.72-2.44 1.15-4.08 1.15-3.13 0-5.79-2.12-6.74-4.96H1.27v3.09A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.26 14.28A7.2 7.2 0 0 1 4.88 12c0-.79.14-1.56.38-2.28V6.63H1.27a12 12 0 0 0 0 10.74l3.99-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.27 6.63l3.99 3.09C6.21 6.89 8.87 4.77 12 4.77Z"
    />
  </svg>
);

export type Form01Props = {
  title?: string;
  subtitle?: string;
  /** Called after the (simulated) sign-in completes. */
  onSignIn?: (data: { email: string; password: string; remember: boolean }) => void;
  onOAuth?: (provider: "github" | "google") => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
  className?: string;
};

const Form_01 = ({
  title = "Welcome back",
  subtitle = "Sign in to continue to your workspace.",
  onSignIn,
  onOAuth,
  onForgotPassword,
  onCreateAccount,
  className,
}: Form01Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (phase !== "idle") return;
    setPhase("loading");
    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("done");
        onSignIn?.({ email, password, remember });
      }, 1400),
      window.setTimeout(() => setPhase("idle"), 3200)
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7",
        "shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">
        {subtitle}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onOAuth?.("github")}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <GitHubGlyph />
          GitHub
        </button>
        <button
          type="button"
          onClick={() => onOAuth?.("google")}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-zinc-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <GoogleGlyph />
          Google
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          or
        </span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <div>
          <label
            htmlFor="form01-email"
            className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            Email
          </label>
          <input
            id="form01-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400/50 dark:focus:ring-indigo-400/20"
          />
        </div>

        <div>
          <label
            htmlFor="form01-password"
            className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="form01-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 px-3 py-2 pr-10 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-indigo-400/50 dark:focus:ring-indigo-400/20"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors duration-200 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:hover:text-zinc-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden />
              ) : (
                <Eye className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={remember}
            onClick={() => setRemember((r) => !r)}
            className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors duration-200",
                remember
                  ? "border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400"
                  : "border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
              )}
            >
              <AnimatePresence initial={false}>
                {remember && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Check
                      className="h-3 w-3 text-white dark:text-zinc-950"
                      strokeWidth={3}
                      aria-hidden
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
              Remember me
            </span>
          </button>
          <button
            type="button"
            onClick={() => onForgotPassword?.()}
            className="rounded-md text-[13px] text-indigo-600 transition-colors duration-200 hover:text-indigo-700 active:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Forgot?
          </button>
        </div>

        <motion.button
          type="submit"
          whileTap={phase === "idle" ? { scale: 0.98 } : undefined}
          disabled={phase !== "idle"}
          className={cn(
            "mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
            phase === "done"
              ? "bg-emerald-500 text-white dark:bg-emerald-500"
              : "bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {phase === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                Sign in
              </motion.span>
            )}
            {phase === "loading" && (
              <motion.span
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="sr-only">Signing in</span>
              </motion.span>
            )}
            {phase === "done" && (
              <motion.span
                key="done"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                Signed in
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <p className="mt-5 text-center text-[13px] text-zinc-500 dark:text-zinc-400">
        New here?{" "}
        <button
          type="button"
          onClick={() => onCreateAccount?.()}
          className="rounded-md font-medium text-zinc-900 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-100"
        >
          Create account
        </button>
      </p>
    </div>
  );
};

export default Form_01;
