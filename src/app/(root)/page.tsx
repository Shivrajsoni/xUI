import HeroSection from "@/components/landing/HeroSection";
import AIInput_01 from "@/components/xui/ai-input/ai-input-01";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-white dark:bg-black/5 overflow-x-hidden">
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
          <HeroSection />
        </div>
      </main>
    </>
  );
}
