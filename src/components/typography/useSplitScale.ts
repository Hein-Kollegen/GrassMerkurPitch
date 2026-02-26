"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseSplitScaleOptions = {
  scope: RefObject<HTMLElement | null>;
};

export function useSplitScale({ scope }: UseSplitScaleOptions) {
  useGSAP(
    () => {
      if (!scope.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(scope.current.querySelectorAll(".split-scale"), { opacity: 1, scale: 1 });
        return;
      }

      const targets = gsap.utils.toArray<HTMLElement>(".split-scale", scope.current);
      const tweens: gsap.core.Tween[] = [];
      let rafId: number | null = null;
      let delayedRefreshId: number | null = null;
      let isActive = true;

      targets.forEach((target) => {
        const tween = gsap.fromTo(
          target,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1, 0.8)",
            duration: 1,
            scrollTrigger: {
              trigger: target,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
        tweens.push(tween);
      });

      const refreshAfterFonts = () => {
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
            refreshAfterFonts();
          });
      }

      return () => {
        isActive = false;
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
        }
        if (delayedRefreshId !== null) {
          window.clearTimeout(delayedRefreshId);
        }
        tweens.forEach((tween) => tween.kill());
      };
    },
    { scope }
  );
}
