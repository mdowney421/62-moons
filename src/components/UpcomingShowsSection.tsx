import upcomingShows from "../app/data/upcoming-shows.json";
import { sortShowsBySoonest } from "@/types/show";

export default function UpcomingShowsSection() {
  const sortedShows = sortShowsBySoonest(upcomingShows);

  return (
    <section className="py-16 px-4 bg-zinc-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center text-red-600 mb-12 uppercase tracking-widest">
          Upcoming Shows
        </h2>
        <div className="space-y-6">
          {sortedShows.map((show, index) => (
            <div
              key={index}
              className="bg-black p-6 rounded-lg border border-red-900 hover:border-red-600 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xl font-bold text-yellow-500 mb-2">
                    {(() => {
                      const [year, month, day] = show.date
                        .split("-")
                        .map(Number);
                      return new Date(year, month - 1, day).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      );
                    })()}
                  </div>
                  <div className="text-lg text-white font-semibold mb-1">
                    {show.venue}
                  </div>
                  <div className="text-gray-400">{show.location}</div>
                  {show.comments?.trim() ? (
                    <div className="mt-3 rounded border border-zinc-700 bg-zinc-900/60 p-3 text-sm text-zinc-300">
                      <span className="mr-1 font-semibold text-yellow-500">
                        Comments:
                      </span>
                      {show.comments}
                    </div>
                  ) : null}
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <div className="text-lg text-red-600 font-bold mb-2">
                    {show.time}
                  </div>
                  <div className="text-sm text-gray-400 mb-2 text-right">
                    {show.address}
                  </div>
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(show.address)}&output=embed`}
                    width="250"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
