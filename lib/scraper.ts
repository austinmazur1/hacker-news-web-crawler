import axios from "axios";
import * as cheerio from "cheerio";
import { HackerNewsEntry } from "@/types/hackerNewsEntryTypes";

export async function scrapeHackerNews() {
  try {
    const response = await axios.get("https://news.ycombinator.com/");
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

    return entries;
  } catch (error) {
    console.error("Error scraping Hacker News:", error);
    return [];
  }
}
