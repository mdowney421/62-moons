import { getServerAuthSession } from "@/auth";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-4xl font-black uppercase tracking-widest text-red-600">
          Admin Login
        </h1>
        <p className="mb-6 text-sm text-zinc-300">
          Sign in to manage upcoming shows.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
