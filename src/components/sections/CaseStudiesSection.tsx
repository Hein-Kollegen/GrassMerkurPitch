"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitScale } from "@/components/typography/useSplitScale";
import { Section } from "@/components/layout/Section";

const cases = [
  {
    title: "DAIMLER TRUCK",
    subtitle: "Markenaufbau",
    description: "Daimler Truck & Buses in Österreich",
    logo: "/assets/sections/partners/daimler-truck.png",
    mockup: "/assets/sections/case-studies/mockup-daimler.png"
  },
  {
    title: "b4run",
    subtitle: "Wachstum mit dem 5-S-Modell",
    description: "für B-4it AG",
    logo: "/assets/sections/partners/b4it.png",
    mockup: "/assets/sections/case-studies/mock-up b4-it.png"
  },
  {
    title: "ProvenExpert",
    subtitle: "Marktführerschaft",
    description: "für ProvenExpert im Tourismus",
    logo: "/assets/sections/partners/proven-expert.png",
    mockup: "/assets/sections/case-studies/mockup-proven-expert.png"
  }
];

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useSplitScale({ scope: sectionRef });

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-case-card]",
        gridRef.current
      );

      if (!cards.length) return;

      if (prefersReducedMotion) {
        cards.forEach((card) => {
          const bg = card.querySelector<HTMLElement>("[data-case-bg]");
          const logo = card.querySelector<HTMLElement>("[data-case-logo]");
          const text = card.querySelector<HTMLElement>("[data-case-text]");
          const mockup = card.querySelector<HTMLElement>("[data-case-mockup]");
          gsap.set([card, bg, logo, text, mockup], { autoAlpha: 1, scaleY: 1, y: 0 });
        });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, scaleY: 0, transformOrigin: "top center" });
      const cardOverlap = 0.8;

      cards.forEach((card, index) => {
        const bg = card.querySelector<HTMLElement>("[data-case-bg]");
        const logo = card.querySelector<HTMLElement>("[data-case-logo]");
        const text = card.querySelector<HTMLElement>("[data-case-text]");
        const mockup = card.querySelector<HTMLElement>("[data-case-mockup]");
        gsap.set([logo, text, mockup], { autoAlpha: 0, y: -20 });
        if (bg) {
          gsap.set(bg, { autoAlpha: 0, scaleY: 0, transformOrigin: "top center" });
        }
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      });

      cards.forEach((card, index) => {
        const bg = card.querySelector<HTMLElement>("[data-case-bg]");
        const logo = card.querySelector<HTMLElement>("[data-case-logo]");
        const text = card.querySelector<HTMLElement>("[data-case-text]");
        const mockup = card.querySelector<HTMLElement>("[data-case-mockup]");

        const tl = gsap.timeline();
        tl.to(logo, { autoAlpha: 1, duration: 0.25 })
          .to(card, { autoAlpha: 1, scaleY: 1, duration: 0.4, ease: "power2.out" }, "-=0.1");

        if (bg) {
          tl.to(bg, { autoAlpha: 1, scaleY: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
        }

        tl.to(text, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
          .to(mockup, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, "-=0.1")
          .to(mockup, { y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" }, "<");

        master.add(tl, index === 0 ? 0 : `-=${cardOverlap}`);
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section
      ref={sectionRef}
      className="flex w-full justify-center mt-32"
      innerClassName="w-full"
      useContentWrap={false}
    >
      <div className="content-wrap flex flex-col items-center gap-20 text-center">
        <h2 className="split-scale">ERFOLGSGESCHICHTEN</h2>

        <div
          ref={gridRef}
          className="grid w-full grid-cols-1 items-stretch gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((item) => (
            <div
              key={item.title}
              data-case-card
              className="h-full rounded-[16px] bg-[linear-gradient(180deg,#DBC18D_0%,rgba(219,193,141,0)_60%)] p-[1px]"
            >
              <div className="relative flex h-full flex-col gap-12 rounded-[15px] px-6 pb-6 pt-12 text-center">
                <div
                  data-case-bg
                  className="absolute inset-0 rounded-[15px] bg-[linear-gradient(0deg,rgba(8,7,22,0.20)_0%,rgba(8,7,22,0.20)_60%),linear-gradient(180deg,#092B42_0%,#080716_60%)]"
                />
                <div className="relative z-10 flex flex-col gap-12">
                  <div className="flex flex-col gap-20">
                    <div data-case-logo className="relative mx-auto h-12 mt-8 w-full">
                      <Image src={item.logo} alt={item.title} fill className="object-contain" />
                    </div>
                    <div data-case-text className="flex flex-col gap-2">
                      <h4 className="text-center text-[20px] font-bold leading-[28px] text-white">
                        {item.subtitle}
                      </h4>
                      <p className="text-center text-white">{item.description}</p>
                    </div>
                  </div>

                  <div data-case-mockup className="relative mb-auto w-full">
                    <Image
                      src={item.mockup}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="h-auto w-full object-contain scale-[1.25] origin-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
