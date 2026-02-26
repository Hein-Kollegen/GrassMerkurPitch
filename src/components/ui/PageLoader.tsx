"use client";

import Image from "next/image";
import { usePageBoot } from "@/components/providers/PageBootProvider";

export default function PageLoader() {
  const { isBootReady, isLoaderVisible } = usePageBoot();

  if (!isLoaderVisible) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[2147483646] flex items-center justify-center bg-[#080716] transition-opacity duration-700 " +
        (isBootReady ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100")
      }
      aria-hidden={isBootReady}
      aria-live="polite"
      role="status"
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/assets/page/hk-logo.svg"
          alt="Hein & Kollegen"
          width={320}
          height={55}
          className="h-auto w-[240px] sm:w-[320px]"
          priority
        />
        <span className="loader-spinner" />
      </div>
    </div>
  );
}
