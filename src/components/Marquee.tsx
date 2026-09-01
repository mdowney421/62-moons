const ITEMS = [
  "HEAVY METAL",
  "CHICAGO, IL",
  "RAW POWER",
  "CRUSHING RIFFS",
  "62 MOONS",
];

export default function Marquee() {
  const strip = ITEMS.join("  •  ") + "  •  ";

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y-2 border-black bg-red-700 py-2"
    >
      <div className="animate-marquee">
        <span className="mx-4 shrink-0 text-sm font-black uppercase tracking-widest text-black">
          {strip.repeat(3)}
        </span>
        <span className="mx-4 shrink-0 text-sm font-black uppercase tracking-widest text-black">
          {strip.repeat(3)}
        </span>
      </div>
    </div>
  );
}
