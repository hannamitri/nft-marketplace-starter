export const EXPLORE_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export const AUTHORS_API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

export const DETAILS_API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

export const MIN_SKELETON_MS = 1000;
export const VALID_EXPLORE_FILTERS = [
  "price_low_to_high",
  "price_high_to_low",
  "likes_high_to_low",
];

export const buildAuthorsUrl = (authorId) => {
  const id =
    authorId === undefined || authorId === null || authorId === ""
      ? null
      : String(authorId);

  if (!id) {
    return AUTHORS_API_BASE;
  }

  return `${AUTHORS_API_BASE}?${new URLSearchParams({ author: id }).toString()}`;
};

export const buildItemDetailsUrl = (nftId) => {
  const id =
    nftId === undefined || nftId === null || nftId === ""
      ? null
      : String(nftId);

  if (!id) {
    return DETAILS_API_BASE;
  }

  return `${DETAILS_API_BASE}?${new URLSearchParams({ nftId: id }).toString()}`;
};

export const buildExploreUrl = (filter) => {
  const normalized = typeof filter === "string" ? filter.trim() : "";
  if (!normalized || !VALID_EXPLORE_FILTERS.includes(normalized)) {
    return EXPLORE_API_URL;
  }

  return `${EXPLORE_API_URL}?${new URLSearchParams({ filter: normalized }).toString()}`;
};
