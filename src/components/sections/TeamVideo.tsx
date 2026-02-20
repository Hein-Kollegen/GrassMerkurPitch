"use client";

import { useRef } from "react";

export default function TeamVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    }
    await video.play();
  };

  return (
    <section className="flex w-full flex-col items-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-4 text-center">
        <h2>IHR SEID KEIN PROJEKT FUER UNS.</h2>
        <h3>ES SEID UNSERE NEUE HERZENSANGELEGENHEIT.</h3>
        <p>
          Verantwortung braucht Menschen, die sich wahrnehmen. Sonst bleibt sie ein leeres Versprechen.
          Und hier sind die Menschen, die diese Verantwortung uebernehmen wollen.
        </p>
      </div>

      <div className="relative mt-10 h-[100svh] w-screen overflow-hidden bg-[#080716]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          src="/assets/videos/team.mp4"
        />
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0B0B1A] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            ▶
          </span>
        </button>
      </div>
    </section>
  );
}
