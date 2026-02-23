"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  [
    { name: "Telcat", src: "/assets/sections/partners/telcat.png", width: 327, height: 85 },
    { name: "Volksbank", src: "/assets/sections/partners/volksbank.png", width: 314, height: 72 },
    {
      name: "Daimler Truck",
      src: "/assets/sections/partners/daimler-truck.png",
      width: 632,
      height: 113
    },
    {
      name: "Schubert Motors",
      src: "/assets/sections/partners/schubert-motors.png",
      width: 1567,
      height: 364
    }
  ],
  [
    { name: "DMB", src: "/assets/sections/partners/dmb.png", width: 1056, height: 264 },
    {
      name: "ProvenExpert",
      src: "/assets/sections/partners/proven-expert.png",
      width: 600,
      height: 91
    },
    { name: "Senden", src: "/assets/sections/partners/senden.png", width: 344, height: 64 },
    { name: "b4it", src: "/assets/sections/partners/b4it.png", width: 1024, height: 435 }
  ],
  [
    { name: "VDV", src: "/assets/sections/partners/vdv.png", width: 888, height: 153 },
    {
      name: "Swisspor",
      src: "/assets/sections/partners/swisspor.png",
      width: 1280,
      height: 365
    },
    {
      name: "BMW Motorsport",
      src: "/assets/sections/partners/bmw-motorsport.png",
      width: 824,
      height: 152
    },
    { name: "HSB", src: "/assets/sections/partners/hsb.png", width: 242, height: 65 }
  ],
  [
    {
      name: "Krammer",
      src: "/assets/sections/partners/krammer.png",
      width: 1182,
      height: 360
    },
    { name: "Point S", src: "/assets/sections/partners/point-s.png", width: 732, height: 201 },
    { name: "Metzger", src: "/assets/sections/partners/metzger.png", width: 283, height: 170 },
    { name: "R+V", src: "/assets/sections/partners/rv.png", width: 304, height: 128 },
    {
      name: "Reiseland",
      src: "/assets/sections/partners/reiseland.png",
      width: 3023,
      height: 758
    }
  ]
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const rowElsRef = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !rowsRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(rowsRef.current, { yPercent: 0 });
        rowElsRef.current.forEach((rowEl) => {
          if (rowEl) gsap.set(rowEl, { scale: 1 });
        });
        return;
      }

      gsap.set(rowsRef.current, { yPercent: 100, willChange: "transform" });

      gsap.to(rowsRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true
        },
        onComplete: () => {
          gsap.set(rowsRef.current, { willChange: "auto" });
        }
      });

      rowElsRef.current.forEach((rowEl) => {
        if (!rowEl) return;

        gsap.fromTo(
          rowEl,
          { scale: 0.7, opacity: 0, transformOrigin: "center center" },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowEl,
              start: "top bottom",
              end: "top 70%",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-midnight px-6 py-16 sm:px-10 lg:px-16 flex items-center justify-center"
    >
      <div className="content-wrap flex h-full items-center justify-center">
        <div ref={rowsRef} className="flex w-full flex-col items-center justify-center gap-16">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              ref={(el) => {
                rowElsRef.current[rowIndex] = el;
              }}
              className="flex w-full flex-row flex-nowrap items-center justify-between gap-16"
            >
              {row.map((logo, logoIndex) => (
                <div key={logo.name}>
                  <div className="relative h-8 sm:h-10 lg:h-12">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      className="h-8 w-auto sm:h-10 lg:h-12"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#080716] to-[#08071600]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#080716] to-[#08071600]"
      />
    </section>
  );
}
