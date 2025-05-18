import axios from 'axios';
import { scrapeHackerNews, __clearCacheForTests } from '../lib/scraper';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HackerNews Scraper', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    __clearCacheForTests();
  });

  it('should successfully scrape Hacker News entries', async () => {
    const mockHtml = `
      <table>
        <tr class="athing">
          <td class="rank">1.</td>
          <td class="titleline"><a href="#">Test Title 1</a></td>
        </tr>
        <tr>
          <td class="score">100 points</td>
          <td><a href="#">5 comments</a></td>
        </tr>
        <tr class="athing">
          <td class="rank">2.</td>
          <td class="titleline"><a href="#">Test Title 2</a></td>
        </tr>
        <tr>
          <td class="score">50 points</td>
          <td><a href="#">2 comments</a></td>
        </tr>
      </table>
    `;

    mockedAxios.get.mockResolvedValueOnce({ data: mockHtml });

    const result = await scrapeHackerNews();

    // Verify axios was called with correct parameters
    expect(mockedAxios.get).toHaveBeenCalledWith('https://news.ycombinator.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HackerNewsScraper/1.0)',
      },
    });

    // Verify the scraped data
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      order: 1,
      title: 'Test Title 1',
      points: 100,
      comments: 5,
    });
    expect(result[1]).toEqual({
      order: 2,
      title: 'Test Title 2',
      points: 50,
      comments: 2,
    });
  });

  it('should handle missing points and comments gracefully', async () => {
    const mockHtml = `
      <table>
        <tr class="athing">
          <td class="rank">1.</td>
          <td class="titleline"><a href="#">Test Title</a></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    mockedAxios.get.mockResolvedValueOnce({ data: mockHtml });

    const result = await scrapeHackerNews();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      order: 1,
      title: 'Test Title',
      points: 0,
      comments: 0,
    });
  });

  it('should handle errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await scrapeHackerNews();

    expect(result).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
}); 
