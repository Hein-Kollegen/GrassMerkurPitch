"use client";

const roadmapCards = [
  {
    title: "1. Bestandsaufnahme Marketing- & Vertriebssystem",
    items: [
      "Analyse bestehender Prozesse",
      "Bewertung aktueller Sichtbarkeit",
      "Identifikation blinder Wachstumslogiken"
    ]
  },
  {
    title: "2. Positionierungs-Workshop",
    items: [
      "Zielgruppenpositionierung",
      "Differenzierung im Wettbewerbsumfeld",
      "Strategische Fokussierung"
    ]
  },
  {
    title: "3. Zielgruppen- & Entscheideranalyse",
    items: [
      "IT-Leitung vs. Geschaeftsfuehrung",
      "Entscheidungslogiken",
      "Typische Einwaende"
    ]
  },
  {
    title: "4. Argumentationsarchitektur",
    items: [
      "Value Proposition",
      "Vertrauensaufbau",
      "Nutzenargumentation je Entscheiderebene"
    ]
  },
  {
    title: "5. Angebots- & Leistungsarchitektur",
    items: [
      "Strukturierung der Produktcluster",
      "Klare Leistungspakete",
      "Einstiegspunkte fuer Neukunden"
    ]
  },
  {
    title: "6. Corporate Identity & Messaging-Rahmen",
    items: [
      "Brand Voice",
      "Claim- und Leitgedankenentwicklung",
      "Inhaltliche Leitlinien fuer Website & Content"
    ]
  },
  {
    title: "7. Wettbewerbs- & Sichtbarkeitsanalyse",
    items: [
      "Digitale Praesenz Wettbewerber",
      "SEO- & LLM-Potenziale",
      "Positionierungsluecken im Markt"
    ]
  },
  {
    title: "8. Operative Wachstums-Roadmap",
    items: [
      "Priorisierung der Top 5 S- Schritte",
      "Definition der ersten Umsetzungspfad",
      "KPIs und Zeitplan"
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

      <div className="content-wrap mt-12 grid grid-cols-1 gap-y-10 gap-x-24 lg:grid-cols-2">
        {roadmapCards.map((card, index) => (
          <div
            key={card.title}
            className={
              "rounded-[40px] border border-[#DBC18D]/30 bg-[#080716] p-10 transition-[border-color,background,transform] duration-300 ease-out hover:bg-[linear-gradient(90deg,#082940_0%,#080716_100%)] " +
              (index % 2 === 1 ? "lg:translate-y-10" : "")
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
