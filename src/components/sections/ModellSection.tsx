"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/typography/SplitText";
import { useSplitScale } from "@/components/typography/useSplitScale";
import { useSplitLines } from "@/components/typography/useSplitLines";

const timelineCards = [
  {
    title: "1. STRATEGIE",
    subline: "Wofür stehen wir – und für wen?",
    iconSrc: "/assets/sections/modell/strategy-web.gif",
    body: "Bevor Sichtbarkeit entsteht, braucht es Klarheit.",
    list: [
      "Zielgruppenpriorisierung",
      "Marktpositionierung",
      "Angebotsarchitektur",
      "Argumentationslogiken für Entscheider"
    ],
    footer:
      "Strategie sorgt dafür, dass Wachstum nicht beliebig wird. Sie definiert Richtung, Fokus und Anspruch."
  },
  {
    title: "2. SICHTBARKEIT",
    subline: "Relevanz in Entscheidungsphasen.",
    iconSrc: "/assets/sections/modell/view-web.gif",
    body: "Grass-Merkur muss dort präsent sein, wo Entscheider recherchieren, vergleichen und absichern.",
    list: [
      "Google & KI-gestützte Recherche",
      "LinkedIn & Fachplattformen",
      "Content mit Substanz",
      "kontinuierliche Marktpräsenz"
    ],
    footer: "Nicht für Reichweite. Sondern für Wahrnehmung bei den richtigen Entscheidern."
  },
  {
    title: "3. SYSTEME",
    subline: "Wachstum reproduzierbar machen.",
    iconSrc: "/assets/sections/modell/process-web.gif",
    body: "Netzwerk bleibt wertvoll. Doch zusätzlich braucht es klare Prozesse.",
    list: [
      "strukturierter Neukundenprozess",
      "CRM-Logiken und Lead-Management",
      "Recruiting-Funnels",
      "Automatisierte Übergaben"
    ],
    footer: "Systeme sorgen dafür, dass Wachstum nicht personenabhängig bleibt."
  },
  {
    title: "4. STRUKTUR",
    subline: "Organisation, die Wachstum trägt.",
    iconSrc: "/assets/sections/modell/process-flow-web.gif",
    body: "Mehr Nachfrage braucht stabile interne Abläufe.",
    list: [
      "klare Verantwortlichkeiten",
      "transparente KPI-Systeme",
      "saubere Prozessdefinition",
      "belastbare interne Kommunikation"
    ],
    footer: "Struktur verhindert, dass Wachstum Unruhe erzeugt."
  },
  {
    title: "5. SKALIERUNG",
    subline: "Führung, die mitwächst.",
    iconSrc: "/assets/sections/modell/evolution-gif.gif",
    body: "Wachstum endet nicht im Vertrieb. Es endet in der Führung.",
    list: [
      "Delegationsfähigkeit",
      "Entscheidungsstrukturen",
      "Performance-Controlling",
      "strategische Weiterentwicklung"
    ],
    footer: "Skalierung bedeutet: Wachstum wird nicht größer – sondern kontrollierter."
  }
];

