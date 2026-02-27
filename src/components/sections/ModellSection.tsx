"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
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

type StepIndex = 0 | 1 | 2 | 3 | 4;

type TimelineMetrics = {
  startOffset: number;
  endOffset: number;
  cardWidth: number;
  gap: number;
  cardStep: number;
};

const LAST_STEP: StepIndex = 4;

const STEP_CONFIG = {
  WHEEL_THRESHOLD_PX: 60,
  TOUCH_THRESHOLD_PX: 52,
  GESTURE_IDLE_MS: 140,
  COOLDOWN_MS: 420,
  ENTRY_LOCK_IDLE_MS: 140,
  SESSION_IDLE_MS: 140,
  SESSION_COOLDOWN_MS: 420,
  ANCHOR_TOLERANCE_PX: 6,
  ANCHOR_OFFSET_PX: 1,
  TRACK_MOVE_DURATION: 0.5,
  HIGHLIGHT_FADE_DURATION: 0.2,
  PIN_DISTANCE_FACTOR: 1.2
} as const;

export default function ModellSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);

  useSplitScale({ scope: sectionRef });
  useSplitLines({ scope: sectionRef });

  const getMetrics = () => {
    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const firstCard = trackRef.current?.querySelector<HTMLElement>("[data-timeline-card]");
    if (!firstCard) {
      return {
        startOffset: 0,
        endOffset: 0,
        cardWidth: 0,
        gap: 24,
        cardStep: 0
      };
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 24;
    const startOffset = (viewportWidth - (3 * cardWidth + 2 * gap)) / 2;
    const endOffset = startOffset - (2 * (cardWidth + gap));
    const cardStep = cardWidth + gap;

    return {
      startOffset,
      endOffset,
      cardWidth,
      gap,
      cardStep
    };
  };

  useGSAP(() => {
    if (!viewportRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!trackRef.current || !viewportRef.current) return;

      let resizeTimer: number | null = null;
      let lastViewportWidth = window.innerWidth;
      let lastViewportHeight = window.innerHeight;
      let gestureIdleTimer: number | null = null;
      let touchStartY = 0;
      let currentStep: StepIndex = 0;
      let isPinnedActive = false;
      let isAnimating = false;
      let cooldownUntil = 0;
      let gestureAccumulator = 0;
      let gestureDirection: 1 | -1 | 0 = 0;
      let trackTween: gsap.core.Tween | null = null;
      let pinTrigger: ScrollTrigger | null = null;
      let metrics: TimelineMetrics = getMetrics();
      let entryLockActive = false;
      let entryLockIdleTimer: number | null = null;
      let gestureSessionActive = false;
      let gestureSessionConsumed = false;
      let gestureSessionIdleTimer: number | null = null;
      let isIntentionalRelease = false;

      if (!metrics.cardWidth) return;

      const getStepX = (step: StepIndex, currentMetrics: TimelineMetrics) => {
        if (step <= 1) return currentMetrics.startOffset;
        if (step === 2) return currentMetrics.startOffset - currentMetrics.cardStep;
        return currentMetrics.endOffset;
      };

      const clearGestureIdleTimer = () => {
        if (gestureIdleTimer !== null) {
          window.clearTimeout(gestureIdleTimer);
          gestureIdleTimer = null;
        }
      };

      const clearEntryLockIdleTimer = () => {
        if (entryLockIdleTimer !== null) {
          window.clearTimeout(entryLockIdleTimer);
          entryLockIdleTimer = null;
        }
      };

      const clearGestureSessionIdleTimer = () => {
        if (gestureSessionIdleTimer !== null) {
          window.clearTimeout(gestureSessionIdleTimer);
          gestureSessionIdleTimer = null;
        }
      };

      const resetGestureState = () => {
        gestureAccumulator = 0;
        gestureDirection = 0;
      };

      const refreshGestureIdleTimer = () => {
        clearGestureIdleTimer();
        gestureIdleTimer = window.setTimeout(() => {
          resetGestureState();
          gestureIdleTimer = null;
        }, STEP_CONFIG.GESTURE_IDLE_MS);
      };

      const resetGestureSession = () => {
        gestureSessionActive = false;
        gestureSessionConsumed = false;
        clearGestureSessionIdleTimer();
      };

      const refreshGestureSessionIdleTimer = () => {
        clearGestureSessionIdleTimer();
        gestureSessionIdleTimer = window.setTimeout(() => {
          resetGestureSession();
          resetGestureState();
          gestureSessionIdleTimer = null;
        }, STEP_CONFIG.SESSION_IDLE_MS);
      };

      const startEntryLock = () => {
        entryLockActive = true;
        clearEntryLockIdleTimer();
      };

      const refreshEntryLockIdleTimer = () => {
        clearEntryLockIdleTimer();
        entryLockIdleTimer = window.setTimeout(() => {
          entryLockActive = false;
          entryLockIdleTimer = null;
        }, STEP_CONFIG.ENTRY_LOCK_IDLE_MS);
      };

      const anchorInsidePin = (direction: 1 | -1) => {
        if (!pinTrigger) return;
        if (direction > 0) {
          if (Math.abs(window.scrollY - pinTrigger.start) > STEP_CONFIG.ANCHOR_TOLERANCE_PX) {
            pinTrigger.scroll(pinTrigger.start + STEP_CONFIG.ANCHOR_OFFSET_PX);
          }
          return;
        }
        if (Math.abs(window.scrollY - pinTrigger.end) > STEP_CONFIG.ANCHOR_TOLERANCE_PX) {
          pinTrigger.scroll(pinTrigger.end - STEP_CONFIG.ANCHOR_OFFSET_PX);
        }
      };

      const setHighlight = (index: number) => {
        overlayRefs.current.forEach((overlay, overlayIndex) => {
          if (!overlay) return;
          gsap.to(overlay, {
            autoAlpha: overlayIndex === index ? 1 : 0,
            duration: STEP_CONFIG.HIGHLIGHT_FADE_DURATION,
            ease: "power1.out",
            overwrite: true
          });
        });
      };

      const applyStepImmediate = (step: StepIndex) => {
        if (!trackRef.current) return;
        currentStep = step;
        isAnimating = false;
        trackTween?.kill();
        trackTween = null;
        gsap.set(trackRef.current, { x: getStepX(step, metrics) });
        overlayRefs.current.forEach((overlay, overlayIndex) => {
          if (!overlay) return;
          gsap.set(overlay, { autoAlpha: overlayIndex === step ? 1 : 0 });
        });
      };

      const animateToStep = (step: StepIndex) => {
        if (!trackRef.current) return;
        if (step === currentStep) return;

        const targetX = getStepX(step, metrics);
        const currentX = Number(gsap.getProperty(trackRef.current, "x")) || 0;
        const shouldMoveTrack = Math.abs(targetX - currentX) > 0.5;

        currentStep = step;
        setHighlight(step);

        if (!shouldMoveTrack) {
          gsap.set(trackRef.current, { x: targetX });
          return;
        }

        isAnimating = true;
        trackTween?.kill();
        trackTween = gsap.to(trackRef.current, {
          x: targetX,
          duration: STEP_CONFIG.TRACK_MOVE_DURATION,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            isAnimating = false;
            trackTween = null;
          }
        });
      };

      const releasePin = (direction: 1 | -1) => {
        if (!pinTrigger) return;
        isIntentionalRelease = true;
        gestureSessionConsumed = true;
        isPinnedActive = false;
        isAnimating = false;
        trackTween?.kill();
        trackTween = null;
        resetGestureState();
        resetGestureSession();
        clearEntryLockIdleTimer();
        entryLockActive = false;
        clearGestureIdleTimer();
        cooldownUntil = Date.now() + STEP_CONFIG.SESSION_COOLDOWN_MS;
        const targetScroll = direction > 0 ? pinTrigger.end + 2 : pinTrigger.start - 2;
        pinTrigger.scroll(targetScroll);
      };

      const handleStepTransition = (direction: 1 | -1) => {
        if (direction > 0) {
          if (currentStep === LAST_STEP) {
            releasePin(1);
            return;
          }
          animateToStep((currentStep + 1) as StepIndex);
          return;
        }

        if (currentStep === 0) {
          releasePin(-1);
          return;
        }
        animateToStep((currentStep - 1) as StepIndex);
      };

      const processGestureDelta = (delta: number, threshold: number) => {
        if (!isPinnedActive) return;
        if (delta === 0) return;
        if (entryLockActive) return;

        if (!gestureSessionActive) {
          gestureSessionActive = true;
          gestureSessionConsumed = false;
        }

        refreshGestureSessionIdleTimer();

        if (gestureSessionConsumed) return;

        const now = Date.now();
        if (isAnimating || now < cooldownUntil) {
          resetGestureState();
          refreshGestureIdleTimer();
          return;
        }

        const direction: 1 | -1 = delta > 0 ? 1 : -1;
        if (gestureDirection !== 0 && gestureDirection !== direction) {
          gestureAccumulator = 0;
        }
        gestureDirection = direction;
        gestureAccumulator += Math.abs(delta);
        refreshGestureIdleTimer();

        if (gestureAccumulator < threshold) {
          return;
        }

        gestureAccumulator = 0;
        gestureDirection = 0;
        gestureSessionConsumed = true;
        cooldownUntil = now + STEP_CONFIG.SESSION_COOLDOWN_MS;
        handleStepTransition(direction);
      };

      const handleWheel = (event: WheelEvent) => {
        if (!isPinnedActive) return;
        event.preventDefault();
        if (entryLockActive) {
          refreshEntryLockIdleTimer();
          return;
        }
        processGestureDelta(event.deltaY, STEP_CONFIG.WHEEL_THRESHOLD_PX);
      };

      const handleTouchStart = (event: TouchEvent) => {
        touchStartY = event.touches[0]?.clientY ?? 0;
        resetGestureState();
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!isPinnedActive) return;
        event.preventDefault();
        if (entryLockActive) {
          refreshEntryLockIdleTimer();
          return;
        }

        const currentY = event.touches[0]?.clientY ?? touchStartY;
        const delta = touchStartY - currentY;
        touchStartY = currentY;
        processGestureDelta(delta, STEP_CONFIG.TOUCH_THRESHOLD_PX);
      };

      pinTrigger = ScrollTrigger.create({
        trigger: viewportRef.current,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * STEP_CONFIG.PIN_DISTANCE_FACTOR)}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          isPinnedActive = true;
          startEntryLock();
          refreshEntryLockIdleTimer();
          cooldownUntil = Date.now() + STEP_CONFIG.SESSION_COOLDOWN_MS;
          resetGestureSession();
          resetGestureState();
          applyStepImmediate(0);
          anchorInsidePin(1);
        },
        onEnterBack: () => {
          isPinnedActive = true;
          startEntryLock();
          refreshEntryLockIdleTimer();
          cooldownUntil = Date.now() + STEP_CONFIG.SESSION_COOLDOWN_MS;
          resetGestureSession();
          resetGestureState();
          applyStepImmediate(LAST_STEP);
          anchorInsidePin(-1);
        },
        onLeave: () => {
          isPinnedActive = false;
          isIntentionalRelease = false;
          entryLockActive = false;
          clearEntryLockIdleTimer();
          resetGestureSession();
          resetGestureState();
          clearGestureIdleTimer();
        },
        onLeaveBack: () => {
          isPinnedActive = false;
          isIntentionalRelease = false;
          entryLockActive = false;
          clearEntryLockIdleTimer();
          resetGestureSession();
          resetGestureState();
          clearGestureIdleTimer();
        },
        onRefreshInit: () => {
          metrics = getMetrics();
        },
        onRefresh: () => {
          metrics = getMetrics();
          applyStepImmediate(currentStep);
        }
      });

      applyStepImmediate(0);

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });

      const handleViewportChange = () => {
        if (resizeTimer) {
          window.clearTimeout(resizeTimer);
        }
        resizeTimer = window.setTimeout(() => {
          const nextViewportWidth = window.innerWidth;
          const nextViewportHeight = window.innerHeight;
          if (
            nextViewportWidth === lastViewportWidth &&
            nextViewportHeight === lastViewportHeight
          ) {
            return;
          }
          lastViewportWidth = nextViewportWidth;
          lastViewportHeight = nextViewportHeight;
          ScrollTrigger.refresh();
        }, 120);
      };

      window.addEventListener("resize", handleViewportChange);
      window.addEventListener("orientationchange", handleViewportChange);

      return () => {
        if (resizeTimer) {
          window.clearTimeout(resizeTimer);
        }
        clearEntryLockIdleTimer();
        clearGestureSessionIdleTimer();
        clearGestureIdleTimer();
        trackTween?.kill();
        trackTween = null;
        pinTrigger?.kill();
        pinTrigger = null;
        entryLockActive = false;
        gestureSessionActive = false;
        gestureSessionConsumed = false;
        isIntentionalRelease = false;
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("resize", handleViewportChange);
        window.removeEventListener("orientationchange", handleViewportChange);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      if (!trackRef.current) return;

      gsap.set(trackRef.current, {
        x: 0,
        clearProps: "x,transform,willChange"
      });

      overlayRefs.current.forEach((overlay) => {
        if (!overlay) return;
        gsap.set(overlay, { autoAlpha: 0 });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center px-6 py-32 lg:px-16"
    >
      <div className="content-wrap max-w-[1440px] flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center">
          <SplitText
            text="Der Weg?"
            split="words"
            as="h3"
            className="split-scale mb-2 lg:mb-0"
            childClassName="inline-block"
          />
          <SplitText
            text="DAS 5-S-MODELL "
            split="words"
            as="h2"
            className="split-scale uppercase leading-[1.2] lg:leading-[1.1]"
            childClassName="inline-block"
          />
          <SplitText
            text="FÜR SICHERES WACHSTUM"
            split="words"
            as="h2"
            className="split-scale uppercase leading-[1.2] lg:leading-[1.1]"
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
      <div className="content-wrap mt-16 w-full max-w-[1440px] lg:mt-48">
        <div ref={viewportRef} className="overflow-visible lg:flex lg:h-[100svh] lg:items-center">
          <div
            ref={trackRef}
            className="flex w-full min-w-0 flex-col gap-8 pb-0 lg:min-w-max lg:flex-row lg:items-start lg:gap-6 lg:will-change-transform lg:select-none lg:touch-pan-y lg:active:cursor-grabbing"
          >
            {timelineCards.map((card, index) => (
              <div
                key={card.title}
                data-timeline-card
                className={
                  "relative flex min-h-[260px] w-full flex-none flex-col overflow-hidden rounded-[50px] border border-[#DBC18D]/30 bg-[linear-gradient(90deg,#080716_0%,#080716_100%)] p-6 transition-[border-color] duration-300 ease-out lg:w-[calc((min(1440px,100vw)-3rem)/3)] lg:p-10 " +
                  (index % 2 === 0 ? "lg:self-start" : "lg:self-end lg:mt-20")
                }
              >
                <div
                  ref={(el) => {
                    overlayRefs.current[index] = el;
                  }}
                  className="absolute inset-0 opacity-0 bg-[linear-gradient(90deg,#082940_0%,#080716_100%)]"
                />
                <div className="absolute right-4 top-4 z-[1] h-16 w-16 rounded-full bg-gradient-to-b from-[#DBC18D]/40 to-transparent p-[1px] lg:h-20 lg:w-20">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#080716] p-4">
                    <img src={card.iconSrc} alt="" className="h-10 w-10 rounded-full object-contain lg:h-16 lg:w-16" />
                  </div>
                </div>
                <div className="relative z-[1] gap-6 flex flex-col">
                  <h3 className="text-left text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium uppercase text-white">
                    {card.title}
                  </h3>
                  <div className="flex flex-col">
                    <h4 className="mt-1 text-left text-[clamp(1.125rem,1.45vw,1.25rem)] font-medium text-white">
                      {card.subline}
                    </h4>
                    <p className="text-left text-[clamp(1rem,1.05vw,1.125rem)] font-normal leading-normal text-[#DBC18D]">
                      {card.body}
                    </p>
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-left text-[clamp(1rem,1.05vw,1.125rem)] font-normal text-white">
                    {card.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                  <p className="text-left text-[clamp(1rem,1.05vw,1.125rem)] font-normal leading-normal text-white">
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
