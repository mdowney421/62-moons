"use client";

import { type FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (!result || result.error) {
      setError("Invalid username or password.");
      setIsPending(false);
      return;
    }

    window.location.href = result.url ?? "/admin";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6"
    >
      <div>
        <label htmlFor="username" className="mb-1 block text-sm text-zinc-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded border border-zinc-700 bg-black px-3 py-2 text-white"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
