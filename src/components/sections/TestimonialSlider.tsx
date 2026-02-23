"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSplitLines } from "@/components/typography/useSplitLines";
import { Section } from "@/components/layout/Section";

const testimonials = [
  {
    quote:
      "\"Martin, Dein Team macht einen wahnsinnig guten Job - super, super, super Job.\"",
    name: "Angelika Hamburger",
    role: "Director Human Resources, Daimler Truck",
    logo: "/assets/sections/testimonials/logo-daimler.png"
  },
  {
    quote: "\"Hein & Kollegen sind die Pragmatiker für den Mittelstand.\"",
    name: "brandeins",
    role: "Die besten Unternehmensberater 2024",
    logo: "/assets/sections/testimonials/logo-brandeins.png"
  },
  {
    quote:
      "\"Hein & Kollegen - für mich das Schweizer Taschenmesser\nim Marketing!\"",
    name: "Matthias Bianchi",
    role: "Leiter Public Affairs, Deutscher Mittelstands-Bund",
    logo: "/assets/sections/testimonials/logo-dmb.png"
  }
];

export default function TestimonialSlider() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useSplitLines({ scope: sectionRef });

  useGSAP(
    () => {
      if (!sliderRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(sliderRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <Section
      ref={sectionRef}
      className="flex w-full justify-center mt-32"
      innerClassName="w-full"
      useContentWrap={false}
    >
      <div className="content-wrap flex flex-col items-center gap-20 text-center">
        <h2 className="split-lines">KUNDENSTIMMEN</h2>

        <div ref={sliderRef} className="relative w-full">
          <div className="relative mx-auto h-full max-w-5xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop
              speed={700}
              grabCursor
              autoplay={{ delay: 9000, disableOnInteraction: true }}
              pagination={{ clickable: true, el: ".testimonial-pagination" }}
              className="testimonial-swiper h-full"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.name} className="flex flex-col">
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
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="testimonial-pagination" />
          </div>
        </div>
      </div>
    </Section>
  );
}
