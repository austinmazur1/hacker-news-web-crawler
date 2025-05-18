## This is a Next.js project, built to scrape ycombinator site for first 30 entries.

This project implements a web scraper to extract the first 30 entries from [Y Combinator](https://news.ycombinator.com/). I decided to utilize my skills and knowledge with Next.js to create a user-friendly interface for displaying the scraped data and filtering.

The scraper uses axios to `axios` `cheerio` to fetch and parse the data, I utilize caching in order to not make redundant and unnecessary requests so frequently.

I use `Jest` in order to test the scraper, filtering functions and the db integration.

### Getting Started

First, install dependencies:

```bash
npm install
```

#### Next add URI for mongodb to `.env`

Start server:

```bash
 npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

```bash
npm run test
# or
npm run test:watch
```

### Takeaways

Having little experience with scraping techniques as well as implementing tests, I found this to be a good opportunity to learn more and get some practice in.

I had some trial and error with setting up and implementing the tests with Jest. I was able to test the core functionalities (scraper, db, filtering functions). But when it came to adding tests for the UI, I ran into some issues. It appeared to be a mix of TS config issues, ECM syntax differences and Jest config. While I am content I got the other tests running and passing, I will continue to seek what I was missing so I can add those other tests.

When first thinking of the data fetching, I thought of creating an API route and calling it from our main page. But then I was thinking of SSR and ultimately went that path. One thing that was on my mind though was that I didn't want to keep scraping data every time there was a reload on the page. To avoid this, I added caching (5min).

Although web scrapers are often implemented as CLI scripts, I chose to build a Next.js web app to leverage my knowledge and experience with JS, TS and Next.js. Being new to scraping, this allowed me to integrate the scrapper into a familiar framework and have a user-friendly UI to display the data and change the filtering methods as per the requirements.

Going forward, this exercise sparked a desire to learn and practice more with implementing tests. Even making some personal project trying TDD. Along with that, research more about web crawlers and scraping techniques and the best practices that go along with them.

### Requirements

- Web crawler using scraping technique to extract first 30 entries from [Y Combinator](https://news.ycombinator.com/). Only getting the **number**, **title**, **points**, **number of comments**.

- Filter all prev entries with **more than five words in title**, ordered by the number of comments first

- Filter all prev entries with **less than or equal to five words in title**, ordered by points.

- For counting words, we only consider **spaced words** and excluding any **symbols**.
  (e.g. “This is - a self-explained example”).

- Include a storage solution to track the user interaction and usage behavior (e.g request timestamp, the filter applied, etc.).

- Implement automated testing.
