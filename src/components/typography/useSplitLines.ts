"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

type UseSplitLinesOptions = {
  scope: RefObject<HTMLElement | null>;
};

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useSplitLines({ scope }: UseSplitLinesOptions) {
  useGSAP(
    () => {
      if (!scope.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const targets = gsap.utils.toArray<HTMLElement>(".split-lines", scope.current);

      if (prefersReducedMotion) {
        targets.forEach((target) => {
          gsap.set(target, { opacity: 1 });
        });
        return;
      }

      const animations: gsap.core.Tween[] = [];
      const splits: SplitText[] = [];

      targets.forEach((target) => {
        const split = SplitText.create(target, {
          type: "words, lines",
          linesClass: "line++",
          mask: "lines"
        });

        splits.push(split);

        const lines = split.lines as HTMLElement[];
        if (!lines.length) return;

        gsap.set(lines, { transformOrigin: "center center" });

        const tween = gsap.fromTo(
          lines,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            stagger: 0.1,
            ease: "elastic.out(1, 0.8)",
            scrollTrigger: {
              trigger: target,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );

        animations.push(tween);
      });

      const onResize = () => {
        animations.forEach((t) => t.kill());
        splits.forEach((s) => s.revert());
        ScrollTrigger.refresh();
      };
      let rafId: number | null = null;
      let delayedRefreshId: number | null = null;
      let isActive = true;

      const refreshAfterFrame = () => {
        rafId = window.requestAnimationFrame(() => {
          if (!isActive) return;
          ScrollTrigger.refresh();
          delayedRefreshId = window.setTimeout(() => {
            if (!isActive) return;
            ScrollTrigger.refresh();
          }, 120);
        });
      };

      if (document.fonts?.ready) {
        document.fonts.ready
          .catch(() => undefined)
          .finally(() => {
            if (!isActive) return;
            refreshAfterFrame();
          });
      }

      window.addEventListener("resize", onResize);

      return () => {
        isActive = false;
        window.removeEventListener("resize", onResize);
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
        }
        if (delayedRefreshId !== null) {
          window.clearTimeout(delayedRefreshId);
        }
        animations.forEach((t) => t.kill());
        splits.forEach((s) => s.revert());
      };
    },
    { scope }
  );
}
