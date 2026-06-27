import { Clock } from "lucide-react";

const posts = [
  { title: "Designing for motion: principles that scale", tag: "Design", read: "6 min", accent: "from-violet-500 to-fuchsia-500" },
  { title: "Shipping a component library with shadcn", tag: "Engineering", read: "9 min", accent: "from-sky-500 to-blue-600" },
  { title: "How we cut our bundle size in half", tag: "Performance", read: "5 min", accent: "from-emerald-500 to-teal-600" },
  { title: "A practical guide to design tokens", tag: "Design Systems", read: "8 min", accent: "from-rose-500 to-orange-500" },
];

export default function BlogTemplate() {
  const [feature, ...rest] = posts;
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-violet-500">The xUI blog</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Ideas on design &amp; engineering</h1>
        </header>

        {/* Featured */}
        <a href="#" className="group block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className={`h-56 bg-gradient-to-br ${feature.accent}`} />
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">{feature.tag}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{feature.read}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">{feature.title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">A deep dive into the motion principles we use across every xUI component.</p>
          </div>
        </a>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <a key={p.title} href="#" className="group block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className={`h-36 bg-gradient-to-br ${p.accent}`} />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">{p.tag}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.read}</span>
                </div>
                <h3 className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
