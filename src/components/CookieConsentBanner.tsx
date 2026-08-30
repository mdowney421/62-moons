"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  applyConsent,
  getStoredConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
  storeConsent,
  type ConsentChoice,
} from "../lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads localStorage, unavailable during SSR, so this can't be computed
    // during render without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getStoredConsent()) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopen);
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopen);
  }, []);

  const choose = (choice: ConsentChoice) => {
    storeConsent(choice);
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-2xl flex-col gap-4 rounded-lg border border-red-900 bg-black p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="flex-1 text-sm text-gray-400">
        We use Google Analytics to understand how visitors use this site. It
        only runs if you say yes, and you can change your mind anytime from
        the link in the footer. See our{" "}
        <Link href="/privacy" className="text-gray-300 underline hover:text-red-500">
          privacy policy
        </Link>{" "}
        for details.
      </p>
      <div className="flex flex-shrink-0 justify-end gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-300 transition hover:border-gray-500 hover:text-white"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded bg-red-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-600"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
