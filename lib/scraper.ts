import axios from "axios";
import * as cheerio from "cheerio";
export interface HackerNewsEntry {
  order: number;
  title: string;
  points: number;
  comments: number;
}

// Cache to store the scraped data
const cache = new Map<string, { data: HackerNewsEntry[]; expiry: number }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function scrapeHackerNews() {
  // Check if we have cached data
  const cacheKey = "hacker-news-entries";
  const cachedData = cache.get(cacheKey);
  if (cachedData && cachedData.expiry > Date.now()) {
    console.log("Using cached data");
    return cachedData.data;
  }
  try {
    const response = await axios.get("https://news.ycombinator.com/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HackerNewsScraper/1.0)",
      },
    });
    const $ = cheerio.load(response.data);
    const entries: HackerNewsEntry[] = [];

    $(".athing")
      .slice(0, 30)
      .each((index, element) => {
        const order = parseInt(
          $(element).find(".rank").text().replace(".", ""),
          10
        );
        const title = $(element).find(".titleline > a").text().trim();
        const nextRow = $(element).next();
        const points = parseInt(
          nextRow.find(".score").text().replace(" points", "") || "0",
          10
        );
        const commentsText = nextRow.find("a").last().text();
        const comments = parseInt(
          commentsText.replace(" comments", "") || "0",
          10
        );

        entries.push({ order, title, points, comments });
      });

    // Cache data
    cache.set(cacheKey, { data: entries, expiry: Date.now() + CACHE_DURATION });
    return entries;
  } catch (error) {
    console.error("Error scraping Hacker News:", error);
    return [];
  }
}
