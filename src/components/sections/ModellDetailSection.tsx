"use client";

import { useRef } from "react";
import type { TouchEvent, WheelEvent } from "react";

const detailSlides = [
  {
    title: "S1 – STRATEGIE & MARKE",
    subline: "Fundament schaffen, bevor Maßnahmen starten.",
    mediaType: "image",
    mediaSrc: "/assets/sections/modell-detail/video-placeholder-strategie.png",
    body: "Hier entsteht Klarheit. Ohne sie wird Wachstum beliebig und zufällig.",
    list: [
      "Bestandsaufnahme Marketing- & Vertriebssystem",
      "Positionierungs-Workshop",
      "Zielgruppen- & Entscheideranalyse",
      "Argumentationslogik für Entscheider",
      "Angebots- & Leistungsarchitektur",
      "Corporate Identity & Messaging",
      "Wettbewerbsanalyse"
    ]
  },
  {
    title: "S2 – SICHTBARKEIT",
    subline: "Relevanz in Entscheidungsphasen aufbauen.",
    mediaType: "bg",
    mediaSrc: "/assets/sections/modell-detail/bg-sichtbarkeit.png",
    panelStyle: "overlay",
    body: "Nicht Reichweite ist das Ziel – sondern Wahrnehmung bei den richtigen Entscheidern.",
    list: [
      "SEO & GEO (inkl. Nischen wie „Lift & Shift“)",
      "Sichtbarkeit in KI-Systemen & LLMs",
      "LinkedIn-Strategie & Reputationsmarketing über Thought Leadership Contents",
      "Blogmarketing, White Papers & Fachartikel",
      "Videomarketing (Erklärung komplexer Leistungen)",
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
    title: "S3 – SYSTEME",
    subline: "Neukunden- und Recruitingprozesse reproduzierbar machen.",
    mediaType: "image",
    mediaSrc: "/assets/sections/modell-detail/video-placeholder-systeme.png",
    body: "Wachstum darf nicht vom Zufall oder einzelnen Personen abhängen.",
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
    title: "S4 – STRUKTUR",
    subline: "Organisation stabilisieren, während sie wächst.",
    mediaType: "video",
    mediaSrc: "/assets/sections/modell-detail/video-background-struktur.mp4",
    panelStyle: "overlay",
    body: "Mehr Nachfrage bedeutet mehr Komplexität. Struktur verhindert Unruhe.",
    list: [
      "Prozessanalyse & Optimierung",
      "Rollen- und Verantwortlichkeitsdefinition",
      "interne KPI-Systeme",
      "Automatisierung von Standardprozessen",
      "Schnittstellenoptimierung zwischen Marketing & Vertrieb"
    ]
  },
  {
    title: "S5 – SKALIERUNG",
    subline: "Führung und Organisation auf die nächste Stufe bringen.",
    mediaType: "video",
    mediaSrc: "/assets/sections/modell-detail/video-background-skalierung.mp4",
    panelStyle: "overlay",
    body: "Wachstum endet nicht bei Leads. Es endet in der Führung.",
    list: [
      "Führungsworkshops",
      "Vertriebstrainings",
      "Strategische Roadmaps",
      "Skalierungsplanung für neue Geschäftsfelder",
      "Organisationsentwicklung",
      "Management-Sparring"
    ]
  }
];

export default function ModellDetailSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleListWheel = (event: WheelEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const canScroll = target.scrollHeight > target.clientHeight;
    if (!canScroll) return;
    const atTop = target.scrollTop <= 0;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
    if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
      event.stopPropagation();
    }
  };

  const handleListTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const canScroll = target.scrollHeight > target.clientHeight;
    if (canScroll) {
      event.stopPropagation();
    }
  };

  return (
    <section ref={sectionRef} className="flex w-full flex-col items-center px-6 py-16 sm:px-10 lg:px-16 mt-32">
      <div className="content-wrap max-w-[1440px] flex flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-balance">DIE 5-S-MODULE IM DETAIL</h2>
          <h3 className="text-balance font-light">5 MODULE FÜR SICHERES WACHSTUM</h3>
        </div>
        <p className="text-balance">
          Die 5-S-Module sind kein Maßnahmenkatalog. Sie sind ein strukturiertes System, das Wachstum
          planbar macht. Nicht alles gleichzeitig. Aber alles in der richtigen Reihenfolge.
        </p>
      </div>
      <div className="content-wrap mt-24 w-full">
        <div className="flex w-full flex-col gap-10">
          {detailSlides.map((slide) => (
            <div
              key={slide.title}
              className="flex h-[90svh] w-full items-center justify-center overflow-hidden bg-[#080716]"
            >
              <div
                className="relative h-[90svh] w-full overflow-hidden rounded-[20px] border border-[#37515F] bg-[#080716]"
                style={
                  slide.mediaType === "bg"
                    ? {
                      backgroundImage: `url(${slide.mediaSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }
                    : undefined
                }
              >
                {slide.mediaType === "video" ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={slide.mediaSrc}
                  />
                ) : null}
                <div className="h-full w-full">
                  <div className="grid h-full grid-cols-2">
                    <div className="relative h-full w-full">
                      {slide.mediaType === "image" ? (
                        <img
                          src={slide.mediaSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-contain object-left"
                        />
                      ) : null}
                    </div>
                    <div
                      className={
                        "flex h-full flex-col justify-center px-10 " +
                        (slide.panelStyle === "overlay"
                          ? "bg-[linear-gradient(270deg,rgba(8,7,22,0.60)_0%,#080716_100%)] backdrop-blur-md"
                          : "")
                      }
                    >
                      <div className="flex h-full flex-col justify-center gap-8">
                        <h3 className="text-left text-balance font-semibold">{slide.title}</h3>
                        <div className="flex flex-col gap-2">
                          <h4 className="text-left text-[20px] text-balance font-semibold">
                            {slide.subline}
                          </h4>
                          <p className="text-left text-balance text-[#DBC18D]">{slide.body}</p>
                        </div>
                        <div
                          className="slide-list-scroll mt-6 flex max-h-[220px] flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain pr-2"
                          onWheel={handleListWheel}
                          onTouchMove={handleListTouchMove}
                        >
                          {slide.list.map((entry) => (
                            <div key={entry} className="flex flex-nowrap items-center gap-4">
                              <span className="flex h-[41px] w-[41px] flex-none items-center justify-center rounded-full border border-[#DBC18D42]">
                                <img
                                  src="/assets/sections/modell-detail/arrow-icon.svg"
                                  alt=""
                                  className="h-[11px] w-[11px]"
                                />
                              </span>
                              <p className="min-w-0 flex-shrink flex-grow-0 rounded-[30px] border border-[#DBC18D42] px-4 py-2 text-left text-balance">
                                {entry}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
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
