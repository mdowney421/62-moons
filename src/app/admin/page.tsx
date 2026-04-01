import upcomingShows from "@/app/data/upcoming-shows.json";
import type { Show } from "@/types/show";

import AdminShowsEditor from "./AdminShowsEditor";
import { saveShowsToGitHub } from "./actions";

export default function AdminPage() {
  const shows = upcomingShows as Show[];

  return (
    <AdminShowsEditor
      initialShows={shows}
      saveShowsAction={saveShowsToGitHub}
    />
  );
}
