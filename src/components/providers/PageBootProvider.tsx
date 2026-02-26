"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type PageBootContextValue = {
  isBootReady: boolean;
  isLoaderVisible: boolean;
};

const PageBootContext = createContext<PageBootContextValue>({
  isBootReady: false,
  isLoaderVisible: true
});

const LOADER_FADE_MS = 700;

export function usePageBoot() {
  return useContext(PageBootContext);
}

export default function PageBootProvider({ children }: { children: ReactNode }) {
  const [isBootReady, setIsBootReady] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    let isActive = true;
    let rafOne: number | null = null;
    let rafTwo: number | null = null;
    let fadeTimer: number | null = null;

    const finishBoot = () => {
      rafOne = window.requestAnimationFrame(() => {
        rafTwo = window.requestAnimationFrame(() => {
          if (!isActive) return;
          setIsBootReady(true);
          fadeTimer = window.setTimeout(() => {
            if (!isActive) return;
            setIsLoaderVisible(false);
          }, LOADER_FADE_MS);
        });
      });
    };

    const waitForFontsThenFinish = () => {
      if (document.fonts?.ready) {
        document.fonts.ready
          .catch(() => undefined)
          .finally(() => {
            if (!isActive) return;
            finishBoot();
          });
        return;
      }

      finishBoot();
    };

    const onWindowLoad = () => {
      waitForFontsThenFinish();
    };

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    return () => {
      isActive = false;
      window.removeEventListener("load", onWindowLoad);
      if (rafOne !== null) {
        window.cancelAnimationFrame(rafOne);
      }
      if (rafTwo !== null) {
        window.cancelAnimationFrame(rafTwo);
      }
      if (fadeTimer !== null) {
        window.clearTimeout(fadeTimer);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const locked = !isBootReady;

    root.classList.toggle("boot-lock", locked);
    body.classList.toggle("boot-lock", locked);

    return () => {
      root.classList.remove("boot-lock");
      body.classList.remove("boot-lock");
    };
  }, [isBootReady]);

  const value = useMemo(
    () => ({
      isBootReady,
      isLoaderVisible
    }),
    [isBootReady, isLoaderVisible]
  );

  return <PageBootContext.Provider value={value}>{children}</PageBootContext.Provider>;
}
