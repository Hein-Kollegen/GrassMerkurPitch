"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageBoot } from "@/components/providers/PageBootProvider";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerStabilityProvider() {
  const { isBootReady } = usePageBoot();

  useEffect(() => {
    if (!isBootReady) return;
    let rafIdOne: number | null = null;
    let rafIdTwo: number | null = null;
    let delayedRefreshId: number | null = null;

    rafIdOne = window.requestAnimationFrame(() => {
      rafIdTwo = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        delayedRefreshId = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 160);
      });
    });

    return () => {
      if (rafIdOne !== null) {
        window.cancelAnimationFrame(rafIdOne);
      }
      if (rafIdTwo !== null) {
        window.cancelAnimationFrame(rafIdTwo);
      }
      if (delayedRefreshId !== null) {
        window.clearTimeout(delayedRefreshId);
      }
    };
  }, [isBootReady]);

  return null;
}
