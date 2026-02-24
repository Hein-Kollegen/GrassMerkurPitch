"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitScale } from "@/components/typography/useSplitScale";
import { Section } from "@/components/layout/Section";

const roadmapCards = [
  {
    title: "1. Bestandsaufnahme Marketing- & Vertriebssystem",
    items: [
      "Analyse bestehender Prozesse",
      "Bewertung aktueller Sichtbarkeit",
      "Bewertung bestehender Vertriebslogik",
      "Identifikation struktureller Lücken"
    ]
  },
  {
    title: "2. Positionierungs-Workshop",
    items: [
      "Zielgruppenpriorisierung",
      "Differenzierung im Wettbewerbsumfeld",
      "Kernbotschaften",
      "Strategische Fokussierung"
    ]
  },
  {
    title: "3. Zielgruppen- & Entscheideranalyse",
    items: [
      "IT-Leitung vs. Geschäftsführung",
      "Entscheidungslogiken",
      "Typische Einwände",
      "Risikoabwägungen"
    ]
  },
  {
    title: "4. Argumentationsarchitektur",
    items: [
      "Value Proposition",
      "Vertrauensbeweise",
      "Nutzenargumentation je Entscheiderebene"
    ]
  },
  {
    title: "5. Angebots- & Leistungsarchitektur",
    items: [
      "Strukturierung der Produktcluster",
      "Klare Leistungsabgrenzung",
      "Paketlogiken",
      "Einstiegspunkte für Neukunden"
    ]
  },
  {
    title: "6. Corporate Identity & Messaging-Rahmen",
    items: [
      "Schärfung Markenauftritt",
      "Tonalität",
      "Claim-/Leitgedankenentwicklung",
      "Inhaltliche Leitlinien für Website & Content"
    ]
  },
  {
    title: "7. Wettbewerbs- & Sichtbarkeitsanalyse",
    items: [
      "Digitale Präsenz Wettbewerber",
      "SEO- & LLM-Potenziale",
      "Positionierungslücken im Markt"
    ]
  },
  {
    title: "8. Operative Wachstums-Roadmap",
    items: [
      "Priorisierung der Tools für S2 - Sichtbarkeit",
      "Definition der ersten Umsetzungsfelder",
      "Budget- & Ressourcenplanung",
      "12-Monats-Wachstumsfahrplan"
    ]
  }
];

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);

  useSplitScale({ scope: sectionRef });

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cardsRef.current, { autoAlpha: 1, scale: 1 });
        return;
      }

      const setHighlight = (activeIndex: number | null) => {
        overlayRefs.current.forEach((overlay, index) => {
          if (!overlay) return;
          const isActive = index === activeIndex;
          overlay.dataset.active = isActive ? "true" : "false";
          gsap.set(overlay, { opacity: isActive ? 1 : 0 });
        });
      };

      overlayRefs.current.forEach((overlay) => {
        if (!overlay) return;
        gsap.set(overlay, { opacity: 0 });
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, scale: 0.5 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "center center",
              end: "center bottom",
              toggleActions: "play none reverse none",
              onEnter: () => setHighlight(index),
              onLeaveBack: () => setHighlight(index)
            }
          }
        );
      });

      return () => {
        setHighlight(null);
      };
    },
    { scope: sectionRef }
  );

  return (
    <Section ref={sectionRef} className="w-full mt-64" innerClassName="w-full" useContentWrap={false}>
      <div className="content-wrap flex flex-col items-center gap-3 text-center">
        <h2 className="split-scale">WOLLT IHR MIT UNS GEHEN?</h2>
        <h3 className="split-scale">JA? NEIN? VIELLEICHT? FALLS JA, DANN VIELLEICHT SO?</h3>
      </div>

      <div className="content-wrap mt-32 grid grid-cols-1 gap-y-14 gap-x-32 lg:grid-cols-2">
        {roadmapCards.map((card, index) => (
          <div
            key={card.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={
              "relative flex flex-col justify-center overflow-hidden rounded-[40px] border border-[#DBC18D]/30 p-16 transition-[border-color] duration-300 ease-out bg-[linear-gradient(90deg,#080716_0%,#080716_100%)] " +
              (index % 2 === 1 ? "lg:translate-y-1/2" : "")
            }
          >
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              data-active="false"
              className="roadmap-overlay absolute inset-0 transition-opacity duration-300 ease-out bg-[linear-gradient(90deg,#082940_0%,#080716_100%)]"
            />
            <div className="relative z-[1]">
              <h4 className="text-[20px] font-semibold text-white">{card.title}</h4>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-[16px] font-normal leading-normal text-[#DBC18D]">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
