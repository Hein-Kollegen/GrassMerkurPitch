"use client";

const counters = [
  { value: "50.000+", label: "Zuhoerer pro Jahr" },
  { value: "10.000+", label: "Follower auf relevanten Social-Media-Kanaelen" },
  { value: "5.000+", label: "Entscheider im eigenen Netzwerk" },
  { value: "10+", label: "eigene Formate" }
];

const badges = ["Certified", "Meta", "Google", "Proven", "Partner", "Award"];

export default function OverviewSection() {
  return (
    <section className="flex w-full justify-center px-6 py-16 sm:px-10 lg:px-16">
      <div className="content-wrap flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2>HEIN & KOLLEGEN IM UEBERBLICK</h2>
          <h3>WACHSTUM ENTSTEHT, WO RELEVANZ, REICHWEITE UND GLAUBWUERDIGKEIT ZUSAMMENKOMMEN.</h3>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((counter) => (
            <div key={counter.value} className="flex flex-col items-center gap-2">
              <div className="text-[64px] font-extrabold uppercase text-white">
                {counter.value}
              </div>
              <p className="text-[16px] font-normal text-[#DBC18D]">{counter.label}</p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-nowrap justify-center gap-6 overflow-x-auto scroll-smooth pr-2">
          {badges.map((badge) => (
            <div
              key={badge}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-xs text-white"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
