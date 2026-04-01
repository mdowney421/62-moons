export type Show = {
  date: string;
  venue: string;
  location: string;
  address: string;
  time: string;
};

export function isValidShow(candidate: unknown): candidate is Show {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const show = candidate as Partial<Show>;

  return (
    typeof show.date === "string" &&
    typeof show.venue === "string" &&
    typeof show.location === "string" &&
    typeof show.address === "string" &&
    typeof show.time === "string"
  );
}

export function compareShowBySoonest(a: Show, b: Show): number {
  const aDate = Date.parse(a.date);
  const bDate = Date.parse(b.date);

  if (Number.isNaN(aDate) && Number.isNaN(bDate)) {
    return 0;
  }

  if (Number.isNaN(aDate)) {
    return 1;
  }

  if (Number.isNaN(bDate)) {
    return -1;
  }

  return aDate - bDate;
}

export function sortShowsBySoonest(shows: Show[]): Show[] {
  return [...shows].sort(compareShowBySoonest);
}