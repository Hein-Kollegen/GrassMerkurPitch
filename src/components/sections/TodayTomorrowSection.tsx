"use client";

import { useState } from "react";

type TabKey = "heute" | "potenziale" | "morgen";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
};

type Tab = {
  key: TabKey;
  label: string;
  items: Item[];
};

const placeholderItems: Item[] = [
  {
    id: "item-1",
    title: "Drei strategisch verzahnte Geschaeftsfelder",
    subtitle: "Co-Location, Managed Services, Consulting",
    body:
      "Drei klar definierte Leistungscluster, die Infrastruktur, Betrieb und Beratung verbinden."
  },
  {
    id: "item-2",
    title: "Netzwerkbasierte Kundengewinnung auf Entscheider-Ebene",
    subtitle: "Kein Zufall. Sondern Vertrauen, das sich bewaehrt hat.",
    body:
      "Neue Kunden entstehen ueber ein ueber Jahre gewachsenes Netzwerk, persoenliche Beziehungen und Empfehlungen."
  },
  {
    id: "item-3",
    title: "Hoher Vertrauensfaktor bei langjaehrigen Bestandskunden",
    subtitle: "Grass-Merkur entwickelt keine Kunden, sondern Vertrauen.",
    body:
      "Kunden geben kritische Systeme in die Haende von Grass-Merkur."
  }
];

const tabs: Tab[] = [
  {
    key: "heute",
    label: "Heute",
    items: placeholderItems
  },
  {
    key: "potenziale",
    label: "Potenziale",
    items: placeholderItems
  },
  {
    key: "morgen",
    label: "Morgen",
    items: placeholderItems
  }
];

export default function TodayTomorrowSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("heute");

  return (
    <section className="flex min-h-[100svh] w-full items-center justify-center bg-[#080716] p-6 sm:p-10 lg:p-16">
      <div className="section-container">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(2.6rem,4.5vw,4.25rem)] font-extrabold uppercase tracking-wide text-white [font-family:var(--font-display)]">
            HEUTE VS. MORGEN
          </h2>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-row items-center gap-4">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={
                      "rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 " +
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
          <div className="w-full">
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
                      className="flex flex-row items-center gap-12 rounded-[40px] p-6"
                    >
                      <div className="shrink-0 grow-0 basis-auto">
                        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-white/25 bg-white/5 text-xs font-semibold text-white/80">
                          ✓
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-2 p-0">
                          <h3 className="text-[20px] font-semibold text-white [font-family:var(--font-display)]">
                            {item.title}
                          </h3>
                          <h4 className="text-[16px] font-normal text-[#DBC18D] [font-family:var(--font-display)]">
                            {item.subtitle}
                          </h4>
                        </div>
                        <p className="mt-4 text-[18px] font-normal text-white [font-family:var(--font-display)]">
                          {item.body}
                        </p>
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
