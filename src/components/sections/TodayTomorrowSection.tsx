"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/typography/SplitText";
import { useSplitScale } from "@/components/typography/useSplitScale";
import { Section } from "@/components/layout/Section";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "heute" | "potenziale" | "morgen";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  list?: string[];
  bodyAfterList?: string;
};

type Tab = {
  key: TabKey;
  label: string;
  items: Item[];
};

const todayItems: Item[] = [
  {
    id: "today-1",
    title: "Drei strategisch verzahnte Geschäftsfelder",
    subtitle: "Co-Location. Managed Services. Consulting.",
    body:
      "Drei klar definierte Leistungscluster, die Infrastruktur, Betrieb und Beratung miteinander verbinden und so ganzheitliche Verantwortung ermöglichen."
  },
  {
    id: "today-2",
    title: "Netzwerkbasierte Kundengewinnung auf Entscheider-Ebene",
    subtitle: "Kein Zufall. Sondern Vertrauen, das sich bewährt hat.",
    body:
      "Neue Kunden entstehen über ein über Jahre gewachsenes Netzwerk, persönliche Beziehungen und Empfehlungen zufriedener Bestandskunden."
  },
  {
    id: "today-3",
    title: "Hoher Vertrauensfaktor bei langjährigen Bestandskunden",
    subtitle: "Grass-Merkur entwickelt keine Kunden, sondern Vertrauen.",
    body:
      "Kunden geben kritische Systeme, sensible Daten und unternehmenskritische Prozesse in die Hände von Grass-Merkur. Das ist keine Kunden-Lieferanten-Beziehung. Das ist Vertrauen auf Infrastruktur-Ebene."
  }
];

const potentialsItems: Item[] = [
  {
    id: "pot-1",
    title: "Digitale Präsenz in Entscheidungsphasen",
    subtitle: "Heute entsteht Sichtbarkeit primär über Netzwerk.",
    body:
      "Potenzial liegt in zusätzlicher Präsenz bei Google, in KI-Systemen und auf LinkedIn – dort, wo Entscheider recherchieren und sich absichern."
  },
  {
    id: "pot-2",
    title: "Strategische Positionierung statt reiner Infrastruktur-Wahrnehmung",
    subtitle: "Grass-Merkur könnte klarer als strategischer IT-Partner auftreten.",
    body:
      "Mit Infrastruktur, Managed Services und Consulting aus einer Hand. Nicht nur als Betreiber, sondern noch mehr als Verantwortungspartner."
  },
  {
    id: "pot-3",
    title: "Regulatorischer Rückenwind als Wachstumshebel",
    subtitle: "KRITIS & NIS2 erhöhen den Handlungsdruck im Markt.",
    body:
      "Grass-Merkur hat die Kompetenz, sich als Ansprechpartner für sichere, regulatorisch belastbare IT-Infrastruktur zu positionieren."
  }
];

const tomorrowItems: Item[] = [
  {
    id: "mor-1",
    title: "Systematische Sichtbarkeit",
    subtitle: "Grass-Merkur ist bei Entscheidern präsent. Genau dort, wo Entscheider recherchieren, vergleichen und absichern.",
    body: "",
    list: [
      "Google",
      "in KI-gestützten Recherche-Systemen",
      "auf LinkedIn und relevanten Fachplattformen"
    ],
    bodyAfterList:
      "Nicht personenabhängig, nicht zufallsgetrieben, sondern mit klaren Vertriebssystemen, messbarer Sichtbarkeit und kontinuierlichen qualifizierten Anfragen. Wachstum wird planbar."
  },
  {
    id: "mor-2",
    title: "Klare Positionierung als strategischer IT-Partner",
    subtitle: "Der Markt nimmt Grass-Merkur als strategischen Partner wahr. Als vertrauenswürdigen Partner für",
    body: "",
    list: [
      "Hybrid-IT-Architekturen",
      "sichere Cloud-Integration",
      "IT-Transformation mit echter Verantwortung"
    ],
    bodyAfterList:
      "Infrastruktur, Managed Services und Consulting werden als integrierte Kompetenz verstanden – nicht als einzelne Leistungen."
  },
  {
    id: "mor-3",
    title: "Kompetenzzentrum für sichere, regulatorisch belastbare IT",
    subtitle:
      "Grass-Merkur wird Orientierungspunkt für KRITIS- und NIS2-Anforderungen. Grass-Merkur wird der Ansprechpartner für:",
    body: "",
    list: [
      "regulatorische Sicherheit",
      "Compliance",
      "belastbare Infrastruktur",
      "langfristige Stabilität"
    ],
    bodyAfterList:
      "Damit ist Grass-Merkur nicht der nächste Anbieter, sondern die Referenz."
  }
];

