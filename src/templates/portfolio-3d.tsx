"use client";

import Card06 from "@/components/xui/card/card-06";
import { ArrowUpRight, Mail } from "lucide-react";

const projects = [
  { title: "Aurora Dashboard", tag: "Product Design", year: "2025" },
  { title: "Nimbus Mobile App", tag: "iOS · React Native", year: "2024" },
  { title: "Pulse Design System", tag: "Design Eng", year: "2024" },
];

export default function Portfolio3DTemplate() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(244,63,94,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <header className="flex items-center justify-between">
          <span className="font-mono text-sm tracking-widest text-white/60">ALEX RIVERA</span>
          <nav className="hidden gap-6 text-sm text-white/70 sm:flex">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </header>

        <section className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl">
              Designing &amp; building{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                delightful
              </span>{" "}
              digital products.
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Product designer and developer focused on motion, 3D, and
              interfaces that feel alive.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <a
                href="#work"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-medium text-white/90 hover:bg-white/5"
              >
                See work
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <Card06 />
          </div>
        </section>

        <section id="work" className="mt-28">
          <h2 className="text-sm font-mono uppercase tracking-widest text-white/50">Selected work</h2>
          <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {projects.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group flex items-center justify-between py-6 transition-colors hover:bg-white/[0.03]"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{p.tag}</p>
                </div>
                <div className="flex items-center gap-4 text-white/50">
                  <span className="text-sm">{p.year}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
