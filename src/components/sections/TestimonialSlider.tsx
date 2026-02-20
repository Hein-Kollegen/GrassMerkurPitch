"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "\"Martin, Dein Team macht einen wahnsinnig guten Job - super, super, super Job.\"",
    name: "Angelika Hamburger",
    role: "Director Human Resources, Daimler Truck",
    logo: "/assets/sections/testimonials/logo-daimler.png"
  },
  {
    quote:
      "\"Hein & Kollegen sind die Pragmatiker fuer den Mittelstand.\"",
    name: "brandeins",
    role: "Die besten Unternehmensberater 2024",
    logo: "/assets/sections/testimonials/logo-brandeins.png"
  },
  {
    quote:
      "\"Hein & Kollegen - fuer mich das Schweizer Taschenmesser\nim Marketing!\"",
    name: "Matthias Bianchi",
    role: "Leiter Public Affairs, Deutscher Mittelstands-Bund",
    logo: "/assets/sections/testimonials/logo-dmb.png"
  }
];

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const dragStartX = useRef<number | null>(null);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setDirection("next");
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 9000);

    return () => clearInterval(id);
  }, [hasInteracted]);

  const goNext = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    setHasInteracted(true);
    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <section className="flex min-h-[100svh] w-full justify-center px-6 py-16 sm:px-10 lg:px-16 mt-32">
      <div className="content-wrap flex flex-col items-center gap-20 text-center">
        <h2>KUNDENSTIMMEN</h2>

        <div
          className="relative h-[360px] w-full cursor-grab select-none active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="relative mx-auto h-full max-w-5xl overflow-hidden">
            {testimonials.map((item, index) => {
              const prevIndex = prevIndexRef.current;
              let positionClass = "translate-x-full";
              if (index === activeIndex) {
                positionClass = "translate-x-0";
              } else if (index === prevIndex) {
                positionClass = direction === "next" ? "-translate-x-full" : "translate-x-full";
              } else {
                positionClass = direction === "next" ? "translate-x-full" : "-translate-x-full";
              }

              return (
                <div
                  key={item.name}
                  className={
                    "absolute inset-0 flex flex-col transition-transform transition-opacity duration-700 " +
                    positionClass +
                    (index === activeIndex ? " opacity-100" : " opacity-0")
                  }
                >
                  <div className="flex-grow flex flex-col justify-center align-center">
                    <p className="text-center text-[48px] font-light leading-[1.25] text-white">
                      {item.quote}
                    </p>
                  </div>


                  <div className="mt-14 flex flex-row flex-nowrap items-center justify-center gap-8">
                    <div className="relative h-10 w-10 flex-none">
                      <Image src={item.logo} alt={item.name} fill className="object-contain" />
                    </div>
                    <p className="text-white">
                      <strong className="text-[22px] font-semibold mr-4">{item.name}</strong>{" "}
                      <span className="text-[22px] font-light">{item.role}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[30px]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex} className="text-[#DBC18D]">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  setDirection(index > activeIndex ? "next" : "prev");
                  setActiveIndex(index);
                }}
                className="h-8 w-12 rounded-full transition-colors duration-300"
                aria-label={`Slide ${index + 1}`}
              >
                <span
                  className={
                    "block h-[3px] w-10 rounded-full transition-colors duration-300 " +
                    (index === activeIndex ? "bg-[#DBC18D]" : "bg-white/20")
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
