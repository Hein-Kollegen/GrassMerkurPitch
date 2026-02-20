"use client";

import Image from "next/image";

const counters = [
  { value: "50.000+", label: "Zuhoerer pro Jahr" },
  { value: "10.000+", label: "Follower auf relevanten Social-Media-Kanaelen" },
  { value: "5.000+", label: "Entscheider im eigenen Netzwerk" },
  { value: "10+", label: "eigene Formate" }
];

const badges = [
  { name: "Recruitee", src: "/assets/sections/overview/recruitee-siegel.png" },
  { name: "LinkedIn", src: "/assets/sections/overview/linkedin-siegel.png" },
  { name: "LinkedIn 2", src: "/assets/sections/overview/linkedIn-siegel2.png" },
  { name: "Meta", src: "/assets/sections/overview/meta-siegel.png" },
  { name: "Google", src: "/assets/sections/overview/google-siegel.png" },
  { name: "Proven Expert", src: "/assets/sections/overview/proven-expert-siegel.png" }
];

export default function OverviewSection() {
  return (
    <section className="flex w-full justify-center px-6 py-16 sm:px-10 lg:px-16 mt-32">
      <div className="content-wrap flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2>HEIN & KOLLEGEN IM UEBERBLICK</h2>
          <h3>WACHSTUM ENTSTEHT, WO RELEVANZ, REICHWEITE UND <br />GLAUBWUERDIGKEIT ZUSAMMENKOMMEN.</h3>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {counters.map((counter) => (
            <div key={counter.value} className="flex min-w-[200px] flex-1 flex-col gap-2 text-center">
              <div className="text-[64px] font-extrabold uppercase leading-[1] text-white">
                {counter.value}
              </div>
              <p className="text-[16px] font-normal text-[#DBC18D]">
                {counter.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-nowrap justify-between gap-6 overflow-x-auto scroll-smooth pr-2">
          {badges.map((badge) => (
            <div
              key={badge.src}
              className="relative h-32 w-32 flex-none"
            >
              <Image src={badge.src} alt={badge.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
