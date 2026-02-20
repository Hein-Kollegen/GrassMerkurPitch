"use client";

const works = [
  {
    title: "Redaktionsplanung",
    image: "/assets/sections/works/board.png"
  },
  {
    title: "TalentRadar",
    image: "/assets/sections/works/talent-radar.png"
  },
  {
    title: "KI-Support-Framework für Lift-&-Shift-Projekte",
    image: "/assets/sections/works/ki-framework.png"
  },
  {
    title: "Jährlicher Trust-Report für kritische IT-Infrastruktur",
    description: "Ein unabhängiger Blick auf Risiken, Entscheidungen und Vertrauen.",
    image: "/assets/sections/works/trust-reports.png"
  },
  {
    title: "KRITIS Leadership Summit - Ibiza / Mallorca",
    description:
      "Ein invitation-only Summit für KRITIS-Entscheider. IT-Leitung und Geschäftsführung gemeinsam. Fokus: Verantwortung, Haftung, Entscheidungslogik.",
    image: "/assets/sections/works/summit.png"
  }
];

export default function WorksSection() {
  return (
    <section className="flex w-full flex-col gap-16 px-4 py-16 sm:px-6 lg:px-10 mt-64">
      <div className="content-wrap flex flex-col items-center gap-2 text-center">
        <h2>IDEEN, DIE ZEIGEN, WIE WIR DENKEN</h2>
        <h3>STRUKTUR STATT SHOW. INSPIRATIONEN AUS UNSERER CREW.</h3>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {works.map((item, index) => (
          <div
            key={item.title}
            className={`relative h-[100svh] w-full overflow-hidden bg-cover bg-no-repeat ${index === 0 ? "md:col-span-2" : ""}`}
            style={{ backgroundImage: `url("${item.image}")` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#080716_4.33%,rgba(8,7,22,0.70)_68.27%,rgba(0,0,0,0)_100%)]" />
            <div
              className={
                "relative z-10 flex h-full flex-col justify-end p-16 " +
                (index === 0 ? "items-center text-center" : "")
              }
            >
              <h3 className="text-[20px] font-semibold leading-normal text-white">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-[16px] font-normal leading-normal text-[#DBC18D]">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
