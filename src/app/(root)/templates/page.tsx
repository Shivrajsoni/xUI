import type { Metadata } from "next";
import Templates from "@/components/landing/Templates";

export const metadata: Metadata = {
  title: "Templates — full-page layouts to start from",
  description:
    "Production-ready page templates built from xUI components — including real-time three.js 3D pages. Preview, copy the source, and make it yours.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return <Templates />;
}
