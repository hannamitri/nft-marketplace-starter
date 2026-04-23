export const FUNCTIONS_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";

export const EXPLORE_API_URL = `${FUNCTIONS_BASE}/explore`;

/**
 * @param {string} filterValue one of "" | "price_low_to_high" | "price_high_to_low" | "likes_high_to_low"
 * @returns {string}
 */
export function getExploreListUrl(filterValue) {
  if (!filterValue) {
    return EXPLORE_API_URL;
  }
  return `${EXPLORE_API_URL}?filter=${encodeURIComponent(filterValue)}`;
}

/** Minimum time to show skeleton loading UI (explore + home + item details). */
export const SKELETON_MIN_MS = 1000;

/**
 * @param {string|number} authorId
 * @returns {string}
 */
export function authorApiUrl(authorId) {
  return `${FUNCTIONS_BASE}/author?authorId=${encodeURIComponent(
    String(authorId)
  )}`;
}
