"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

const timelineCards = [
  {
    title: "1. Strategie",
    subline: "Wofuer stehen wir?",
    body:
      "Klarheit ueber Positionierung, Nutzenversprechen und Zielgruppe.",
    list: [
      "Zielkunden definieren",
      "Leistungsversprechen schaerfen",
      "Marktposition festlegen"
    ],
    footer:
      "Strategie schafft Fokus und Richtung fuer alle weiteren Schritte."
  },
  {
    title: "2. Sichtbarkeit",
    subline: "Relevant in Entscheidungsphasen",
    body:
      "Praesenz dort, wo Entscheider recherchieren und vergleichen.",
    list: [
      "Suchmaschinen",
      "KI-gestuetzte Recherche",
      "LinkedIn & Fachplattformen"
    ],
    footer:
      "Sichtbarkeit wird messbar und kontinuierlich aufgebaut."
  },
  {
    title: "3. Systeme",
    subline: "Wachstum reproduzierbar machen",
    body:
      "Strukturen, Prozesse und Inhalte sorgen fuer planbare Ergebnisse.",
    list: [
      "Content-Systeme",
      "Lead-Qualifizierung",
      "Vertriebsmaterialien"
    ],
    footer:
      "Systeme machen Wachstum stabil und skalierbar."
  },
  {
    title: "4. Struktur",
    subline: "Organisation, die Wachstum traegt",
    body:
      "Rollen, Ablaeufe und Verantwortungen werden klar definiert.",
    list: [
      "Verantwortlichkeiten",
      "Prozessklarheit",
      "Messbare Ziele"
    ],
    footer:
      "Struktur verhindert Reibung und schafft Geschwindigkeit."
  },
  {
    title: "5. Skalierung",
    subline: "Fuehrung, die mitwaechst",
    body:
      "Fuehrung, Kultur und Ressourcen wachsen mit dem Unternehmen.",
    list: [
      "Mitarbeitergewinnung",
      "Fuehrungssysteme",
      "Kontinuierliche Optimierung"
    ],
    footer:
      "Skalierung wird planbar und kontrollierbar."
  }
];

export default function ModellSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggableRef = useRef<Draggable | null>(null);

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    gsap.registerPlugin(Draggable);

    const updateBounds = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const minX = Math.min(0, viewportWidth - trackWidth);
      const maxX = 0;
      draggableRef.current?.applyBounds({ minX, maxX });
      draggableRef.current?.update();
    };

    const draggable = Draggable.create(trackRef.current, {
      type: "x",
      bounds: viewportRef.current,
      dragResistance: 0.15,
      inertia: false
    })[0];

    draggableRef.current = draggable;
    updateBounds();

    const resizeObserver = new ResizeObserver(() => {
      updateBounds();
    });

    resizeObserver.observe(viewportRef.current);
    resizeObserver.observe(trackRef.current);

    return () => {
      resizeObserver.disconnect();
      draggableRef.current?.kill();
      draggableRef.current = null;
    };
  }, []);

  return (
    <section className="flex w-full flex-col items-center px-6 py-32 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <h3>DER WEG?</h3>
          <h2 className="uppercase">Das 5-S-Modell für sicheres Wachstum</h2>
        </div>
        <div className="flex flex-col gap-4">
          <p>Planbares Wachstum entsteht nicht durch einzelne Massnahmen. Es entsteht durch Struktur.</p>
          <p>Mit dem 5-S-Modell buendeln wir die relevanten Wachstumshebel in einer klaren Systematik. Sichtbarkeit wird messbar. Anfragen werden planbar. Mitarbeitergewinnung wird systematisch. Fuehrung wird strategisch. Wachstum ist kein Zufall mehr, sondern ein steuerbarer Prozess.</p>
        </div>
      </div>
      <div className="content-wrap mt-32 w-full">
        <div ref={viewportRef} className="overflow-visible">
          <div
            ref={trackRef}
            className="flex min-w-max items-start gap-6 pb-6 will-change-transform cursor-grab select-none touch-pan-y active:cursor-grabbing"
          >
            {timelineCards.map((card, index) => (
              <div
                key={card.title}
                className={
                  "relative flex min-h-[260px] w-[320px] flex-col gap-4 rounded-[50px] border border-[#DBC18D]/30 p-10 transition-[border-color,background] duration-300 ease-out hover:bg-[linear-gradient(90deg,#082940_0%,#080716_100%)] sm:w-[360px] lg:w-[380px] " +
                  (index % 2 === 0 ? "self-start" : "self-end mt-20")
                }
              >
                <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#DBC18D]/30 p-2">
                  <span className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="text-left text-[30px] font-medium uppercase text-white">
                  {card.title}
                </h3>
                <h4 className="mt-1 text-left text-[20px] font-medium text-white">
                  {card.subline}
                </h4>
                <p className="text-left text-[16px] font-normal leading-normal text-[#DBC18D]">
                  {card.body}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-left text-[16px] font-normal text-white">
                  {card.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
                <p className="text-left text-[16px] font-normal leading-normal text-white">
                  {card.footer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
