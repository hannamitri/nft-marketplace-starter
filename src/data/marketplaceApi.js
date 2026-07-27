import NftImage from "../images/nftImage.jpg";
import {
  findAuthorById,
  findSeedItemById,
  getAllItems,
  getTopSellers,
  sortItems,
} from "./marketplaceData";

const NEW_ITEMS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const EXPLORE_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const HOT_COLLECTIONS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const TOP_SELLERS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
const AUTHORS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";
const ITEM_DETAILS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const cleanTitle = (value) => String(value || "Untitled").replace(/\s+/g, " ").trim();
const cleanName = (value) => String(value || "Unknown Creator").replace(/\s+/g, " ").trim();

const getDefaultSerialNumber = (nftId) => {
  const parsed = Number(nftId);
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return Number(String(parsed).slice(-3));
};

const normalizeNewItem = (rawItem) => {
  const normalizedItemId = String(rawItem?.nftId || rawItem?.id || "");
  const seedItem = findSeedItemById(normalizedItemId);
  const ownerId = String(rawItem?.authorId || seedItem?.ownerId || "unknown");

  return {
    id: normalizedItemId,
    title: cleanTitle(rawItem?.title || seedItem?.title),
    serialNumber: seedItem?.serialNumber || getDefaultSerialNumber(normalizedItemId),
    price: Number(rawItem?.price ?? seedItem?.price ?? 0),
    likes: Number(rawItem?.likes ?? seedItem?.likes ?? 0),
    views: Number(seedItem?.views ?? 100),
    ownerId,
    creatorId: seedItem?.creatorId || ownerId,
    image: rawItem?.nftImage || seedItem?.image || NftImage,
    authorImage: rawItem?.authorImage || undefined,
    expiryDate:
      typeof rawItem?.expiryDate === "number" && Number.isFinite(rawItem.expiryDate)
        ? rawItem.expiryDate
        : null,
    description:
      seedItem?.description ||
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  };
};

const normalizeCollection = (rawCollection) => {
  const collectionId = String(rawCollection?.nftId || rawCollection?.id || "");
  const seedItem = findSeedItemById(collectionId);
  const ownerId = String(rawCollection?.authorId || seedItem?.ownerId || "unknown");
  const author = findAuthorById(ownerId);

  return {
    id: collectionId,
    title: cleanTitle(rawCollection?.title || seedItem?.title),
    code: rawCollection?.code,
    ownerId,
    authorName: author.name,
    authorImage: rawCollection?.authorImage || author.image,
    nftImage: rawCollection?.nftImage || seedItem?.image || NftImage,
  };
};

const byUniqueItemId = (itemsList) => {
  const uniqueById = new Map();

  itemsList.forEach((item) => {
    uniqueById.set(item.id, item);
  });

  return Array.from(uniqueById.values());
};

const byUniqueSellerId = (sellersList) => {
  const uniqueById = new Map();

  sellersList.forEach((seller) => {
    uniqueById.set(seller.id, seller);
  });

  return Array.from(uniqueById.values());
};

const normalizeTopSeller = (rawSeller) => {
  const sellerId = String(rawSeller?.authorId || rawSeller?.id || "unknown");
  const knownAuthor = findAuthorById(sellerId);

  return {
    id: sellerId,
    name: cleanName(rawSeller?.authorName || knownAuthor.name),
    image: rawSeller?.authorImage || knownAuthor.image,
    price: Number(rawSeller?.price ?? 0),
  };
};

const normalizeAuthorProfile = (authorId, rawAuthor) => {
  const knownAuthor = findAuthorById(authorId);
  const resolvedId = String(rawAuthor?.authorId || authorId || knownAuthor.id);
  const rawCollection = Array.isArray(rawAuthor?.nftCollection)
    ? rawAuthor.nftCollection
    : [];
  const nftCollection = rawCollection.map((entry, index) => ({
    id: String(entry?.nftId || entry?.id || `${resolvedId}-${index}`),
    title: cleanTitle(entry?.title),
    serialNumber: getDefaultSerialNumber(String(entry?.nftId || entry?.id || index)),
    price: Number(entry?.price ?? 0),
    likes: Number(entry?.likes ?? 0),
    views: 100,
    ownerId: resolvedId,
    creatorId: resolvedId,
    image: entry?.nftImage || NftImage,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  }));

  return {
    id: resolvedId,
    name: cleanName(rawAuthor?.authorName || knownAuthor.name),
    username: rawAuthor?.tag || knownAuthor.username,
    wallet: rawAuthor?.address || rawAuthor?.walletAddress || knownAuthor.wallet,
    followers: Number(rawAuthor?.followers ?? knownAuthor.followers ?? 0),
    image: rawAuthor?.authorImage || knownAuthor.image,
    tagline: rawAuthor?.tagline || "",
    nftCollection,
  };
};

