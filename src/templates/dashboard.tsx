import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Users,
  Activity,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Revenue", value: "$48,250", delta: "+12.4%", up: true, icon: DollarSign },
  { label: "Active users", value: "8,942", delta: "+5.1%", up: true, icon: Users },
  { label: "Conversion", value: "3.6%", delta: "-0.4%", up: false, icon: Activity },
  { label: "Avg. order", value: "$126", delta: "+2.0%", up: true, icon: CreditCard },
];

const rows = [
  { name: "Olivia Martin", email: "olivia@example.com", amount: "+$1,999.00" },
  { name: "Jackson Lee", email: "jackson@example.com", amount: "+$39.00" },
  { name: "Isabella Nguyen", email: "isabella@example.com", amount: "+$299.00" },
  { name: "William Kim", email: "will@example.com", amount: "+$99.00" },
];

export default function DashboardTemplate() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 p-6 dark:bg-zinc-950 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Overview</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome back — here&apos;s your store today.</p>
          </div>
          <button className="h-10 rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
            Download report
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{s.label}</span>
                  <Icon className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{s.value}</div>
                <div
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                    s.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.delta}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 lg:col-span-2">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Revenue</h2>
            <div className="mt-4 flex h-48 items-end gap-2">
              {[40, 65, 50, 80, 55, 90, 70, 100, 85, 95, 60, 88].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-gradient-to-t from-violet-500/30 to-violet-500"
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent sales</h2>
            <div className="mt-4 space-y-4">
              {rows.map((r) => (
                <div key={r.email} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{r.email}</p>
                  </div>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
