"use client";

const works = [
  {
    title: "Redaktionsplanung",
    image: "/assets/hero/hero-bg (1).png"
  },
  {
    title: "TalentRadar",
    image: "/assets/hero/hero-bg (2).png"
  },
  {
    title: "KI-Support-Framework f\u00fcr Lift-&-Shift-Projekte",
    image: "/assets/hero/hero-bg (3).png"
  },
  {
    title: "J\u00e4hrlicher Trust-Report f\u00fcr kritische IT-Infrastruktur",
    description: "Ein unabh\u00e4ngiger Blick auf Risiken, Entscheidungen und Vertrauen.",
    image: "/assets/hero/hero-bg (4).png"
  },
  {
    title: "KRITIS Leadership Summit - Ibiza / Mallorca",
    description:
      "Ein invitation-only Summit f\u00fcr KRITIS-Entscheider. IT-Leitung und Gesch\u00e4ftsf\u00fchrung gemeinsam. Fokus: Verantwortung, Haftung, Entscheidungslogik.",
    image: "/assets/hero/hero-bg (5).png"
  }
];

export default function WorksSection() {
  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-10">
      <div className="content-wrap flex flex-col items-center gap-3 text-center">
        <h2>IDEEN, DIE ZEIGEN, WIE WIR DENKEN</h2>
        <h3>STRUKTUR STATT SHOW. INSPIRATIONEN AUS UNSERER CREW.</h3>
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {works.map((item, index) => (
          <div
            key={item.title}
            className={`relative h-[100svh] w-full overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
            style={{ backgroundImage: `url("${item.image}")` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#080716_4.33%,rgba(8,7,22,0.70)_68.27%,rgba(0,0,0,0)_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
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
