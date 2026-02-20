"use client";

export default function OutroSection() {
  return (
    <section className="flex h-[100svh] w-full items-center justify-center bg-[#080716]">
      <div className="flex flex-col items-center gap-3">
        <img
          src="/assets/hero/hk-logo.svg"
          alt="Hein & Kollegen"
          className="h-[48px] w-auto"
        />
        <div className="text-[20px] tracking-[0.2em] text-[#DBC18D]" aria-label="5 stars">
          {"★★★★★"}
        </div>
      </div>
    </section>
  );
}
