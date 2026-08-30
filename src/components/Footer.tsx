"use client";

import Link from "next/link";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "../lib/consent";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900 py-8 px-4 text-center text-gray-500 text-sm">
      <p className="mb-2 uppercase tracking-widest font-bold">
        62 Moons © 2026 | Chicago, IL
      </p>
      <p className="mb-3">
        Designed and built by{" "}
        <a
          href="https://mattdowneydev.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 underline"
        >
          Matt Downey
        </a>
      </p>
      <p className="flex items-center justify-center gap-2 text-xs">
        <Link href="/privacy" className="text-gray-500 hover:text-red-500 underline">
          Privacy policy
        </Link>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))
          }
          className="text-gray-500 hover:text-red-500 underline"
        >
          Cookie preferences
        </button>
      </p>
    </footer>
  );
}
