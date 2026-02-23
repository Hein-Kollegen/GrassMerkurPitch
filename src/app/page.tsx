import HeroSection from "@/components/sections/HeroSection";
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-midnight text-white">
      <HeroSection />
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
