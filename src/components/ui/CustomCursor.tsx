"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CURSOR_MEDIA_QUERY = "(min-width: 1024px) and (pointer: fine)";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(CURSOR_MEDIA_QUERY);
    const root = document.documentElement;

    const sync = () => {
      const nextEnabled = media.matches;
      setEnabled(nextEnabled);
      root.classList.toggle("custom-cursor", nextEnabled);
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      root.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });
    const ringScaleTo = gsap.quickTo(ring, "scale", { duration: 0.24, ease: "power2.out" });
    const ringOpacityTo = gsap.quickTo(ring, "opacity", { duration: 0.24, ease: "power2.out" });

    const onPointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      gsap.set(dot, { x: clientX, y: clientY });
      ringXTo(clientX);
      ringYTo(clientY);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='interactive']")) {
        return;
      }
      ringScaleTo(1.25);
      ringOpacityTo(1);
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='interactive']")) {
        return;
      }
      ringScaleTo(1);
      ringOpacityTo(1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      gsap.killTweensOf(ring);
      gsap.killTweensOf(dot);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
