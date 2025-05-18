import { headers } from "next/headers";
import { scrapeHackerNews } from "@/lib/scraper";
import {
  filterLongTitlesByComments,
  filterShortTitlesByPoints,
} from "@/lib/utils";
import FilterSelector from "@/components/FilterSelector";
import EntriesList from "@/components/EntriesList";

import { sendUsageData } from "@/lib/storage";

interface PageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Page({ searchParams }: PageProps) {
  // Await for the searchParams to be available first
  const params = await searchParams;
  const filter = Array.isArray(params.filter)
    ? params.filter[0]
    : params.filter || "none"; // Ensure filter is a string

    const headersList = await headers()
    const userAgent = headersList.get("user-agent") || "unknown";

    // Measure request and response time
    const requestTimestamp = Date.now();

  // Fetch the Hacker News entries
  const entries = await scrapeHackerNews();

  let filteredEntries = entries;
  if (filter === "more-than-five") {
    filteredEntries = filterLongTitlesByComments(entries);
  } else if (filter === "less-than-five") {
    filteredEntries = filterShortTitlesByPoints(entries);
  }

  const responseTimestamp = Date.now();
  const duration = responseTimestamp - requestTimestamp;

  await sendUsageData({
    requestTimestamp,
    responseTimestamp,
    duration,
    entryCount: entries.length,
    userAgent,
    filterApplied: filter,
  });

  return (
    <div className="m-16">
      <h1 className="text-4xl font-bold text-center">Hacker News Crawler</h1>
      <div className="flex justify-center ">
        <FilterSelector filter={filter} />
      </div>
      <EntriesList filteredEntries={filteredEntries} />
    </div>
  );
}
