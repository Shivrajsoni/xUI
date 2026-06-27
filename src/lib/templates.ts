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
  /** Preview canvas hint. */
  dark?: boolean;
}

export const templates: TemplateMeta[] = [
  {
    slug: "portfolio-3d",
    title: "3D Portfolio",
    description:
      "A dark, motion-rich portfolio landing built around the interactive 3D card.",
    tags: ["3D", "Portfolio", "Dark"],
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
