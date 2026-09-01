import upcomingShows from "../app/data/upcoming-shows.json";
import { sortShowsBySoonest } from "@/types/show";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function UpcomingShowsSection() {
  const sortedShows = sortShowsBySoonest(upcomingShows);

  const eventsJsonLd = sortedShows.map((show) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${SITE_NAME} at ${show.venue}`,
    startDate: show.date,
    location: {
      "@type": "Place",
      name: show.venue,
      address: show.address,
    },
    performer: {
      "@type": "MusicGroup",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(show.link?.trim() ? { url: show.link } : {}),
  }));

  return (
    <section className="py-16 px-4 bg-zinc-800">
      {sortedShows.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-red-600 mb-12 uppercase tracking-[0.15em]">
          Upcoming Shows
        </h2>
        {sortedShows.length === 0 ? (
          <div className="bg-black p-8 rounded-lg border border-red-900 text-center">
            <p className="text-lg text-gray-400">
              No upcoming shows right now — check back soon!
            </p>
          </div>
        ) : (
        <div className="space-y-6">
          {sortedShows.map((show, index) => (
            <div
              key={index}
              className="bg-black p-6 rounded-lg border border-red-900 hover:border-red-600 transition-all hover:shadow-[0_0_25px_rgba(220,38,38,0.2)]"
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
                  {show.link?.trim() ? (
                    <a
                      href={show.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-semibold text-red-500 underline hover:text-red-400"
                    >
                      Tickets / More Info
                    </a>
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
        )}
      </div>
    </section>
  );
}
