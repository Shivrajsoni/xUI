"use client";

import { useEffect, useState } from "react";
import { Github, LogOut, Mail } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

export default function AuthButton() {
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!configured) {
    return (
      <span
        className="hidden md:inline-flex items-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-400"
        title="Add Supabase keys to .env to enable accounts"
      >
        Sign-in off
      </span>
    );
  }

  const supabase = getSupabaseBrowserClient()!;

  const signInGitHub = () =>
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.href },
    });

  const signInEmail = async () => {
    if (!emailInput) return;
    await supabase.auth.signInWithOtp({
      email: emailInput,
      options: { emailRedirectTo: window.location.href },
    });
    setSent(true);
  };

  if (email) {
    return (
      <button
        type="button"
        onClick={() => supabase.auth.signOut()}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
      >
        <span className="max-w-[140px] truncate">{email}</span>
        <LogOut className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900"
      >
        Sign in
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 shadow-xl">
          <button
            type="button"
            onClick={signInGitHub}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-2 text-sm font-medium text-white dark:text-zinc-900"
          >
            <Github className="h-4 w-4" />
            Continue with GitHub
          </button>
          <div className="my-3 flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" /> or{" "}
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          {sent ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Check your email for a magic link.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm outline-none"
              />
              <button
                type="button"
                onClick={signInEmail}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm font-medium",
                  "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                )}
              >
                <Mail className="h-4 w-4" />
                Email magic link
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
