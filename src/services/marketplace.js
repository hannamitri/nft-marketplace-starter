const API_BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const fetchJson = async (endpoint, resourceName) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${resourceName} (${response.status})`);
  }

  return response.json();
};

const fetchList = async (endpoint, resourceName) => {
  const data = await fetchJson(endpoint, resourceName);

  if (!Array.isArray(data)) {
    throw new Error(`The ${resourceName} API returned an invalid response`);
  }

  return data;
};

export const fetchHotCollections = () =>
  fetchList("hotCollections", "hot collections");

export const fetchNewItems = () => fetchList("newItems", "new items");

export const fetchTopSellers = () => fetchList("topSellers", "top sellers");

export const fetchExploreItems = (filter = "") => {
  const query = filter ? `?filter=${encodeURIComponent(filter)}` : "";
  return fetchList(`explore${query}`, "explore items");
};

export const fetchItemDetails = async (nftId) => {
  if (nftId == null || String(nftId).trim() === "") {
    throw new Error("An NFT ID is required");
  }

  const item = await fetchJson(
    `itemDetails?nftId=${encodeURIComponent(nftId)}`,
    "item details"
  );

  if (
    !item ||
    typeof item !== "object" ||
    Array.isArray(item) ||
    item.nftId == null ||
    String(item.nftId) !== String(nftId)
  ) {
    throw new Error("The item details API returned an invalid item");
  }

  return item;
};

export const fetchAuthor = async (authorId) => {
  if (!authorId) {
    throw new Error("An author ID is required");
  }

  const response = await fetchJson(
    `authors?author=${encodeURIComponent(authorId)}`,
    "author"
  );
  const authors = Array.isArray(response) ? response : [response];
  const author = authors.find(
    (item) => item && String(item.authorId) === String(authorId)
  );

  if (!author) {
    return null;
  }

  if (!Array.isArray(author.nftCollection)) {
    throw new Error("The author API returned an invalid profile");
  }

  return author;
};
