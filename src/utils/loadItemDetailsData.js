import { authorApiUrl, EXPLORE_API_URL, FUNCTIONS_BASE } from "../constants/exploreApi";

/**
 * @param {string|number} authorId
 * @returns {Promise<object|null>}
 */
async function fetchAuthorRecord(authorId) {
  const urls = [
    authorApiUrl(authorId),
    `${FUNCTIONS_BASE}/authors?authorId=${encodeURIComponent(String(authorId))}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const body = await res.json();
      if (body == null) continue;
      if (Array.isArray(body) && body.length > 0) {
        const first = body[0];
        if (first && typeof first === "object") return first;
        continue;
      }
      if (typeof body === "object") {
        if (body.data && typeof body.data === "object") return body.data;
        if (body.author && typeof body.author === "object") return body.author;
        return body;
      }
    } catch {
      /* try next */
    }
  }
  return null;
}

/**
 * Loads catalog entry for nftId and author profile when available.
 * @param {string} nftIdStr raw query param (digits)
 * @returns {Promise<{ nft: object, author: object|null }>}
 */
export async function loadItemDetailsData(nftIdStr) {
  const res = await fetch(EXPLORE_API_URL);
  if (!res.ok) {
    throw new Error(`Catalog request failed (${res.status})`);
  }
  const items = await res.json();
  if (!Array.isArray(items)) {
    throw new Error("Invalid catalog response");
  }

  const nft = items.find((row) => String(row.nftId) === String(nftIdStr));
  if (!nft) {
    throw new Error("NFT not found");
  }

  const author = await fetchAuthorRecord(nft.authorId);
  return { nft, author };
}

/**
 * @param {object} nft explore row
 * @param {object|null} author author endpoint payload or null
 */
export function buildAuthorDisplay(nft, author) {
  const a = author || {};
  const followersRaw =
    a.followers ??
    a.followerCount ??
    a.followersCount ??
    a.follower_count;
  let followersLabel = null;
  if (followersRaw != null && followersRaw !== "") {
    followersLabel = `${followersRaw} followers`;
  }

  return {
    id: nft.authorId,
    image:
      a.authorImage ||
      a.image ||
      a.avatarUrl ||
      a.avatar ||
      nft.authorImage,
    name:
      a.name ||
      a.authorName ||
      a.displayName ||
      `Creator #${nft.authorId}`,
    username: a.username || a.handle || a.twitter || "",
    wallet: a.wallet || a.walletAddress || a.address || "",
    followersLabel,
    bio: a.bio || a.description || a.about || "",
  };
}
