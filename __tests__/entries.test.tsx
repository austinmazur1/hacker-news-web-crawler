import "@testing-library/jest-dom";
import { HackerNewsEntry } from "../lib/scraper";
import { scrapeHackerNews} from "../lib/scraper";
import {
  filterLongTitlesByComments,
  filterShortTitlesByPoints,
  countWords,
} from "../lib/utils";

const mockEntries: HackerNewsEntry[] = [
  {
    order: 1,
    title: "This is a test title with more than five words",
    points: 10,
    comments: 5,
  },
  { order: 2, title: "Short title", points: 20, comments: 15 },
  {
    order: 3,
    title: "Another long title that has more than five words",
    points: 30,
    comments: 10,
  },
  {
    order: 4,
    title: "This is - a self-explained example",
    points: 5,
    comments: 2,
  },
];

describe("Filtering functions", () => {
  test("countWords function", () => {
    expect(countWords("This is a test")).toBe(4);
    expect(countWords("Another long title that has more than five words")).toBe(
      9
    );
    expect(countWords("Short title")).toBe(2);
    expect(countWords("This is - a self-explained example")).toBe(5);
  });

  test("filter titles with more than 5 words", () => {
    const filtered = filterLongTitlesByComments(mockEntries);
    expect(filtered).toHaveLength(2);
    expect(filtered.map((entry) => entry.title)).toEqual([
      "Another long title that has more than five words",
      "This is a test title with more than five words",
    ]);
    expect(filtered.map((e) => e.title)).not.toContain("Short title");
    expect(filtered.map((e) => e.title)).not.toContain(
      "This is - a self-explained example"
    );
  });

  test("Sorts filtered titles by comments in descending order", () => {
    const filtered = filterLongTitlesByComments(mockEntries);
    expect(filtered).toHaveLength(2);
    expect(filtered[0].comments).toBe(10);
    expect(filtered[0].order).toBe(3);
    expect(filtered[1].comments).toBe(5);
    expect(filtered[1].order).toBe(1);
    expect(filtered[0].comments).toBeGreaterThan(filtered[1].comments);
  });

  test("Filter titles with 5 or less words", () => {
    const filtered = filterShortTitlesByPoints(mockEntries);
    expect(filtered).toHaveLength(2);
    expect(filtered.map((entry) => entry.title)).toEqual([
      "Short title",
      "This is - a self-explained example",
    ]);
    expect(filtered.map((e) => e.title)).not.toContain(
      "Another long title that has more than five words"
    );
    expect(filtered.map((e) => e.title)).not.toContain(
      "This is a test title with more than five words"
    );
  });

  test("Sorts filtered titles by points in descending order", () => {
    const filtered = filterShortTitlesByPoints(mockEntries);
    expect(filtered).toHaveLength(2);
    expect(filtered[0].points).toBe(20);
    expect(filtered[0].order).toBe(2);
    expect(filtered[1].points).toBe(5);
    expect(filtered[1].order).toBe(4);
    expect(filtered[0].points).toBeGreaterThan(filtered[1].points);
  });
});

// describe("EntriesList Component", () => {
//   test("Renders the entries correctly", () => {
//     const entries = [
//       { order: 1, title: "Test title", points: 10, comments: 5 },
//     ];
//     render(<EntriesList filteredEntries={entries} />);
//     expect(screen.getByText("Test title")).toBeInTheDocument();
//     expect(screen.getByText("10 points | 5 comments")).toBeInTheDocument();
//   });

//   test("Renders empty state when no entries", () => {
//     render(<EntriesList filteredEntries={[]} />);
//     expect(screen.getByText("No entries found")).toBeInTheDocument();
//     expect(
//       screen.getByText("Please try a different filter.")
//     ).toBeInTheDocument();
//   });
// });
