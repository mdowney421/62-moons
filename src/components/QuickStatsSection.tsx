const stats = [
  { value: "3", label: "Crushing Members", color: "red" as const },
  { value: "🌙", label: "Pure Heavy Metal", color: "yellow" as const },
  { value: "📍", label: "Chicago Based", color: "red" as const },
];

export default function QuickStatsSection() {
  return (
    <section className="bg-zinc-900 py-16 px-4 border-y border-red-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`text-center px-4 ${
              idx === 1 ? "md:border-l md:border-r md:border-red-900/70" : ""
            }`}
          >
            <div
              className={`mx-auto mb-4 w-20 h-20 rounded-full border-2 flex items-center justify-center font-display text-3xl ${
                stat.color === "red"
                  ? "border-red-600 text-red-500 shadow-[0_0_25px_rgba(220,38,38,0.25)]"
                  : "border-yellow-500 text-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.25)]"
              }`}
            >
              {stat.value}
            </div>
            <div className="text-gray-300 font-bold uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
