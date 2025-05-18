import { HackerNewsEntry } from "@/lib/scraper";

export const countWords = (title: string): number => {
  const words = title
    .replace(/[^\w\s]/g,'')
    .trim() // Remove leading and trailing whitespace
    .split(/\s+/) // Split by whitespace
    .filter((word) => word.length > 0) // Filter out empty strings

  return words.length;
};

const filterLongTitlesByComments = (entries: HackerNewsEntry[]) => {
  return entries
    .filter((entry) => countWords(entry.title) > 5)
    .sort((a, b) => b.comments - a.comments);
};

const filterShortTitlesByPoints = (entries: HackerNewsEntry[]) => {
  return entries
    .filter((entry) => countWords(entry.title) <= 5)
    .sort((a, b) => b.points - a.points);
};

export { filterLongTitlesByComments, filterShortTitlesByPoints };
