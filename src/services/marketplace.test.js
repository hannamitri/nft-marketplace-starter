import {
  fetchExploreItems,
  fetchAuthor,
  fetchHotCollections,
  fetchNewItems,
  fetchTopSellers,
} from "./marketplace";

const API_BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

it("calls each marketplace endpoint and encodes the Explore sort filter", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([]),
  });

  await fetchHotCollections();
  await fetchNewItems();
  await fetchTopSellers();
  await fetchExploreItems("likes_high_to_low");

  expect(global.fetch).toHaveBeenNthCalledWith(
    1,
    `${API_BASE_URL}/hotCollections`
  );
  expect(global.fetch).toHaveBeenNthCalledWith(2, `${API_BASE_URL}/newItems`);
  expect(global.fetch).toHaveBeenNthCalledWith(3, `${API_BASE_URL}/topSellers`);
  expect(global.fetch).toHaveBeenNthCalledWith(
    4,
    `${API_BASE_URL}/explore?filter=likes_high_to_low`
  );
});

it("reports unsuccessful and malformed API responses", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 503,
  });

  await expect(fetchTopSellers()).rejects.toThrow(
    "Failed to load top sellers (503)"
  );

  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ items: [] }),
  });

  await expect(fetchExploreItems()).rejects.toThrow(
    "The explore items API returned an invalid response"
  );
});

it("loads an author profile from its author ID", async () => {
  const author = {
    authorId: 83937449,
    authorName: "Monica Lucas",
    nftCollection: [],
  };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(author),
  });

  await expect(fetchAuthor("83937449")).resolves.toEqual(author);
  expect(global.fetch).toHaveBeenCalledWith(
    `${API_BASE_URL}/authors?author=83937449`
  );
});
