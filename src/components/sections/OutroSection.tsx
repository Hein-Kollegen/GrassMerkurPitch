"use client";

import { Section } from "@/components/layout/Section";

export default function OutroSection() {
  return (
    <Section
      className="bg-[#080716]"
      innerClassName="w-full flex items-center justify-center"
      centerY
      useContentWrap={false}
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src="/assets/page/hk-logo.svg"
          alt="Hein & Kollegen"
          className="h-[48px] w-auto"
        />
        <div className="text-[32px] tracking-[0.2em] text-[#DBC18D]" aria-label="5 stars">
          ★★★★★
        </div>
      </div>
    </Section>
  );
}
