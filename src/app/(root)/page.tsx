import Hero from "@/components/landing/Hero";
import ComponentShowcase from "@/components/landing/ComponentShowcase";
import Showcase3D from "@/components/landing/Showcase3D";
import ClosingCta from "@/components/landing/ClosingCta";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white dark:bg-black">
      <Hero />
      <ComponentShowcase />
      <Showcase3D />
      <ClosingCta />
    </main>
  );
}
