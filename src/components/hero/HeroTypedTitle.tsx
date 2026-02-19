"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "@/components/typography/SplitText";

const TEXTS = ["Das ist kein Pitch.", "Das ist ein System."];

export default function HeroTypedTitle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState(TEXTS[0]);

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

          gsap.set(chars, { opacity: 0, y: -14 });

          const tl = gsap.timeline({
            onComplete: () => {
              index = (index + 1) % TEXTS.length;
              gsap.delayedCall(0.3, run);
            }
          });

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
        gsap.killTweensOf("*");
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} >
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
