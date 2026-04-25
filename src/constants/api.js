export const EXPLORE_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export const AUTHORS_API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

/** Minimum time to show loading skeleton before revealing API results. */
export const MIN_SKELETON_MS = 1000;

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
