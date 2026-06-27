import Portfolio3DTemplate from "@/templates/portfolio-3d";
import PricingTemplate from "@/templates/pricing";
import DashboardTemplate from "@/templates/dashboard";

const MAP: Record<string, React.ComponentType> = {
  "portfolio-3d": Portfolio3DTemplate,
  pricing: PricingTemplate,
  dashboard: DashboardTemplate,
};

export default function TemplateRenderer({ slug }: { slug: string }) {
  const Component = MAP[slug];
  if (!Component) return null;
  return <Component />;
}
