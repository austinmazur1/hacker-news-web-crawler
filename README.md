## This is a Next.js project, built to scrape ycombinator site for first 30 entries.

### Getting Started

First, install dependencies:

```bash
npm install
```

Next add URI for mongodb to `.env`

Start server:

```
bash npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Requirements

- Web crawler using scraping technique to extract first 30 entries from [Y Combinator](https://news.ycombinator.com/). Only getting the **number**, **title**, **points**, **number of comments**.

- Filter all prev entries with **more than five words in title**, ordered by the number of comments first

- Filter all prev entries with **less than or equal to five words in title**, ordered by points.

- For counting words, we only consider **spaced words** and excluding any **symbols**.
  (e.g. “This is - a self-explained example”).

- Include a storage solution to track the user interaction and usage behavior (e.g request timestamp, the filter applied, etc.).

- Implement automated testing.