export default function ModellSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);

  useSplitScale({ scope: sectionRef });
  useSplitLines({ scope: sectionRef });

  useGSAP(() => {
    if (!viewportRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const getOffsets = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const firstCard = trackRef.current?.querySelector<HTMLElement>("[data-timeline-card]");
      if (!firstCard) return { startOffset: 0, endOffset: 0 };
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = 24;
      const startOffset = (viewportWidth - (3 * cardWidth + 2 * gap)) / 2;
      const endOffset = startOffset - (2 * (cardWidth + gap));
      return { startOffset, endOffset, cardWidth, gap };
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const { startOffset, endOffset, cardWidth, gap } = getOffsets();
      if (!cardWidth) return;
      const cardsCount = overlayRefs.current.filter(Boolean).length || timelineCards.length;
      const cardStep = cardWidth + gap;
      const moveDistance = Math.abs(endOffset - startOffset);
      const stepLength = moveDistance / 2;
      const totalDistance = stepLength * 5;

      gsap.set(trackRef.current, { x: startOffset });

      const setHighlight = (index: number) => {
        overlayRefs.current.forEach((overlay, overlayIndex) => {
          if (!overlay) return;
          gsap.set(overlay, { opacity: overlayIndex === index ? 1 : 0 });
        });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "center center",
          end: () => `+=${totalDistance}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true
        }
      });

      timeline.call(() => setHighlight(0), [], 0);
      timeline.to(trackRef.current, { x: startOffset, duration: 1, ease: "none" });
      timeline.call(() => setHighlight(1));
      timeline.to(trackRef.current, { x: startOffset - cardStep, duration: 1, ease: "none" });
      timeline.call(() => setHighlight(2));
      timeline.to(trackRef.current, { x: endOffset, duration: 1, ease: "none" });
      timeline.call(() => setHighlight(3));
      timeline.to(trackRef.current, { x: endOffset, duration: 1, ease: "none" });
      timeline.call(() => setHighlight(4));
      timeline.to(trackRef.current, { x: endOffset, duration: 1, ease: "none" });

      return () => {
        timeline.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    gsap.registerPlugin(Draggable);

    const media = window.matchMedia("(min-width: 1024px)");
    let resizeObserver: ResizeObserver | null = null;

    const updateBounds = () => {
      if (!trackRef.current) return;
      const { startOffset, endOffset } = (() => {
        const viewportWidth = viewportRef.current?.clientWidth ?? 0;
        const firstCard = trackRef.current?.querySelector<HTMLElement>("[data-timeline-card]");
        if (!firstCard) return { startOffset: 0, endOffset: 0 };
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 24;
        const startOffset = (viewportWidth - (3 * cardWidth + 2 * gap)) / 2;
        const endOffset = startOffset - (2 * (cardWidth + gap));
        return { startOffset, endOffset };
      })();
      const minX = Math.min(endOffset, startOffset);
      const maxX = Math.max(endOffset, startOffset);
      draggableRef.current?.applyBounds({ minX, maxX });
      draggableRef.current?.update();
    };

    const enableDrag = () => {
      if (!trackRef.current || draggableRef.current) return;

      const draggable = Draggable.create(trackRef.current, {
        type: "x",
        bounds: viewportRef.current,
        dragResistance: 0.15,
        inertia: false
      })[0];

      draggableRef.current = draggable;
      updateBounds();

      resizeObserver = new ResizeObserver(() => {
        updateBounds();
      });

      if (viewportRef.current) resizeObserver.observe(viewportRef.current);
      if (trackRef.current) resizeObserver.observe(trackRef.current);
    };

    const disableDrag = () => {
      resizeObserver?.disconnect();
      resizeObserver = null;
      draggableRef.current?.kill();
      draggableRef.current = null;
    };

    const syncDragState = () => {
      if (media.matches) {
        disableDrag();
      } else {
        enableDrag();
      }
    };

    syncDragState();

    media.addEventListener("change", syncDragState);

    return () => {
      media.removeEventListener("change", syncDragState);
      disableDrag();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="content-wrap max-w-[1440px] flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <SplitText
            text="Der Weg?"
            split="words"
            as="h3"
            className="split-scale"
            childClassName="inline-block"
          />
          <SplitText
            text="DAS 5-S-MODELL "
            split="words"
            as="h2"
            className="split-scale uppercase"
            childClassName="inline-block"
          />
          <SplitText
            text="FÜR SICHERES WACHSTUM"
            split="words"
            as="h2"
            className="split-scale uppercase"
            childClassName="inline-block"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="split-lines">
            Planbares Wachstum entsteht nicht durch einzelne Maßnahmen. Es entsteht durch Struktur.
          </p>
          <p className="split-lines">
            Das 5-S-Modell bündelt alle relevanten Wachstumshebel in einer klaren Systematik.
            Sichtbarkeit wird messbar. Anfragen werden planbar. Mitarbeitergewinnung wird
            systematisch. Führung wird strategisch. Wachstum ist kein Zufall mehr, sondern ein
            steuerbarer Prozess.
          </p>
        </div>
      </div>
      <div className="content-wrap max-w-[1440px] mt-48 w-full">
        <div ref={viewportRef} className="overflow-visible">
          <div
            ref={trackRef}
            className="flex min-w-max items-start gap-6 pb-6 will-change-transform select-none touch-pan-y active:cursor-grabbing"
          >
            {timelineCards.map((card, index) => (
              <div
                key={card.title}
                data-timeline-card
                className={
                  "relative flex min-h-[260px] w-[85vw] flex-none flex-col rounded-[50px] border border-[#DBC18D]/30 p-10 transition-[border-color] duration-300 ease-out overflow-hidden bg-[linear-gradient(90deg,#080716_0%,#080716_100%)] sm:w-[70vw] lg:w-[calc((min(1440px,100vw)-3rem)/3)] " +
                  (index % 2 === 0 ? "self-start" : "self-end mt-20")
                }
              >
                <div
                  ref={(el) => {
                    overlayRefs.current[index] = el;
                  }}
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out bg-[linear-gradient(90deg,#082940_0%,#080716_100%)]"
                />
                <div className="absolute right-4 top-4 z-[1] h-20 w-20 rounded-full bg-gradient-to-b from-[#DBC18D]/40 to-transparent p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#080716] p-4">
                    <img src={card.iconSrc} alt="" className="h-16 w-16 object-contain rounded-full" />
                  </div>
                </div>
                <div className="relative z-[1] gap-6 flex flex-col">
                  <h3 className="text-left text-[30px] font-medium uppercase text-white">
                    {card.title}
                  </h3>
                  <div className="flex flex-col">
                    <h4 className="mt-1 text-left text-[20px] font-medium text-white">
                      {card.subline}
                    </h4>
                    <p className="text-left text-[16px] font-normal leading-normal text-[#DBC18D]">
                      {card.body}
                    </p>
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-left text-[16px] font-normal text-white">
                    {card.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                  <p className="text-left text-[16px] font-normal leading-normal text-white">
                    {card.footer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
