import { HackerNewsEntry } from "@/lib/scraper";
interface EntriesProps {
  filteredEntries: HackerNewsEntry[];
}
export default function EntriesList({ filteredEntries }: EntriesProps) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {filteredEntries.map((entry) => (
        <div
          key={entry.order}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h1 className="text-2xl font-bold">{entry.title}</h1>
          <p className="text-sm text-gray-500">
            {entry.points} points | {entry.comments} comments
          </p>
        </div>
      ))}
    </div>
  );
}
