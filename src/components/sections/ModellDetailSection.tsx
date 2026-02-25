"use client";

import { useRef } from "react";
import type { TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitLines } from "@/components/typography/useSplitLines";
import { useSplitScale } from "@/components/typography/useSplitScale";
import { Section } from "@/components/layout/Section";

const detailSlides = [
  {
    title: "S1 – STRATEGIE & MARKE",
    subline: "Fundament schaffen, bevor Maßnahmen starten.",
    mediaType: "videoLeft",
    mediaSrc: "/assets/sections/modell-detail/video-mock-up 1_1.mp4",
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
    mediaType: "video",
    mediaSrc: "/assets/sections/modell-detail/section 2 video.mp4",
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
    mediaType: "videoLeft",
    mediaSrc: "/assets/sections/modell-detail/video-mock-up 2.mp4",
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
  const stackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useSplitScale({ scope: sectionRef });
  useSplitLines({ scope: sectionRef });

  useGSAP(
    () => {
      if (!stackRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!stackRef.current) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!cards.length) return;

        const count = cards.length;

        cards.forEach((card, index) => {
          gsap.set(card, {
            yPercent: index === 0 ? 0 : 100,
            autoAlpha: index === 0 ? 1 : 0,
            zIndex: index + 1
          });
        });

        let trigger: ScrollTrigger | null = null;
        let touchStartY = 0;
        let listScrollTween: gsap.core.Tween | null = null;
        let controlledList: HTMLDivElement | null = null;
        const scrollState = { value: 0, target: 0 };

        const clampIndex = (value: number) =>
          Math.min(count - 1, Math.max(0, value));

        const getMaxScroll = (listEl: HTMLDivElement) =>
          Math.max(0, listEl.scrollHeight - listEl.clientHeight);

        const clampScroll = (listEl: HTMLDivElement, value: number) =>
          Math.min(getMaxScroll(listEl), Math.max(0, value));

        const setControlledList = (listEl: HTMLDivElement) => {
          if (controlledList === listEl) return;
          listScrollTween?.kill();
          controlledList = listEl;
          scrollState.value = listEl.scrollTop;
          scrollState.target = listEl.scrollTop;
        };

        const animateListTo = (listEl: HTMLDivElement, nextTarget: number) => {
          setControlledList(listEl);
          scrollState.target = clampScroll(listEl, nextTarget);

          listScrollTween?.kill();
          listScrollTween = gsap.to(scrollState, {
            value: scrollState.target,
            duration: 0.22,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
              if (!controlledList) return;
              controlledList.scrollTop = clampScroll(controlledList, scrollState.value);
            }
          });
        };

        const releaseListController = () => {
          listScrollTween?.kill();
          listScrollTween = null;
          controlledList = null;
        };

        const animateToIndex = (targetIndex: number) => {
          if (isAnimatingRef.current) return;

          const currentIndex = activeIndexRef.current;
          if (targetIndex === currentIndex) return;

          const direction = targetIndex > currentIndex ? 1 : -1;
          const nextCard = cards[targetIndex];
          const currentCard = cards[currentIndex];

          isAnimatingRef.current = true;

          const tl = gsap.timeline({
            defaults: { duration: 0.6, ease: "power2.out" },
            onComplete: () => {
              activeIndexRef.current = targetIndex;
              isAnimatingRef.current = false;
              releaseListController();
              const desired = clampIndex(
                Math.round((trigger?.progress ?? 0) * (count - 1))
              );
              if (desired !== activeIndexRef.current) {
                animateToIndex(desired);
              }
            }
          });

          if (direction > 0) {
            gsap.set(nextCard, { yPercent: 100, autoAlpha: 1 });
            tl.to(nextCard, { yPercent: 0 });
          } else {
            tl.to(currentCard, { yPercent: 100, autoAlpha: 0 });
            gsap.set(nextCard, { yPercent: 0, autoAlpha: 1 });
          }
        };

        trigger = ScrollTrigger.create({
          trigger: stackRef.current,
          start: "top top",
          end: () => `+=${(count - 1) * window.innerHeight}`,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = clampIndex(Math.round(self.progress * (count - 1)));
            if (!isAnimatingRef.current && nextIndex !== activeIndexRef.current) {
              animateToIndex(nextIndex);
            }
          }
        });

        const canScrollList = (listEl: HTMLDivElement | null) => {
          if (!listEl) return false;
          return listEl.scrollHeight > listEl.clientHeight + 1;
        };

        const handleWheel = (event: WheelEvent) => {
          if (!trigger?.isActive || isAnimatingRef.current) return;
          const listEl = listRefs.current[activeIndexRef.current];
          if (!listEl || !canScrollList(listEl)) return;

          const delta = event.deltaY;
          const effectiveScroll =
            controlledList === listEl ? scrollState.target : listEl.scrollTop;
          const maxScroll = getMaxScroll(listEl);
          const atTop = effectiveScroll <= 0.5;
          const atBottom = effectiveScroll >= maxScroll - 0.5;

          if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
            event.preventDefault();
            animateListTo(listEl, effectiveScroll + delta);
          }
        };

        const handleTouchStart = (event: TouchEvent) => {
          touchStartY = event.touches[0]?.clientY ?? 0;
        };

        const handleTouchMove = (event: TouchEvent) => {
          if (!trigger?.isActive || isAnimatingRef.current) return;
          const listEl = listRefs.current[activeIndexRef.current];
          if (!listEl || !canScrollList(listEl)) return;

          const currentY = event.touches[0]?.clientY ?? 0;
          const delta = touchStartY - currentY;
          const effectiveScroll =
            controlledList === listEl ? scrollState.target : listEl.scrollTop;
          const maxScroll = getMaxScroll(listEl);
          const atTop = effectiveScroll <= 0.5;
          const atBottom = effectiveScroll >= maxScroll - 0.5;

          if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
            event.preventDefault();
            animateListTo(listEl, effectiveScroll + delta);
            touchStartY = currentY;
          }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
          window.removeEventListener("wheel", handleWheel);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
          releaseListController();
          trigger?.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  const handleListWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const canScroll = target.scrollHeight > target.clientHeight;
    if (!canScroll) return;
    const atTop = target.scrollTop <= 0;
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
    if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
      event.stopPropagation();
    }
  };

  const handleListTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const canScroll = target.scrollHeight > target.clientHeight;
    if (canScroll) {
      event.stopPropagation();
    }
  };

  return (
    <Section
      ref={sectionRef}
      className="flex w-full flex-col items-center mt-32"
      innerClassName="w-full"
      useContentWrap={false}
    >
      <div className="content-wrap max-w-[1440px] flex flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="split-scale text-balance">DIE 5-S-MODULE IM DETAIL</h2>
          <h3 className="split-scale text-balance font-light">5 MODULE FÜR SICHERES WACHSTUM</h3>
        </div>
        <p className="split-lines text-balance">
          Die 5-S-Module sind kein Maßnahmenkatalog. Sie sind ein strukturiertes System, das Wachstum
          planbar macht. Nicht alles gleichzeitig. Aber alles in der richtigen Reihenfolge.
        </p>
      </div>
      <div className="mt-24 w-full">
        <div
          ref={stackRef}
          className="relative w-full flex flex-col gap-10 lg:block lg:h-[100svh] lg:w-[100vw] lg:overflow-hidden"
        >
          {detailSlides.map((slide, index) => (
            <div
              key={slide.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="flex h-[90svh] w-full items-center justify-center overflow-hidden bg-[#080716] lg:absolute lg:inset-0 lg:h-[100svh] lg:w-[100vw]"
            >
              <div className="content-wrap w-full">
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
                        {slide.mediaType === "videoLeft" ? (
                          <div className="absolute inset-x-0 inset-y-8">
                            <video
                              className="h-full w-full object-contain object-left"
                              autoPlay
                              loop
                              muted
                              playsInline
                              src={slide.mediaSrc}
                            />
                          </div>
                        ) : null}
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
                        <div className="flex h-full flex-col justify-center gap-8 py-16">
                          <h3 className="text-left text-balance font-semibold">{slide.title}</h3>
                          <div className="flex flex-col gap-2">
                            <h4 className="text-left text-[20px] text-balance font-semibold">
                              {slide.subline}
                            </h4>
                            <p className="text-left text-balance text-[#DBC18D]">{slide.body}</p>
                          </div>
                          <div
                            ref={(el) => {
                              listRefs.current[index] = el;
                            }}
                            className="slide-list-scroll mt-6 flex max-h-[250px] flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain pr-2"
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