const normalizeItemDetails = (rawItem) => {
  const normalizedItemId = String(rawItem?.nftId || rawItem?.id || "");
  const seedItem = findSeedItemById(normalizedItemId);
  const ownerId = String(rawItem?.ownerId || rawItem?.authorId || seedItem?.ownerId || "unknown");
  const creatorId = String(rawItem?.creatorId || seedItem?.creatorId || ownerId);

  return {
    id: normalizedItemId,
    title: cleanTitle(rawItem?.title || seedItem?.title),
    serialNumber: seedItem?.serialNumber || getDefaultSerialNumber(normalizedItemId),
    price: Number(rawItem?.price ?? seedItem?.price ?? 0),
    likes: Number(rawItem?.likes ?? seedItem?.likes ?? 0),
    views: Number(rawItem?.views ?? seedItem?.views ?? 100),
    ownerId,
    creatorId,
    image: rawItem?.nftImage || seedItem?.image || NftImage,
    authorImage: rawItem?.authorImage || undefined,
    expiryDate:
      typeof rawItem?.expiryDate === "number" && Number.isFinite(rawItem.expiryDate)
        ? rawItem.expiryDate
        : null,
    description:
      rawItem?.description ||
      seedItem?.description ||
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  };
};

export const fetchNewItems = async () => {
  const response = await fetch(NEW_ITEMS_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch new items");
  }

  const payload = await response.json();
  return Array.isArray(payload) ? payload.map(normalizeNewItem) : [];
};

export const fetchExploreItems = async (sortOrder = "") => {
  const endpointUrl =
    sortOrder && sortOrder !== ""
      ? `${EXPLORE_ENDPOINT}?filter=${encodeURIComponent(sortOrder)}`
      : EXPLORE_ENDPOINT;

  const response = await fetch(endpointUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch explore items");
  }

  const payload = await response.json();
  return Array.isArray(payload) ? payload.map(normalizeNewItem) : [];
};

export const fetchHotCollections = async () => {
  const response = await fetch(HOT_COLLECTIONS_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch hot collections");
  }

  const payload = await response.json();
  return Array.isArray(payload) ? payload.map(normalizeCollection) : [];
};

export const fetchTopSellers = async () => {
  const response = await fetch(TOP_SELLERS_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch top sellers");
  }

  const payload = await response.json();
  return Array.isArray(payload) ? payload.map(normalizeTopSeller) : [];
};

export const fetchAuthorProfile = async (authorId) => {
  const response = await fetch(
    `${AUTHORS_ENDPOINT}?author=${encodeURIComponent(String(authorId || ""))}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch author profile");
  }

  const payload = await response.json();
  return normalizeAuthorProfile(authorId, payload);
};

export const fetchItemDetails = async (itemId) => {
  const response = await fetch(
    `${ITEM_DETAILS_ENDPOINT}?nftId=${encodeURIComponent(String(itemId || ""))}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch item details");
  }

  const payload = await response.json();
  return normalizeItemDetails(payload);
};

export const buildExploreItems = (apiItems, sortOrder) => {
  if (Array.isArray(apiItems) && apiItems.length > 0) {
    return sortItems(byUniqueItemId([...apiItems, ...getAllItems()]), sortOrder);
  }

  return sortItems(getAllItems(), sortOrder);
};

export const buildTopSellers = (apiSellers) => {
  if (Array.isArray(apiSellers) && apiSellers.length > 0) {
    return byUniqueSellerId(apiSellers);
  }

  return getTopSellers().map((seller) => ({
    id: seller.id,
    name: seller.name,
    image: seller.image,
    price: null,
    followers: seller.followers,
  }));
};
