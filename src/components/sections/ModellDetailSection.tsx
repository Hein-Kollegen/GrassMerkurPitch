"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const detailSlides = [
  {
    title: "1. STRATEGIE & MARKE",
    subline: "Fundament schaffen, bevor Massnahmen starten.",
    body:
      "Hier entsteht Klarheit. Ohne sie wird Wachstum beliebig und zufaellig.",
    list: [
      "Bestandsaufnahme Marketing- & Vertriebssystem",
      "Positionierungs-Workshop",
      "Zielgruppen- & Entscheideranalyse",
      "Argumentationslogik fuer Entscheider",
      "Angebots- & Leistungsarchitektur",
      "Corporate Identity & Messaging",
      "Wettbewerbsanalyse"
    ]
  },
  {
    title: "2. SICHTBARKEIT",
    subline: "Relevanz in Entscheidungsphasen aufbauen.",
    body:
      "Nicht Reichweite ist das Ziel - sondern Wahrnehmung bei den richtigen Entscheidern.",
    list: [
      "SEO & GEO (inkl. Nischen wie Lift & Shift)",
      "Sichtbarkeit in KI-Systemen & LLMs",
      "LinkedIn-Strategie & Reputationsmarketing",
      "Blogmarketing, White Papers & Fachartikel",
      "Videomarketing (Erklaerung komplexer Loesungen)",
      "Podcasting",
      "Event Marketing",
      "Empfehlungsmarketing",
      "Website-Relaunch, Landing Pages & Conversion-Optimierung",
      "Reichweitenkampagnen",
      "Retargeting & Sichtbarkeits-Logiken",
      "Fotoshootings"
    ]
  },
  {
    title: "3. SYSTEME",
    subline: "Neukunden- und Recruitingprozesse reproduzierbar machen.",
    body:
      "Wachstum darf nicht vom Zufall oder einzelnen Personen abhaengen.",
    list: [
      "Strukturierter Neukunden-Funnel",
      "Event-Formate mit strukturiertem Follow-up",
      "LinkedIn-Automations & Account-Based-Marketing",
      "CRM-Setup & Lead-Management",
      "Newsletter-Marketing",
      "KPI-Tracking & Performance-Dashboards",
      "Social Recruiting",
      "Recruiting-Funnels & Bewerber-Landingpages"
    ]
  },
  {
    title: "4. STRUKTUR",
    subline: "Organisation stabilisieren, waehrend sie waechst.",
    body:
      "Wachstum darf nicht vom Zufall oder einzelnen Personen abhaengen.",
    list: [
      "Prozessanalyse & Optimierung",
      "Rollen- und Verantwortlichkeitsdefinition",
      "Interne KPI-Systeme",
      "Automatisierung von Standardprozessen",
      "Schnittstellenoptimierung zwischen Marketing & Vertrieb"
    ]
  },
  {
    title: "5. SKALIERUNG",
    subline: "Fuehrung und Organisation auf die naechste Stufe bringen.",
    body:
      "Wachstum endet nicht bei Leads. Es endet in der Fuehrung.",
    list: [
      "Fuehrungsworkshops",
      "Vertriebstrainings",
      "Strategische Roadmaps",
      "Skalierungsplanung fuer neue Geschaeftsfelder",
      "Organisationsentwicklung",
      "Management-Sparring"
    ]
  }
];

export default function ModellDetailSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const slides = Array.from(
      stackRef.current.querySelectorAll<HTMLDivElement>("[data-slide]")
    );


    const holdPercent = 0;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top top",
        end: `+=${slides.length * 100 + holdPercent}%`,
        scrub: true,
        pin: true
      }
    });

    const baseZ = 1;
    timeline.set(slides[0], { zIndex: baseZ, y: 0 });

    slides.forEach((slide, index) => {
      if (index === 0) return;
      timeline.set(slide, { zIndex: baseZ + index, y: window.innerHeight });
      timeline.fromTo(
        slide,
        { y: window.innerHeight },
        { y: 0, ease: "none", duration: 1 },
        index
      );
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex w-full flex-col items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-6 text-center">
        <h2>DIE 5-S-MODULE IM DETAIL</h2>
        <h3 className="font-light">5 MODULE FUER SICHERES WACHSTUM</h3>
        <p>
          Die 5-S-Module sind kein Massnahmenkatalog. Sie sind ein strukturiertes System, das Wachstum
          planbar macht. Nicht alles gleichzeitig. Aber alles in der richtigen Reihenfolge.
        </p>
      </div>
      <div className="content-wrap mt-12 w-full">
        <div ref={stackRef} className="relative flex h-[100vh] w-full items-center justify-center">
          {detailSlides.map((slide, index) => (
            <div
              key={slide.title}
              data-slide
              className="absolute left-1/2 top-1/2 h-[80vh] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] border border-[#37515F] bg-[#080716]"
            >
              <div className="h-full w-full p-8">
                <div className="grid h-full grid-cols-2">
                  <div className="h-full w-full">
                    <div className="h-full w-full rounded-[18px]" />
                  </div>
                  <div className="flex h-full flex-col justify-center px-10">
                    <h3 className="text-left">{slide.title}</h3>
                    <div className="mt-4 space-y-3">
                      <h4 className="text-left">{slide.subline}</h4>
                      <p className="text-left text-[#DBC18D]">{slide.body}</p>
                    </div>
                    <div className="slide-list-scroll mt-6 max-h-[220px] overflow-y-auto pr-2">
                      {slide.list.map((entry) => (
                        <div key={entry} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#37515F] text-xs">
                            &gt;
                          </span>
                          <p className="text-left">{entry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
