import { Github, Mail } from "lucide-react";

export default function LoginTemplate() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Form side */}
      <div className="flex items-center justify-center bg-white px-6 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to your account to continue.
          </p>

          <div className="mt-8 space-y-3">
            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>
            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <Mail className="h-4 w-4" />
              Continue with Email
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" /> or <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
              <input type="email" placeholder="you@example.com" className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <a href="#" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Forgot?</a>
              </div>
              <input type="password" placeholder="••••••••" className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400/40" />
            </div>
            <button type="button" className="h-11 w-full rounded-xl bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No account? <a href="#" className="font-medium text-zinc-900 dark:text-zinc-100">Create one</a>
          </p>
        </div>
      </div>

      {/* Brand side */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-zinc-950 lg:flex">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(70% 60% at 50% 40%, rgba(139,92,246,0.35), transparent 70%)" }}
        />
        <blockquote className="relative max-w-md px-10 text-center">
          <p className="text-2xl font-medium leading-relaxed text-white">
            “This is the cleanest component library we&apos;ve shipped with. Our
            redesign took days, not months.”
          </p>
          <footer className="mt-6 text-sm text-white/60">Jordan Lee · Head of Design, Acme</footer>
        </blockquote>
      </div>
    </div>
  );
}
