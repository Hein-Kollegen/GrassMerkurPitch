"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitLines } from "@/components/typography/useSplitLines";
import { useSplitScale } from "@/components/typography/useSplitScale";

export default function TeamVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useSplitScale({ scope: sectionRef });
  useSplitLines({ scope: sectionRef });

  useGSAP(
    () => {
      if (!videoWrapRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(videoWrapRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        videoWrapRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
          }
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = videoRef.current;
      if (!video) return;
      const doc = document as Document & {
        webkitFullscreenElement?: Element | null;
        mozFullScreenElement?: Element | null;
        msFullscreenElement?: Element | null;
      };
      if (
        !doc.fullscreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.msFullscreenElement
      ) {
        video.pause();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    const video = videoRef.current;
    if (video) {
      video.addEventListener("webkitendfullscreen", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      if (video) {
        video.removeEventListener("webkitendfullscreen", handleFullscreenChange);
      }
    };
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    try {
      const requestFullscreen =
        video.requestFullscreen ||
        (video as HTMLVideoElement & {
          webkitRequestFullscreen?: () => Promise<void> | void;
          mozRequestFullScreen?: () => Promise<void> | void;
          msRequestFullscreen?: () => Promise<void> | void;
        }).webkitRequestFullscreen ||
        (video as HTMLVideoElement & {
          mozRequestFullScreen?: () => Promise<void> | void;
        }).mozRequestFullScreen ||
        (video as HTMLVideoElement & {
          msRequestFullscreen?: () => Promise<void> | void;
        }).msRequestFullscreen;

      if (requestFullscreen) {
        await requestFullscreen.call(video);
      } else if (
        (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void })
          .webkitEnterFullscreen
      ) {
        (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen?.();
      }
    } catch {
      // Ignore fullscreen errors, play anyway.
    }
    await video.play();
  };

  return (
    <section
      ref={sectionRef}
      className="mt-80 flex w-full flex-col items-center gap-48"
    >
      <div className="content-wrap flex flex-col items-center gap-16 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="split-scale">IHR SEID KEIN PROJEKT FÜR UNS.</h2>
          <h3 className="split-scale">ES SEID UNSERE NEUE HERZENSANGELEGENHEIT.</h3>
        </div>

        <p className="split-lines">
          Verantwortung braucht Menschen, die sich wahrnehmen. Sonst bleibt sie ein leeres Versprechen.
          <br />
          Und hier sind die Menschen, die diese Verantwortung übernehmen wollen.
        </p>
      </div>

      <div
        ref={videoWrapRef}
        className="relative h-[100svh] w-screen overflow-hidden bg-[#080716]"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          src="/assets/sections/team-video/team.mp4"
        />
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center cursor-pointer"
          aria-label="Play video"
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(219,193,141,0.33)] bg-[linear-gradient(90deg,#082940_0%,#080716_100%)] text-[#DBC18D] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition duration-300 ease-out group-hover:scale-[1.05] group-hover:border-[rgba(219,193,141,0.6)] group-hover:bg-[linear-gradient(90deg,#0D3C57_0%,#080716_100%)] group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 -translate-x-[3px]"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

