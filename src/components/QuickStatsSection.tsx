export default function QuickStatsSection() {
  return (
    <section className="bg-zinc-900 py-16 px-4 border-y border-red-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-black text-red-600 mb-2">3</div>
          <div className="text-gray-300 font-bold uppercase tracking-widest">
            Crushing Members
          </div>
        </div>
        <div className="text-center border-l border-r border-red-900 px-4">
          <div className="text-4xl font-black text-yellow-500 mb-2">🌙</div>
          <div className="text-gray-300 font-bold uppercase tracking-widest">
            Pure Heavy Metal
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-red-600 mb-2">📍</div>
          <div className="text-gray-300 font-bold uppercase tracking-widest">
            Chicago Based
          </div>
        </div>
      </div>
    </section>
  );
}
