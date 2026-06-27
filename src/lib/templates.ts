// Full-section templates for the Templates gallery. Unlike single components,
// these are multi-part starting points users copy and personalize — they are
// NOT editable in Studio (Studio is a single-component code runtime).

export interface TemplateMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** Source file (relative to project root) — read server-side for "Copy code". */
  file: string;
  /** Preview canvas hint for non-WebGL live thumbnails. */
  dark?: boolean;
  /** WebGL (three.js) template — heavy, lazy-loaded; shown with a poster, not a live thumbnail. */
  webgl?: boolean;
  /** Poster gradient (Tailwind classes) used for WebGL template cards. */
  poster?: string;
}

export const templates: TemplateMeta[] = [
  {
    slug: "r3f-hero",
    title: "3D Hero",
    description: "A real-time WebGL hero with a distorted, glowing blob and bloom.",
    tags: ["3D", "three.js", "Hero"],
    file: "src/templates/r3f-hero.tsx",
    webgl: true,
    poster: "from-violet-600 via-fuchsia-600 to-sky-600",
  },
  {
    slug: "r3f-product",
    title: "3D Product",
    description: "Interactive 3D product showcase — spin, inspect, and buy.",
    tags: ["3D", "three.js", "E-commerce"],
    file: "src/templates/r3f-product.tsx",
    webgl: true,
    poster: "from-rose-500 via-orange-500 to-amber-400",
  },
  {
    slug: "r3f-orb",
    title: "3D Particle Orb",
    description: "4,000 GPU-rendered particles orbiting in real time with bloom.",
    tags: ["3D", "three.js", "Data viz"],
    file: "src/templates/r3f-orb.tsx",
    webgl: true,
    poster: "from-violet-700 via-purple-700 to-black",
  },
  {
    slug: "portfolio-3d",
    title: "3D Portfolio",
    description: "A dark, motion-rich portfolio landing built around the 3D card.",
    tags: ["Portfolio", "Dark", "CSS 3D"],
    file: "src/templates/portfolio-3d.tsx",
    dark: true,
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "A clean three-tier pricing section with a highlighted plan.",
    tags: ["Marketing", "Pricing"],
    file: "src/templates/pricing.tsx",
  },
  {
    slug: "billing",
    title: "Billing",
    description: "Account billing — plan, payment method, and invoices.",
    tags: ["App", "Billing", "SaaS"],
    file: "src/templates/billing.tsx",
  },
  {
    slug: "dashboard",
    title: "Analytics Dashboard",
    description: "A stats overview with chart and recent-activity panels.",
    tags: ["App", "Analytics"],
    file: "src/templates/dashboard.tsx",
  },
];

export function getTemplate(slug: string): TemplateMeta | undefined {
  return templates.find((t) => t.slug === slug);
}
