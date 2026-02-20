"use client";

import { useState } from "react";

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
    title: "Drei strategisch verzahnte Geschaeftsfelder",
    subtitle: "Co-Location, Managed Services, Consulting",
    body:
      "Drei klar definierte Leistungscluster, die Infrastruktur, Betrieb und Beratung verbinden."
  },
  {
    id: "today-2",
    title: "Netzwerkbasierte Kundengewinnung auf Entscheider-Ebene",
    subtitle: "Kein Zufall. Sondern Vertrauen, das sich bewaehrt hat.",
    body:
      "Neue Kunden entstehen ueber ein ueber Jahre gewachsenes Netzwerk, persoenliche Beziehungen und Empfehlungen."
  },
  {
    id: "today-3",
    title: "Hoher Vertrauensfaktor bei langjaehrigen Bestandskunden",
    subtitle: "Grass-Merkur entwickelt keine Kunden, sondern Vertrauen.",
    body:
      "Kunden geben kritische Systeme in die Haende von Grass-Merkur."
  }
];

const potentialsItems: Item[] = [
  {
    id: "pot-1",
    title: "Digitale Präsenz in Entscheidungsphasen",
    subtitle: "Heute entsteht Sichtbarkeit primaer über Netzwerke.",
    body:
      "Potenzial liegt in zusaetzlicher Präsenz bei Google, in KI-Systemen und auf LinkedIn – dort, wo Entscheider recherchieren und sich absichern."
  },
  {
    id: "pot-2",
    title: "Strategische Positionierung statt reiner Infrastruktur-Wahrnehmung",
    subtitle: "Grass-Merkur koennte klarer als strategischer IT-Partner auftreten.",
    body:
      "Mit Infrastruktur, Managed Services und Consulting aus einer Hand. Nicht nur als Betreiber, sondern noch mehr als Verantwortungspartner."
  },
  {
    id: "pot-3",
    title: "Regulatorischer Rueckenwind als Wachstumshebel",
    subtitle: "KRITIS & NIS2 erhoehen Handlungsdruck im Markt.",
    body:
      "Grass-Merkur hat die Kompetenz, sich als Ansprechpartner fuer sichere, regulatorisch belastbare IT-Infrastruktur zu positionieren."
  }
];

const tomorrowItems: Item[] = [
  {
    id: "mor-1",
    title: "Systematische Sichtbarkeit",
    subtitle: "Grass-Merkur ist bei Entscheidern präsent.",
    body:
      "Genau dort, wo Entscheider recherchieren, vergleichen und absichern.",
    list: [
      "Google",
      "in KI-gestuetzten Recherche-Systemen",
      "auf LinkedIn und relevanten Fachplattformen"
    ],
    bodyAfterList:
      "Nicht personalabhaengig, nicht zufallsgesteuert, sondern mit klaren Vertriebssystemen, messbarer Sichtbarkeit und kontinuierlich qualifizierten Anfragen. Wachstum wird planbar."
  },
  {
    id: "mor-2",
    title: "Klare Positionierung als strategischer IT-Partner",
    subtitle: "Der Markt nimmt Grass-Merkur als strategischen Partner wahr.",
    body: "Als vertrauenswürdigen Partner für:",
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
    subtitle: "Grass-Merkur wird Orientierungspunkt für KRITIS- und NIS2-Anforderungen.",
    body: "Grass-Merkur wird der Ansprechpartner für:",
    list: [
      "regulatorische Sicherheit",
      "Compliance",
      "belastbare Infrastruktur",
      "langfristige Stabilitaet"
    ],
    bodyAfterList:
      "Damit ist Grass-Merkur nicht der naechste Anbieter, sondern die Referenz."
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

  return (
    <section className="flex min-h-[100svh] w-full justify-center bg-[#080716] p-6 sm:p-10 lg:p-16">
      <div className="content-wrap">
        <div className="flex flex-col gap-16 text-center">
          <h2 className="relative z-[1] text-[clamp(2.6rem,4.5vw,4.25rem)] font-extrabold uppercase tracking-wide text-white [font-family:var(--font-display)]">
            HEUTE VS. MORGEN
          </h2>
          <div className="flex w-full items-center justify-center pb-8">
            <div className="tabs-glow relative z-[1] flex flex-row items-center gap-4">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
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
          <div className="w-full relative z-[1]">
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
                      className="flex flex-row items-center gap-12 rounded-[40px] border border-[#DBC18D]/10 p-8 transition-[border-color,background] duration-300 ease-out hover:border-[#DBC18D]/30 hover:bg-[linear-gradient(0deg,#082940_0%,#080716_100%)]"
                    >
                      {/** keep layout stable per item */}
                      <div className="shrink-0 grow-0 basis-auto">
                        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-[#DBC18D]/30 bg-transparent">
                          <img
                            src="/assets/tomorrowtoday/Vector.svg"
                            alt=""
                            className="h-auto w-4"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col p-0">
                          <h3 className="text-[20px] font-semibold text-white [font-family:var(--font-display)]">
                            {item.title}
                          </h3>
                          <h4
                            className={
                              "text-[16px] text-[#DBC18D] [font-family:var(--font-display)] " +
                              (tab.key === "morgen" ? "font-bold" : "font-normal")
                            }
                          >
                            {item.subtitle}
                          </h4>
                          {tab.key === "morgen" && item.body ? (
                            <p className="text-[16px] font-normal text-[#DBC18D] [font-family:var(--font-display)]">
                              {item.body}
                            </p>
                          ) : null}
                        </div>
                        {tab.key !== "morgen" && item.body ? (
                          <p className="mt-4 text-[16px] font-normal text-white [font-family:var(--font-display)]">
                            {item.body}
                          </p>
                        ) : null}
                        {item.list ? (
                          <ul className="mt-4 list-disc pl-5 text-[16px] font-normal text-white [font-family:var(--font-display)]">
                            {item.list.map((entry) => (
                              <li key={entry} className="text-[16px]">
                                {entry}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {item.bodyAfterList ? (
                          <p className="mt-4 text-[16px] font-normal text-white [font-family:var(--font-display)]">
                            {item.bodyAfterList}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
