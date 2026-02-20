import HeroTypedTitle from "@/components/hero/HeroTypedTitle";
import ModellDetailSection from "@/components/sections/ModellDetailSection";
import ModellSection from "@/components/sections/ModellSection";
import OverviewSection from "@/components/sections/OverviewSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import OutroSection from "@/components/sections/OutroSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import WorksSection from "@/components/sections/WorksSection";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import TeamVideo from "@/components/sections/TeamVideo";
import TodayTomorrowSection from "@/components/sections/TodayTomorrowSection";

const heroImages = [
  "/assets/sections/hero/hero-bg (1).png",
  "/assets/sections/hero/hero-bg (2).png",
  "/assets/sections/hero/hero-bg (3).png",
  "/assets/sections/hero/hero-bg (4).png",
  "/assets/sections/hero/hero-bg (5).png",
  "/assets/sections/hero/hero-bg (6).png",
  "/assets/sections/hero/hero-bg (7).png",
  "/assets/sections/hero/hero-bg (8).png",
  "/assets/sections/hero/hero-bg (9).png",
  "/assets/sections/hero/hero-bg (10).png",
  "/assets/sections/hero/hero-bg (11).png",
  "/assets/sections/hero/hero-bg (12).png"
];

function HeroRow({
  images,
  direction
}: {
  images: string[];
  direction: "left" | "right";
}) {
  const loopImages = [...images, images[0]];

  return (
    <div>
      <div
        className={`hero-marquee-track ${direction === "left" ? "hero-row-left" : "hero-row-right"
          }`}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="hero-marquee-rail">
            {loopImages.map((src, index) => (
              <div key={`${src}-${dup}-${index}`} className="hero-tile">
                <img src={src} alt="" className="w-[22rem] aspect-video object-cover" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const rows = [
    heroImages.slice(0, 4),
    heroImages.slice(4, 8),
    heroImages.slice(8, 12),
    [heroImages[1], heroImages[3], heroImages[5], heroImages[7]]
  ];

  return (
    <main className="min-h-screen bg-midnight text-white">
      <section className="relative flex min-h-[100svh] flex-col bg-[#080716] px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="scale-150 rotate-12">
              <div className="flex flex-col gap-4 opacity-60">
                <HeroRow images={rows[0]} direction="left" />
                <HeroRow images={rows[1]} direction="right" />
                <HeroRow images={rows[2]} direction="left" />
                <HeroRow images={rows[3]} direction="right" />
              </div>
            </div>
          </div>
          <div className="hero-bg-mask" />
        </div>

        <div className="content-wrap relative z-10 flex flex-1 flex-col">
          <div className="flex w-full justify-center pt-4 sm:pt-6">
            <img
              src="/assets/page/hk-logo.svg"
              alt="Hein & Kollegen"
              className="h-[40px] w-auto"
            />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center gap-8 text-center">
              <HeroTypedTitle />
              <p className="m-0 max-w-2xl text-[clamp(1rem,1.2vw,1.25rem)] wrap-balance font-medium text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] [font-family:var(--font-display)]">
                {"Ein System f\u00fcr Wachstum, Umsatz, Mitarbeitergewinnung und Planbarkeit f\u00fcr Grass-Merkur."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <PartnersSection />
      <TodayTomorrowSection />
      <ModellSection />
      <ModellDetailSection />
      <OverviewSection />
      <TestimonialSlider />
      <CaseStudiesSection />
      <TeamVideo />
      <WorksSection />
      <RoadmapSection />
      <OutroSection />
    </main>
  );
}

