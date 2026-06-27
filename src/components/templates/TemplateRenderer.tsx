"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { Loader2 } from "lucide-react";

const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center gap-2 text-zinc-400">
    <Loader2 className="h-5 w-5 animate-spin" />
    <span className="text-sm">Loading template…</span>
  </div>
);

// Each template is its own lazy chunk so heavy three.js code only loads for the
// WebGL templates that actually need it (ssr:false — WebGL is client-only).
const MAP: Record<string, ComponentType> = {
  "portfolio-3d": dynamic(() => import("@/templates/portfolio-3d")),
  pricing: dynamic(() => import("@/templates/pricing")),
  billing: dynamic(() => import("@/templates/billing")),
  dashboard: dynamic(() => import("@/templates/dashboard")),
  "r3f-hero": dynamic(() => import("@/templates/r3f-hero"), { ssr: false, loading: Loading }),
  "r3f-product": dynamic(() => import("@/templates/r3f-product"), { ssr: false, loading: Loading }),
  "r3f-orb": dynamic(() => import("@/templates/r3f-orb"), { ssr: false, loading: Loading }),
};

export default function TemplateRenderer({ slug }: { slug: string }) {
  const Component = MAP[slug];
  if (!Component) return null;
  return <Component />;
}
