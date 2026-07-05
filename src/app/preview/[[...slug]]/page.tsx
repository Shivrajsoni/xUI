import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import NotFound from "@/app/notFound";

// Components that paint their own full-page canvas; everything else is centered.
const FULL_BLEED_COMPONENTS = [
  "background-circles",
  "background-paths",
  "beams-background",
  "bento-grid",
];

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug.length) return notFound();

  const componentName = slug.join("/");

  try {
    const Component = dynamic(
      () => import(`@/components/xui/${componentName}`).catch(() => notFound()),
      { ssr: true }
    );

    const isFullBleed = FULL_BLEED_COMPONENTS.some((component) =>
      componentName.startsWith(component)
    );

    return isFullBleed ? (
      <Component />
    ) : (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Component />
      </div>
    );
  } catch (error) {
    console.error("Error loading component:", error);
    // Handle the error gracefully
    // You can return a fallback UI or a not found page
    // For example, you can return a simple message or a custom 404 component
    return NotFound();
  }
}
