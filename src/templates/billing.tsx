import { CreditCard, Download, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$19.00", status: "Paid" },
];

export default function BillingTemplate() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 py-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Billing
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your plan, payment method, and invoices.
        </p>

        {/* Current plan */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Pro plan</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Active
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                $19/month · renews Jul 1, 2026
              </p>
            </div>
            <div className="flex gap-2">
              <button className="h-9 rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                Change plan
              </button>
              <button className="h-9 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                Manage
              </button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Payment method</h2>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-600 text-white">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Visa ending in 4242</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Expires 08/28</p>
              </div>
            </div>
            <button className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Update
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Invoices</h2>
          <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{inv.id}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{inv.amount}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300")}>
                    {inv.status}
                  </span>
                  <button aria-label="Download invoice" className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
