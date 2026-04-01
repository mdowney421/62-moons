"use client";

import { useMemo, useState, useTransition } from "react";

import {
  compareShowBySoonest,
  sortShowsBySoonest,
  type Show,
} from "@/types/show";

type SaveState = {
  ok: boolean;
  message: string;
};

type Props = {
  initialShows: Show[];
  saveShowsAction: (shows: Show[]) => Promise<SaveState>;
};

const EMPTY_SHOW: Show = {
  date: "",
  venue: "",
  location: "",
  address: "",
  time: "",
};

export default function AdminShowsEditor({
  initialShows,
  saveShowsAction,
}: Props) {
  const [shows, setShows] = useState<Show[]>(initialShows);
  const [newShow, setNewShow] = useState<Show>(EMPTY_SHOW);
  const [status, setStatus] = useState<SaveState | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedShows = useMemo(
    () =>
      shows
        .map((show, index) => ({ show, index }))
        .sort((a, b) => compareShowBySoonest(a.show, b.show)),
    [shows],
  );

  function addShow() {
    const hasBlankField = Object.values(newShow).some((value) => !value.trim());
    if (hasBlankField) {
      setStatus({
        ok: false,
        message: "Fill out all fields before adding a show.",
      });
      return;
    }

    setShows((current) => [...current, newShow]);
    setNewShow(EMPTY_SHOW);
    setStatus(null);
  }

  function deleteShow(index: number) {
    setShows((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    setStatus(null);
  }

  function saveChanges() {
    startTransition(async () => {
      const result = await saveShowsAction(sortShowsBySoonest(shows));
      setStatus(result);
    });
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-3 text-4xl font-black uppercase tracking-widest text-red-600">
          Admin: Upcoming Shows
        </h1>
        <p className="mb-8 text-sm text-zinc-300">
          Add or delete shows, then publish changes.
        </p>

        <section className="mb-10 rounded-lg border border-red-900 bg-zinc-950 p-6">
          <h2 className="mb-4 text-xl font-bold text-yellow-500">Add A Show</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="date"
              value={newShow.date}
              onChange={(event) =>
                setNewShow((prev) => ({ ...prev, date: event.target.value }))
              }
              className="rounded border border-zinc-700 bg-black px-3 py-2"
            />
            <input
              type="text"
              placeholder="Time (e.g. 8:00 PM)"
              value={newShow.time}
              onChange={(event) =>
                setNewShow((prev) => ({ ...prev, time: event.target.value }))
              }
              className="rounded border border-zinc-700 bg-black px-3 py-2"
            />
            <input
              type="text"
              placeholder="Venue"
              value={newShow.venue}
              onChange={(event) =>
                setNewShow((prev) => ({ ...prev, venue: event.target.value }))
              }
              className="rounded border border-zinc-700 bg-black px-3 py-2"
            />
            <input
              type="text"
              placeholder="Location (City, ST)"
              value={newShow.location}
              onChange={(event) =>
                setNewShow((prev) => ({
                  ...prev,
                  location: event.target.value,
                }))
              }
              className="rounded border border-zinc-700 bg-black px-3 py-2"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newShow.address}
              onChange={(event) =>
                setNewShow((prev) => ({ ...prev, address: event.target.value }))
              }
              className="rounded border border-zinc-700 bg-black px-3 py-2 md:col-span-2"
            />
          </div>

          <button
            type="button"
            onClick={addShow}
            className="mt-4 rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Add Show
          </button>
        </section>

        <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-4 text-xl font-bold text-yellow-500">
            Current Shows
          </h2>

          <div className="space-y-3">
            {sortedShows.length === 0 ? (
              <p className="text-zinc-400">No shows currently listed.</p>
            ) : (
              sortedShows.map(({ show, index }) => (
                <div
                  key={`${show.date}-${show.venue}-${index}`}
                  className="flex flex-col justify-between gap-3 rounded border border-zinc-800 bg-black p-4 md:flex-row md:items-center"
                >
                  <div>
                    <p className="font-bold text-white">
                      {show.date} | {show.time}
                    </p>
                    <p className="text-zinc-300">
                      {show.venue} - {show.location}
                    </p>
                    <p className="text-sm text-zinc-400">{show.address}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteShow(index)}
                    className="rounded border border-red-700 px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-950"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={saveChanges}
              disabled={isPending}
              className="rounded bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Publish Changes"}
            </button>

            {status && (
              <p className={status.ok ? "text-green-400" : "text-red-400"}>
                {status.message}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
