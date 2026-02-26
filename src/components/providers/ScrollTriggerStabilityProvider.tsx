"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerStabilityProvider() {
  useEffect(() => {
    let rafIdOne: number | null = null;
    let rafIdTwo: number | null = null;
    let delayedRefreshId: number | null = null;
    let isActive = true;

    const queueRefresh = () => {
      rafIdOne = window.requestAnimationFrame(() => {
        rafIdTwo = window.requestAnimationFrame(() => {
          if (!isActive) return;
          ScrollTrigger.refresh();
          delayedRefreshId = window.setTimeout(() => {
            if (!isActive) return;
            ScrollTrigger.refresh();
          }, 160);
        });
      });
    };

    const runStableRefresh = () => {
      if (document.fonts?.ready) {
        document.fonts.ready
          .catch(() => undefined)
          .finally(() => {
            if (!isActive) return;
            queueRefresh();
          });
        return;
      }

      queueRefresh();
    };

    const onWindowLoad = () => {
      runStableRefresh();
    };

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    return () => {
      isActive = false;
      window.removeEventListener("load", onWindowLoad);
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
  }, []);

  return null;
}
