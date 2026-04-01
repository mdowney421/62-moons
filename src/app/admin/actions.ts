"use server";

import { getServerAuthSession } from "@/auth";
import { isValidShow, sortShowsBySoonest, type Show } from "@/types/show";

type SaveState = {
  ok: boolean;
  message: string;
};

type GitHubFileResponse = {
  sha: string;
};

const GITHUB_API_VERSION = "2022-11-28";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function validateShows(shows: Show[]): void {
  if (!Array.isArray(shows)) {
    throw new Error("Shows payload must be an array.");
  }

  for (const [index, show] of shows.entries()) {
    if (!isValidShow(show)) {
      throw new Error(`Invalid show payload at index ${index}.`);
    }

    if (
      !show.date.trim() ||
      !show.venue.trim() ||
      !show.location.trim() ||
      !show.address.trim() ||
      !show.time.trim()
    ) {
      throw new Error(`Show at index ${index} includes blank values.`);
    }
  }
}

async function getExistingFileSha(
  url: string,
  headers: HeadersInit,
): Promise<string | undefined> {
  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Unable to read target file from GitHub: ${errorBody}`);
  }

  const file = (await response.json()) as GitHubFileResponse;
  return file.sha;
}

export async function saveShowsToGitHub(shows: Show[]): Promise<SaveState> {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) {
      return {
        ok: false,
        message: "Unauthorized. Please sign in again.",
      };
    }

    validateShows(shows);
    const sortedShows = sortShowsBySoonest(shows);

    const token = getRequiredEnv("GITHUB_TOKEN");
    const owner = getRequiredEnv("GITHUB_OWNER");
    const repo = getRequiredEnv("GITHUB_REPO");
    const branch = process.env.GITHUB_BRANCH ?? "main";
    const path = process.env.GITHUB_SHOWS_PATH ?? "src/app/data/upcoming-shows.json";

    const encodedPath = encodeURIComponent(path).replace(/%2F/g, "/");
    const endpoint = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;

    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
    };

    const sha = await getExistingFileSha(`${endpoint}?ref=${encodeURIComponent(branch)}`, headers);
    const nextContent = `${JSON.stringify(sortedShows, null, 2)}\n`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `Update upcoming shows (${new Date().toISOString()})`,
        content: Buffer.from(nextContent, "utf-8").toString("base64"),
        branch,
        sha,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        ok: false,
        message: `Publish changes failed: ${errorBody}`,
      };
    }

    return {
      ok: true,
      message: "Changes published successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown error while saving.",
    };
  }
}