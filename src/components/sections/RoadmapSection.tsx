"use client";

const roadmapCards = [
  {
    title: "1. Bestandsaufnahme Marketing- & Vertriebssystem",
    items: [
      "Analyse bestehender Prozesse",
      "Bewertung aktueller Sichtbarkeit",
      "Bewertung bestehender Vertriebslogik",
      "Identifikation struktureller L�cken"
    ]
  },
  {
    title: "2. Positionierungs-Workshop",
    items: [
      "Zielgruppenpriorisierung",
      "Differenzierung im Wettbewerbsumfeld",
      "Kernbotschaften",
      "Strategische Fokussierung"
    ]
  },
  {
    title: "3. Zielgruppen- & Entscheideranalyse",
    items: [
      "IT-Leitung vs. Gesch�ftsf�hrung",
      "Entscheidungslogiken",
      "Typische Einw�nde",
      "Risikoabw�gungen"
    ]
  },
  {
    title: "4. Argumentationsarchitektur",
    items: [
      "Value Proposition",
      "Vertrauensbeweise",
      "Nutzenargumentation je Entscheiderebene"
    ]
  },
  {
    title: "5. Angebots- & Leistungsarchitektur",
    items: [
      "Strukturierung der Produktcluster",
      "Klare Leistungsabgrenzung",
      "Paketlogiken",
      "Einstiegspunkte f�r Neukunden"
    ]
  },
  {
    title: "6. Corporate Identity & Messaging-Rahmen",
    items: [
      "Sch�rfung Markenauftritt",
      "Tonalit�t",
      "Claim-/Leitgedankenentwicklung",
      "Inhaltliche Leitlinien f�r Website & Content"
    ]
  },
  {
    title: "7. Wettbewerbs- & Sichtbarkeitsanalyse",
    items: [
      "Digitale Pr�senz Wettbewerber",
      "SEO- & LLM-Potenziale",
      "Positionierungsl�cken im Markt"
    ]
  },
  {
    title: "8. Operative Wachstums-Roadmap",
    items: [
      "Priorisierung der Tools f�r S2 - Sichtbarkeit",
      "Definition der ersten Umsetzungsfelder",
      "Budget- & Ressourcenplanung",
      "12-Monats-Wachstumsfahrplan"
    ]
  }
];

export default function RoadmapSection() {
  return (
    <section className="w-full px-6 py-20 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-3 text-center">
        <h2>WOLLT IHR MIT UNS GEHEN?</h2>
        <h3>JA? NEIN? VIELLEICHT? FALLS JA, DANN VIELLEICHT SO?</h3>
      </div>

      <div className="content-wrap mt-32 grid grid-cols-1 gap-y-14 gap-x-32 lg:grid-cols-2">
        {roadmapCards.map((card, index) => (
          <div
            key={card.title}
            className={
              "flex flex-col justify-center rounded-[40px] border border-[#DBC18D]/30 bg-[#080716] p-16 transition-[border-color,background,transform] duration-300 ease-out hover:bg-[linear-gradient(90deg,#082940_0%,#080716_100%)] " +
              (index % 2 === 1 ? "lg:translate-y-24" : "")
            }
          >
            <h4 className="text-[20px] font-semibold text-white">{card.title}</h4>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-[16px] font-normal leading-normal text-[#DBC18D]">
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
