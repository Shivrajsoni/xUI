import { ArrowRight, Check, Zap, Shield, BarChart3, Sparkles } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning fast", desc: "Sub-second loads with edge rendering and smart caching." },
  { icon: Shield, title: "Secure by default", desc: "SOC 2, SSO, and encryption at rest and in transit." },
  { icon: BarChart3, title: "Real-time analytics", desc: "Understand every user action as it happens." },
];

export default function SaasLandingTemplate() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Nimbus</span>
        <nav className="hidden gap-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Features</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Pricing</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Docs</a>
        </nav>
        <button className="h-9 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Get started</button>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(139,92,246,0.15), transparent 70%)" }} />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Sparkles className="h-3 w-3 text-violet-500" /> Now with AI insights
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
          The operating system for{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">modern teams</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Plan, build, and ship faster with one connected workspace. Loved by 10,000+ teams.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
            Start free trial <ArrowRight className="h-4 w-4" />
          </button>
          <button className="h-11 rounded-xl border border-zinc-200 px-6 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">Book a demo</button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-zinc-900 px-8 py-14 text-center dark:bg-zinc-100">
          <h2 className="text-3xl font-bold text-white dark:text-zinc-900">Ready to ship faster?</h2>
          <p className="mx-auto mt-2 max-w-md text-zinc-300 dark:text-zinc-600">Start free. No credit card required.</p>
          <ul className="mx-auto mt-5 flex max-w-md flex-wrap justify-center gap-4 text-sm text-zinc-300 dark:text-zinc-600">
            {["14-day trial", "Cancel anytime", "24/7 support"].map((i) => (
              <li key={i} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />{i}</li>
            ))}
          </ul>
          <button className="mt-7 h-11 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white">Get started free</button>
        </div>
      </section>
    </div>
  );
}
