import upcomingShows from "@/app/data/upcoming-shows.json";
import { getServerAuthSession } from "@/auth";
import type { Show } from "@/types/show";
import { redirect } from "next/navigation";

import AdminShowsEditor from "./AdminShowsEditor";
import { saveShowsToGitHub } from "./actions";
import AdminSignOutButton from "./AdminSignOutButton";

export default async function AdminPage() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const shows = upcomingShows as Show[];

  return (
    <>
      <div className="bg-black px-4 pt-6 text-white">
        <div className="mx-auto flex w-full max-w-5xl justify-end">
          <AdminSignOutButton />
        </div>
      </div>
      <AdminShowsEditor
        initialShows={shows}
        saveShowsAction={saveShowsToGitHub}
      />
    </>
  );
}
