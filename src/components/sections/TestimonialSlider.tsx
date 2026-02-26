"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
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
  const GESTURE_IDLE_MS = 120;
  const SLIDE_SWITCH_THRESHOLD = 0.35;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeSlideRef = useRef(0);
  const isSlideTransitioningRef = useRef(false);
  const isStepGestureLockRef = useRef(false);
  const stepLockDirectionRef = useRef<1 | -1 | 0>(0);
  const gestureActiveRef = useRef(false);
  const gestureIdleTimerRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useSplitLines({ scope: sectionRef });

  const clearGestureTimer = () => {
    if (gestureIdleTimerRef.current !== null) {
      window.clearTimeout(gestureIdleTimerRef.current);
      gestureIdleTimerRef.current = null;
    }
  };

  const markGestureActivity = () => {
    const isNewGesture = !gestureActiveRef.current;
    gestureActiveRef.current = true;
    clearGestureTimer();
    gestureIdleTimerRef.current = window.setTimeout(() => {
      gestureActiveRef.current = false;
      gestureIdleTimerRef.current = null;
    }, GESTURE_IDLE_MS);
    return isNewGesture;
  };

  const lockStepForGesture = (direction: 1 | -1) => {
    isStepGestureLockRef.current = true;
    stepLockDirectionRef.current = direction;
  };

  const clearStepGestureLock = () => {
    isStepGestureLockRef.current = false;
    stepLockDirectionRef.current = 0;
  };

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

      if (!sectionRef.current || !swiperRef.current) return;

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

      const slidesCount = testimonials.length;
      const steps = slidesCount;
      const holdSteps = 1;
      const stepLength = 400;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${stepLength * (steps + holdSteps)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const delta = progress - lastProgressRef.current;
          lastProgressRef.current = progress;

          const direction: 1 | -1 | 0 = delta > 0.0005 ? 1 : delta < -0.0005 ? -1 : 0;
          if (direction === 0) return;

          const isNewGesture = markGestureActivity();
          if (isNewGesture) {
            clearStepGestureLock();
          }

          if (isStepGestureLockRef.current && stepLockDirectionRef.current === direction) {
            return;
          }

          if (isSlideTransitioningRef.current) return;

          const current = activeSlideRef.current;

          if (direction > 0 && current < steps - 1) {
            const thresholdProgress = (current + SLIDE_SWITCH_THRESHOLD) / steps;
            if (progress >= thresholdProgress) {
              const targetIndex = current + 1;
              isSlideTransitioningRef.current = true;
              lockStepForGesture(1);
              swiperRef.current?.slideTo(targetIndex, 600);
            }
          }

          if (direction < 0 && current > 0) {
            const thresholdProgress = (current - SLIDE_SWITCH_THRESHOLD) / steps;
            if (progress <= thresholdProgress) {
              const targetIndex = current - 1;
              isSlideTransitioningRef.current = true;
              lockStepForGesture(-1);
              swiperRef.current?.slideTo(targetIndex, 600);
            }
          }
        },
        onRefresh: () => {
          const current = swiperRef.current?.activeIndex ?? 0;
          activeSlideRef.current = current;
          lastProgressRef.current = 0;
          isSlideTransitioningRef.current = false;
          gestureActiveRef.current = false;
          clearStepGestureLock();
          clearGestureTimer();
        }
      });

      return () => {
        clearGestureTimer();
        clearStepGestureLock();
        isSlideTransitioningRef.current = false;
        gestureActiveRef.current = false;
      };
    },
    { scope: sectionRef }
  );

  return (
    <Section
      ref={sectionRef}
      className="flex w-full justify-center align-center"
      innerClassName="w-full"
      useContentWrap={false}
      centerY={true}
    >
      <div className="content-wrap flex flex-col items-center gap-16 text-center">
        <h2 className="split-lines">KUNDENSTIMMEN</h2>

        <div ref={sliderRef} className="relative w-full">
          <div className="relative mx-auto h-full max-w-5xl">
            <Swiper
              modules={[Pagination]}
              loop={false}
              speed={700}
              grabCursor={false}
              allowTouchMove={false}
              pagination={{ clickable: false, el: ".testimonial-pagination" }}
              className="testimonial-swiper h-full"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                activeSlideRef.current = swiper.activeIndex;
                isSlideTransitioningRef.current = false;
              }}
              onSlideChange={(swiper) => {
                activeSlideRef.current = swiper.activeIndex;
              }}
              onSlideChangeTransitionEnd={(swiper) => {
                activeSlideRef.current = swiper.activeIndex;
                isSlideTransitioningRef.current = false;
              }}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.name} className="flex flex-col">
                  <div className="flex-grow flex flex-col justify-center align-center">
                    <p className="text-center text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.25] text-white">
                      {item.quote}
                    </p>
                  </div>

                  <div className="mt-14 flex flex-row flex-nowrap items-center justify-center gap-8">
                    <div className="relative h-10 w-10 flex-none">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white">
                      <strong className="text-[clamp(1.125rem,1.6vw,1.375rem)] font-semibold mr-4">{item.name}</strong>{" "}
                      <span className="text-[clamp(1.125rem,1.6vw,1.375rem)] font-light">{item.role}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[clamp(1.375rem,2.4vw,1.875rem)]">
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
