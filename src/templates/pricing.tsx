import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Hobby",
    price: "$0",
    desc: "For side projects and experiments.",
    features: ["Up to 3 projects", "Community support", "Basic analytics"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    desc: "For growing teams that ship fast.",
    features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations at scale.",
    features: ["SAML SSO", "Dedicated support", "Audit logs", "SLA"],
    featured: false,
  },
];

export default function PricingTemplate() {
  return (
    <div className="min-h-screen w-full bg-white py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7",
                t.featured
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-2xl dark:border-white dark:bg-white dark:text-zinc-900"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className={cn("text-lg font-semibold", !t.featured && "text-zinc-900 dark:text-zinc-100")}>
                {t.name}
              </h3>
              <p className={cn("mt-1 text-sm", t.featured ? "opacity-80" : "text-zinc-500 dark:text-zinc-400")}>
                {t.desc}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                {t.price !== "Custom" && <span className="text-sm opacity-70">/mo</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cn(
                  "mt-7 h-11 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]",
                  t.featured
                    ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
                    : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                )}
              >
                {t.price === "Custom" ? "Contact sales" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
