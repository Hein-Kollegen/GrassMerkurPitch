"use client";

import { Section } from "@/components/layout/Section";

export default function OutroSection() {
  return (
    <Section
      className="mt-48 bg-[#080716]"
      innerClassName="w-full flex items-center justify-center"
      centerY
      useContentWrap={false}
    >
      <div className="flex flex-col items-center gap-2">
        <img
          src="/assets/page/hk-logo.svg"
          alt="Hein & Kollegen"
          className="h-[64px] w-auto"
        />
        <div className="text-[clamp(1.75rem,3.2vw,2.5rem)] tracking-[0.2em] text-[#DBC18D]" aria-label="5 stars">
          ★★★★★
        </div>
      </div>
    </Section>
  );
}
