"use client";

const cases = [
  {
    title: "DAIMLER TRUCK",
    subtitle: "Markenaufbau",
    description: "Daimler Truck & Buses in Oesterreich"
  },
  {
    title: "b4run",
    subtitle: "Wachstum mit dem 5-S-Modell",
    description: "fuer B-4it AG"
  },
  {
    title: "ProvenExpert",
    subtitle: "Marktfuehrerschaft",
    description: "fuer ProvenExpert im Tourismus"
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="flex w-full justify-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-10 text-center">
        <h2>ERFOLGSGESCHICHTEN</h2>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <div
              key={item.title}
              className="rounded-[16px] bg-[linear-gradient(180deg,#DBC18D_0%,rgba(219,193,141,0)_100%)] p-[1px]"
            >
              <div className="flex flex-col gap-6 rounded-[15px] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(180deg,#092B42_0%,#080716_100%)] px-6 pb-6 pt-12 text-center">
                <div className="flex flex-col gap-2">
                  <div className="mx-auto h-10 w-28 rounded-full border border-white/20" />
                  <h4 className="text-center text-[20px] font-bold leading-[28px] text-white">
                    {item.subtitle}
                  </h4>
                  <p className="text-center text-white">{item.description}</p>
                </div>

                <div className="h-[220px] w-full rounded-lg bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
