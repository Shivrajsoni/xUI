import { User, Bell, Lock, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Profile", icon: User, active: true },
  { label: "Notifications", icon: Bell, active: false },
  { label: "Security", icon: Lock, active: false },
  { label: "Billing", icon: CreditCard, active: false },
];

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", on ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700")}>
      <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow transition-transform dark:bg-zinc-900", on ? "translate-x-5" : "translate-x-0.5")} />
    </span>
  );
}

export default function SettingsTemplate() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage your account and preferences.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
          {/* Side nav */}
          <nav className="space-y-1">
            {nav.map((n) => (
              <button key={n.label} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", n.active ? "bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200")}>
                <span className="flex items-center gap-2"><n.icon className="h-4 w-4" />{n.label}</span>
                {n.active && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Profile</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                <button className="h-9 rounded-lg border border-zinc-200 px-4 text-sm font-medium dark:border-zinc-800">Change avatar</button>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-zinc-500">Full name</label>
                  <input defaultValue="Alex Rivera" className="mt-1.5 h-10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500">Email</label>
                  <input defaultValue="alex@example.com" className="mt-1.5 h-10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Preferences</h2>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Email notifications", desc: "Product updates and news", on: true },
                  { label: "Two-factor auth", desc: "Extra security on sign-in", on: true },
                  { label: "Public profile", desc: "Let others find you", on: false },
                ].map((p) => (
                  <div key={p.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{p.label}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.desc}</p>
                    </div>
                    <Toggle on={p.on} />
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <button className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-medium dark:border-zinc-800">Cancel</button>
              <button className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
