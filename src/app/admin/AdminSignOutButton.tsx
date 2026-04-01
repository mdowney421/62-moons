"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AdminSignOutButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    await signOut({ callbackUrl: "/admin/login" });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="rounded border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
