const ETH_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

const AUTHOR_WALLET_KEYS = [
  "authorWallet",
  "wallet",
  "walletAddress",
  "creatorWallet",
  "ownerWallet",
];

/** @param {unknown} value */
export function normalizeEthereumAddress(value) {
  if (typeof value !== "string") return "";
  const s = value.trim();
  return ETH_ADDRESS_RE.test(s) ? s : "";
}

/** @param {object} row */
export function pickAuthorWalletFromApiRow(row) {
  if (!row || typeof row !== "object") return "";
  for (const key of AUTHOR_WALLET_KEYS) {
    const normalized = normalizeEthereumAddress(row[key]);
    if (normalized) return normalized;
  }
  return "";
}

/** @param {string} [name] */
export function formatAuthorHandle(name) {
  if (!name || typeof name !== "string") {
    return "@creator";
  }
  const slug = name
    .replace(/\s+/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 18);
  return `@${slug || "creator"}`;
}

/**
 * When an author is not in the top sellers list but has NFTs from explore,
 * build a minimal profile for display (explore items may omit authorName).
 * @param {string|number} authorId
 * @param {Array<{ authorName?: string, authorImage?: string, price?: number, authorWallet?: string }>} items
 */
export function buildAuthorProfileFromNfts(authorId, items) {
  if (!items?.length) return null;
  const first = items[0];
  const prices = items
    .map((i) => Number(i.price))
    .filter((n) => Number.isFinite(n));
  const avgPrice =
    prices.length > 0
      ? Number(
          (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
        )
      : 0;
  const rawName =
    typeof first.authorName === "string" ? first.authorName.trim() : "";
  let authorWallet = "";
  for (const item of items) {
    const w = pickAuthorWalletFromApiRow(item);
    if (w) {
      authorWallet = w;
      break;
    }
  }
  return {
    authorId: Number(authorId),
    authorName: rawName || "Creator",
    authorImage: first.authorImage || "",
    price: avgPrice,
    authorWallet,
  };
}

/** Deterministic pseudo-address for display (not on-chain). */
export function formatPseudoWallet(authorId) {
  const n = Math.floor(Number(authorId));
  if (!Number.isFinite(n) || n < 0) {
    return `0x${"0".repeat(40)}`;
  }
  let hex = n.toString(16);
  while (hex.length < 40) {
    hex = `0${hex}`;
  }
  return `0x${hex.slice(0, 40)}`;
}