const tabs: Tab[] = [
  {
    key: "heute",
    label: "Heute",
    items: todayItems
  },
  {
    key: "potenziale",
    label: "Potenziale",
    items: potentialsItems
  },
  {
    key: "morgen",
    label: "Morgen",
    items: tomorrowItems
  }
];

export default function TodayTomorrowSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("heute");
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useSplitScale({ scope: sectionRef });

  useGSAP(
    () => {
      if (!sectionRef.current || !tabsRef.current || !contentRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([tabsRef.current, contentRef.current], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        [tabsRef.current, contentRef.current],
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    },
    { scope: sectionRef }
  );

  const handleTabClick = (key: TabKey) => {
    if (key === activeTab) return;
    setActiveTab(key);
  };

  return (
    <Section
      ref={sectionRef}
      className="flex w-full justify-center bg-[#080716]"
      innerClassName="w-full"
      useContentWrap={false}
    >
      <div className="content-wrap">
        <div className="flex flex-col gap-16 text-center text-pretty">
          <SplitText
            text="HEUTE VS. MORGEN"
            split="words"
            as="h2"
            className="split-scale relative z-[1] text-[clamp(2.6rem,4.5vw,4.25rem)] font-extrabold uppercase tracking-wide text-white [font-family:var(--font-display)]"
            childClassName="inline-block"
          />
          <div className="flex flex-col gap-8">
            <div ref={tabsRef} className="flex w-full items-center justify-center pb-8">
              <div className="tabs-glow relative z-[1] flex flex-row items-center gap-4">
                {tabs.map((tab) => {
                  const isActive = tab.key === activeTab;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleTabClick(tab.key)}
                      className={
                        "relative z-10 rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 " +
                        (isActive
                          ? "bg-[#DBC18D] text-[#080716]"
                          : "text-white hover:bg-[#DBC18D] hover:text-[#080716]")
                      }
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div ref={contentRef} className="w-full relative z-[1]">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={
                    "w-full rounded-[40px] bg-[#080716] p-10 text-left text-white transition-opacity duration-300 " +
                    (tab.key === activeTab ? "block opacity-100" : "hidden opacity-0")
                  }
                >
                  <div className="flex flex-col gap-6">
                    {tab.items.map((item) => (
                      <div
                        key={item.id}
                        className="card-gradient-hover flex flex-row items-center gap-12 rounded-[40px] border border-[#DBC18D]/10 p-8 transition-[border-color] duration-300 ease-out hover:border-[#DBC18D]/30 [--card-bg:linear-gradient(0deg,#080716_0%,#080716_100%)] [--card-hover-bg:linear-gradient(0deg,#082940_0%,#080716_100%)]"
                      >
                        <div className="card-content flex w-full flex-row items-center gap-12">
                          {/** keep layout stable per item */}
                          <div className="shrink-0 grow-0 basis-auto">
                            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-[#DBC18D]/30 bg-transparent">
                              <img
                                src="/assets/icons/Vector.svg"
                                alt=""
                                className="h-auto w-4"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col p-0">
                              <h3 className="text-[clamp(1.125rem,1.45vw,1.25rem)] font-semibold text-white normal-case [font-family:var(--font-display)]">
                                {item.title}
                              </h3>
                              <h4
                                className={
                                  "text-[clamp(1rem,1.05vw,1.125rem)] text-[#DBC18D] [font-family:var(--font-display)] " +
                                  (tab.key === "morgen" ? "font-bold" : "font-normal")
                                }
                              >
                                {item.subtitle}
                              </h4>
                              {tab.key === "morgen" && item.body ? (
                                <p className="text-[clamp(1rem,1.05vw,1.125rem)] font-normal text-[#DBC18D] [font-family:var(--font-display)]">
                                  {item.body}
                                </p>
                              ) : null}
                            </div>
                            {tab.key !== "morgen" && item.body ? (
                              <p className="mt-4 text-[clamp(1rem,1.05vw,1.125rem)] font-normal text-white [font-family:var(--font-display)]">
                                {item.body}
                              </p>
                            ) : null}
                            {item.list ? (
                              <ul className="mt-4 list-disc pl-5 text-[clamp(1rem,1.05vw,1.125rem)] font-normal text-white [font-family:var(--font-display)]">
                                {item.list.map((entry) => (
                                  <li key={entry} className="text-[clamp(1rem,1.05vw,1.125rem)]">
                                    {entry}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            {item.bodyAfterList ? (
                              <p className="mt-4 text-[clamp(1rem,1.05vw,1.125rem)] font-normal text-white [font-family:var(--font-display)]">
                                {item.bodyAfterList}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
