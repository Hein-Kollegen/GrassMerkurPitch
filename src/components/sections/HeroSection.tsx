"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "@/components/typography/SplitText";

const TEXTS = ["Das ist kein Pitch.", "Das ist ein System."];

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

function HeroTypedTitle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState(TEXTS[0]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const delayedRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      let index = 0;
      let isMounted = true;

      const run = () => {
        if (!isMounted) return;
        setText(TEXTS[index]);

        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const chars = containerRef.current.querySelectorAll<HTMLElement>(
            "[data-split-child]"
          );

          timelineRef.current?.kill();
          delayedRef.current?.kill();
          gsap.set(chars, { opacity: 0, y: -14 });

          const tl = gsap.timeline({
            onComplete: () => {
              index = (index + 1) % TEXTS.length;
              delayedRef.current = gsap.delayedCall(0.3, run);
            }
          });
          timelineRef.current = tl;

          tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.03,
            ease: "power2.out"
          })
            .to(chars, { duration: 4 })
            .to(chars, {
              opacity: 0,
              y: 14,
              duration: 0.35,
              stagger: {
                each: 0.02,
                from: "end"
              },
              ease: "power2.in"
            });
        });
      };

      run();

      return () => {
        isMounted = false;
        timelineRef.current?.kill();
        delayedRef.current?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <SplitText
        text={text}
        split="chars"
        as="h1"
        className="m-0 text-h1 font-extrabold uppercase text-white"
        childClassName="inline-block"
      />
    </div>
  );
}

function HeroRow({
  images,
  direction,
  rowIndex,
  trackRefs
}: {
  images: string[];
  direction: "left" | "right";
  rowIndex: number;
  trackRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
}) {
  return (
    <div>
      <div
        ref={(el) => {
          trackRefs.current[rowIndex] = el;
        }}
        className={`hero-marquee-track ${direction === "left" ? "hero-row-left" : "hero-row-right"
          }`}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="hero-marquee-rail">
            {images.map((src, index) => (
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

export default function HeroSection() {
  const rows = [
    heroImages.slice(0, 4),
    heroImages.slice(4, 8),
    heroImages.slice(8, 12),
    [heroImages[1], heroImages[3], heroImages[5], heroImages[7]]
  ];
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let tweens: gsap.core.Tween[] = [];
    let resizeTimer: number | undefined;

    const cleanupTracks = () => {
      tweens.forEach((tween) => tween.kill());
      tweens = [];

      trackRefs.current.forEach((trackEl) => {
        if (!trackEl) return;
        const rails = trackEl.querySelectorAll(".hero-marquee-rail");
        rails.forEach((rail, railIndex) => {
          if (railIndex > 1) {
            rail.remove();
          }
        });
        gsap.set(trackEl, { x: 0, willChange: "auto" });
      });
    };

    const setupTracks = () => {
      cleanupTracks();

      trackRefs.current.forEach((trackEl, index) => {
        if (!trackEl) return;
        const rails = trackEl.querySelectorAll<HTMLDivElement>(".hero-marquee-rail");
        if (!rails.length) return;

        const firstRail = rails[0];
        const railWidth = firstRail.getBoundingClientRect().width;
        if (!railWidth) return;

        const minWidth = window.innerWidth * 2;

        while (trackEl.scrollWidth < minWidth) {
          const clone = firstRail.cloneNode(true) as HTMLDivElement;
          trackEl.appendChild(clone);
        }

        const direction = index % 2 === 0 ? "left" : "right";
        const wrap = direction === "left"
          ? gsap.utils.wrap(-railWidth, 0)
          : gsap.utils.wrap(0, railWidth);

        gsap.set(trackEl, { x: 0, willChange: "transform" });

        const tween = gsap.to(trackEl, {
          x: direction === "left" ? `-=${railWidth}` : `+=${railWidth}`,
          duration: 55,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (value) => {
              const numeric = parseFloat(value);
              return `${wrap(numeric)}px`;
            }
          }
        });

        tweens.push(tween);
      });
    };

    setupTracks();

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupTracks, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      cleanupTracks();
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080716] px-6 py-10 sm:px-10 lg:px-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-150 rotate-12">
            <div className="flex flex-col gap-4 opacity-60">
              <HeroRow images={rows[0]} direction="left" rowIndex={0} trackRefs={trackRefs} />
              <HeroRow images={rows[1]} direction="right" rowIndex={1} trackRefs={trackRefs} />
              <HeroRow images={rows[2]} direction="left" rowIndex={2} trackRefs={trackRefs} />
              <HeroRow images={rows[3]} direction="right" rowIndex={3} trackRefs={trackRefs} />
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
          <div className="flex flex-col items-center gap-12 text-center">
            <HeroTypedTitle />
            <p className="m-0 text-[clamp(1rem,1.2vw,1.25rem)] font-medium text-white text-shadow-[0_3px_10px_rgba(0,0,0,0.8)] [font-family:var(--font-display)]">
              {"Ein System für Wachstum, Umsatz, Mitarbeitergewinnung und Planbarkeit für Grass-Merkur."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
