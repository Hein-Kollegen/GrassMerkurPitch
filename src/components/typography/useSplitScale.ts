"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
      const splits: SplitText[] = [];
      const tweens: gsap.core.Tween[] = [];

      targets.forEach((target) => {
        target.style.whiteSpace = "pre-wrap";
        const split = SplitText.create(target, {
          type: "words",
          wordsClass: "word++",
          reduceWhiteSpace: false
        });
        splits.push(split);
        const words = split.words as HTMLElement[];
        if (!words.length) {
          split.revert();
          return;
        }

        const tween = gsap.fromTo(
          words,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
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

      return () => {
        tweens.forEach((tween) => tween.kill());
        splits.forEach((split) => split.revert());
      };
    },
    { scope }
  );
}
