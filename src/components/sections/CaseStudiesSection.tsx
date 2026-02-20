"use client";

import Image from "next/image";

const cases = [
  {
    title: "DAIMLER TRUCK",
    subtitle: "Markenaufbau",
    description: "Daimler Truck & Buses in Österreich",
    logo: "/assets/sections/partners/daimler-truck.png",
    mockup: "/assets/sections/case-studies/mockup-daimler.png"
  },
  {
    title: "b4run",
    subtitle: "Wachstum mit dem 5-S-Modell",
    description: "für B-4it AG",
    logo: "/assets/sections/partners/b4it.png",
    mockup: "/assets/sections/case-studies/mock-up b4-it.png"
  },
  {
    title: "ProvenExpert",
    subtitle: "Marktführerschaft",
    description: "für ProvenExpert im Tourismus",
    logo: "/assets/sections/partners/proven-expert.png",
    mockup: "/assets/sections/case-studies/mockup-proven-expert.png"
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="flex w-full justify-center px-6 py-16 sm:px-10 lg:px-16 mt-32">
      <div className="content-wrap flex flex-col items-center gap-20 text-center">
        <h2>ERFOLGSGESCHICHTEN</h2>

        <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-[16px] bg-[linear-gradient(180deg,#DBC18D_0%,rgba(219,193,141,0)_100%)] p-[1px]"
            >
              <div className="flex h-full flex-col gap-12 rounded-[15px] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(180deg,#092B42_0%,#080716_100%)] px-6 pb-6 pt-12 text-center">
                <div className="flex flex-col gap-20">
                  <div className="relative mx-auto h-10 w-full">
                    <Image src={item.logo} alt={item.title} fill className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-center text-[20px] font-bold leading-[28px] text-white">
                      {item.subtitle}
                    </h4>
                    <p className="text-center text-white">{item.description}</p>
                  </div>
                </div>

                <div className="relative mb-auto w-full">
                  <Image
                    src={item.mockup}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
