import { HackerNewsEntry } from "@/lib/scraper";

const countWords = (title: string): number => {
  const words = title
    .trim() // Remove leading and trailing whitespace
    .split(/\s+/) // Split by whitespace
    .filter((word) => word.match(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/)); // Filter out non-alphanumeric words

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
