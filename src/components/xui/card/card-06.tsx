"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Github, Globe, Twitter, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Social {
  label: string;
  href: string;
  icon: "github" | "twitter" | "globe";
}

interface Card06Props {
  name?: string;
  role?: string;
  tagline?: string;
  avatar?: string;
  accent?: "violet" | "rose" | "emerald" | "amber" | "sky";
  skills?: string[];
  socials?: Social[];
}

const ACCENTS: Record<NonNullable<Card06Props["accent"]>, string> = {
  violet: "from-violet-500 via-fuchsia-500 to-purple-600",
  rose: "from-rose-500 via-pink-500 to-orange-500",
  emerald: "from-emerald-500 via-teal-500 to-cyan-600",
  amber: "from-amber-400 via-orange-500 to-rose-500",
  sky: "from-sky-500 via-blue-500 to-indigo-600",
};

const ICONS = { github: Github, twitter: Twitter, globe: Globe };

export default function Card06({
  name = "Alex Rivera",
  role = "Product Designer & Developer",
  tagline = "I craft interfaces that feel as good as they look.",
  avatar = "/avatars/avatar-04.svg",
  accent = "violet",
  skills = ["Design", "React", "Motion", "3D"],
  socials = [
    { label: "GitHub", href: "#", icon: "github" },
    { label: "Twitter", href: "#", icon: "twitter" },
    { label: "Website", href: "#", icon: "globe" },
  ],
}: Card06Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 16, y: (px - 0.5) * 16 });
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, on: false }));
  };

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: glare.on ? "transform 80ms ease-out" : "transform 500ms ease",
        }}
        className={cn(
          "group relative h-[420px] w-[320px] overflow-hidden rounded-3xl",
          "border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-black/40"
        )}
      >
        {/* Accent gradient backdrop */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
            ACCENTS[accent]
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent,rgba(0,0,0,0.65))]" />

        {/* Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.on ? 0.35 : 0,
            background: `radial-gradient(220px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8), transparent 60%)`,
          }}
        />

        {/* Content layers (parallax via translateZ) */}
        <div className="relative flex h-full flex-col p-6" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
            <div className="h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-white/30 shadow-lg">
              <Image src={avatar} alt={name} width={64} height={64} className="h-full w-full object-cover" />
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur">
              Available
            </span>
          </div>

          <div className="mt-auto" style={{ transform: "translateZ(60px)" }}>
            <h3 className="text-2xl font-bold leading-tight drop-shadow">{name}</h3>
            <p className="mt-1 text-sm font-medium text-white/80">{role}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{tagline}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-medium backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-5 flex items-center justify-between"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="flex gap-2">
              {socials.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors hover:bg-white/30"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105"
            >
              View work
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
