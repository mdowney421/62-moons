"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";

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
  comments: "",
  link: "",
};

const OPTIONAL_FIELDS = new Set<keyof Show>(["comments", "link"]);

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-semibold text-zinc-300">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded border border-zinc-700 bg-black px-3 py-3 text-base text-white";

export default function AdminShowsEditor({
  initialShows,
  saveShowsAction,
}: Props) {
  const [shows, setShows] = useState<Show[]>(initialShows);
  const [savedShows, setSavedShows] = useState<Show[]>(initialShows);
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

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(shows) !== JSON.stringify(savedShows),
    [shows, savedShows],
  );

  function addShow() {
    const hasBlankField = (
      Object.entries(newShow) as [keyof Show, string][]
    ).some(
      ([field, value]) => !OPTIONAL_FIELDS.has(field) && !value.trim(),
    );
    if (hasBlankField) {
      setStatus({
        ok: false,
        message: "Please fill out every field (except Comments and Ticket Link) before adding a show.",
      });
      return;
    }

    setShows((current) => [...current, newShow]);
    setNewShow(EMPTY_SHOW);
    setStatus(null);
  }

  function deleteShow(index: number, show: Show) {
    const label = show.venue.trim() || "this show";
    const dateLabel = show.date ? ` on ${show.date}` : "";
    const confirmed = window.confirm(
      `Are you sure you want to delete ${label}${dateLabel}?\n\nThis cannot be undone. You will still need to click "Save & Publish Changes" for the deletion to appear on the website.`,
    );
    if (!confirmed) {
      return;
    }

    setShows((current) =>
      current.filter((_, currentIndex) => currentIndex !== index),
    );
    setStatus(null);
  }

  function updateShow(index: number, updates: Partial<Show>) {
    setShows((current) =>
      current.map((show, currentIndex) =>
        currentIndex === index ? { ...show, ...updates } : show,
      ),
    );
    setStatus(null);
  }

  function saveChanges() {
    startTransition(async () => {
      const sorted = sortShowsBySoonest(shows);
      const result = await saveShowsAction(sorted);
      setStatus(result);
      if (result.ok) {
        setSavedShows(sorted);
      }
    });
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-3 text-4xl font-black uppercase tracking-widest text-red-600">
          Admin: Upcoming Shows
        </h1>
        <p className="mb-8 text-base text-zinc-300">
          Add or delete shows below. When you are finished, click the big
          yellow &quot;Save &amp; Publish Changes&quot; button at the bottom
          of the page to update the website.
        </p>

        <section className="mb-10 rounded-lg border border-red-900 bg-zinc-950 p-6">
          <h2 className="mb-4 text-xl font-bold text-yellow-500">Add A Show</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Date">
              <input
                type="date"
                value={newShow.date}
                onChange={(event) =>
                  setNewShow((prev) => ({ ...prev, date: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Time (e.g. 8:00 PM)">
              <input
                type="text"
                placeholder="8:00 PM"
                value={newShow.time}
                onChange={(event) =>
                  setNewShow((prev) => ({ ...prev, time: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Venue Name">
              <input
                type="text"
                placeholder="e.g. The Rusty Anchor"
                value={newShow.venue}
                onChange={(event) =>
                  setNewShow((prev) => ({ ...prev, venue: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Location (City, State)">
              <input
                type="text"
                placeholder="e.g. Chicago, IL"
                value={newShow.location}
                onChange={(event) =>
                  setNewShow((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Street Address" className="md:col-span-2">
              <input
                type="text"
                placeholder="e.g. 123 Main St, Chicago, IL"
                value={newShow.address}
                onChange={(event) =>
                  setNewShow((prev) => ({ ...prev, address: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Comments / Notes (optional)" className="md:col-span-2">
              <textarea
                placeholder="e.g. 21+ show, doors at 8"
                value={newShow.comments ?? ""}
                onChange={(event) =>
                  setNewShow((prev) => ({
                    ...prev,
                    comments: event.target.value,
                  }))
                }
                className={inputClass}
                rows={3}
              />
            </Field>
            <Field label="Ticket / Info Link (optional)" className="md:col-span-2">
              <input
                type="url"
                placeholder="e.g. https://www.venue.com/tickets"
                value={newShow.link ?? ""}
                onChange={(event) =>
                  setNewShow((prev) => ({
                    ...prev,
                    link: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={addShow}
            className="mt-5 rounded bg-red-700 px-6 py-3 text-lg font-semibold text-white hover:bg-red-600"
          >
            + Add This Show
          </button>
        </section>

        <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-4 text-xl font-bold text-yellow-500">
            Current Shows
          </h2>

          <div className="space-y-4">
            {sortedShows.length === 0 ? (
              <p className="text-zinc-400">No shows currently listed.</p>
            ) : (
              sortedShows.map(({ show, index }) => (
                <div
                  key={`${show.date}-${show.venue}-${index}`}
                  className="rounded border border-zinc-800 bg-black p-4"
                >
                  <p className="mb-3 text-lg font-bold text-white">
                    {show.venue.trim() || "Untitled Venue"}
                    {show.date ? ` — ${show.date}` : ""}
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Date">
                      <input
                        type="date"
                        value={show.date}
                        onChange={(event) =>
                          updateShow(index, { date: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                    <Field label="Time">
                      <input
                        type="text"
                        placeholder="8:00 PM"
                        value={show.time}
                        onChange={(event) =>
                          updateShow(index, { time: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                    <Field label="Venue Name">
                      <input
                        type="text"
                        placeholder="Venue"
                        value={show.venue}
                        onChange={(event) =>
                          updateShow(index, { venue: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                    <Field label="Location (City, State)">
                      <input
                        type="text"
                        placeholder="Location"
                        value={show.location}
                        onChange={(event) =>
                          updateShow(index, { location: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                    <Field label="Street Address" className="md:col-span-2">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={show.address}
                        onChange={(event) =>
                          updateShow(index, { address: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                    <Field label="Comments / Notes (optional)" className="md:col-span-2">
                      <textarea
                        placeholder="Comments / Notes (optional)"
                        value={show.comments ?? ""}
                        onChange={(event) =>
                          updateShow(index, { comments: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                        rows={3}
                      />
                    </Field>
                    <Field label="Ticket / Info Link (optional)" className="md:col-span-2">
                      <input
                        type="url"
                        placeholder="Ticket / Info Link (optional)"
                        value={show.link ?? ""}
                        onChange={(event) =>
                          updateShow(index, { link: event.target.value })
                        }
                        className={inputClass.replace("bg-black", "bg-zinc-950")}
                      />
                    </Field>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => deleteShow(index, show)}
                      className="rounded bg-red-800 px-5 py-3 text-base font-semibold text-white hover:bg-red-700"
                    >
                      Delete This Show
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {hasUnsavedChanges && (
            <div className="mt-6 rounded border border-yellow-600 bg-yellow-950/40 p-4 text-base text-yellow-300">
              You have changes that are not on the website yet. Click{" "}
              <span className="font-bold">
                &quot;Save &amp; Publish Changes&quot;
              </span>{" "}
              below to make them show up.
            </div>
          )}

          <div className="mt-6 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={saveChanges}
              disabled={isPending}
              className="rounded bg-yellow-500 px-8 py-4 text-xl font-bold text-black hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save & Publish Changes"}
            </button>
            <p className="text-sm text-zinc-400">
              Click this button any time you add, edit, or delete a show —
              your changes will not appear on the website until you do.
            </p>

            {status && (
              <p
                className={`rounded p-3 text-base font-semibold ${
                  status.ok
                    ? "bg-green-950/40 text-green-400"
                    : "bg-red-950/40 text-red-400"
                }`}
              >
                {status.ok ? "✓ " : "✗ "}
                {status.message}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
