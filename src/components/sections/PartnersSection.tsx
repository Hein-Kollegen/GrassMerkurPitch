import Image from "next/image";

const rows = [
  [
    { name: "ProvenExpert", src: "/assets/partners/proven-expert.png" },
    { name: "Volksbank", src: "/assets/partners/volksbank.png" },
    { name: "Swisspor", src: "/assets/partners/swisspor.png" },
    { name: "Reiseland", src: "/assets/partners/reiseland.png" }
  ],
  [
    { name: "Point S", src: "/assets/partners/point-s.png" },
    { name: "Metzger", src: "/assets/partners/metzger.png" },
    { name: "Krammer", src: "/assets/partners/krammer.png" },
    { name: "HSB", src: "/assets/partners/hsb.png" }
  ],
  [
    { name: "DMB", src: "/assets/partners/dmb.png" },
    { name: "Daimler Truck", src: "/assets/partners/daimler-truck.png" },
    { name: "VDV", src: "/assets/partners/vdv.png" },
    { name: "b4it", src: "/assets/partners/b4it.png" }
  ],
  [
    { name: "Senden", src: "/assets/partners/senden.png" },
    { name: "Schubert Motors", src: "/assets/partners/schubert-motors.png" },
    { name: "Telcat", src: "/assets/partners/telcat.png" },
    { name: "BMW Motorsport", src: "/assets/partners/bmw-motorsport.png" },
    { name: "R+V", src: "/assets/partners/rv.png" }
  ]
];

export default function PartnersSection() {
  return (
    <section className="min-h-[100svh] bg-midnight px-6 py-16 sm:px-10 lg:px-16 flex items-center justify-center">
      <div className="content-wrap flex h-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-16">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex w-full flex-row flex-nowrap items-center justify-between gap-16"
            >
              {row.map((logo) => (
                <div key={logo.name} className="flex flex-1 items-center justify-center">
                  <div className="relative h-10 w-[180px] opacity-85">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
