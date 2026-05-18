import { useEffect, useState } from "react";
import { normalizeImageSource } from "../utils/imageFallback";
import { pickAuthorWalletFromApiRow } from "../utils/authorDisplay";

export const EXPLORE_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

export function normalizeExploreItem(row) {
  return {
    id: Number(row?.id) || 0,
    nftId: Number(row?.nftId) || 0,
    authorId: Number(row?.authorId) || 0,
    authorName:
      typeof row?.authorName === "string" && row.authorName.trim()
        ? row.authorName.trim()
        : "Creator",
    authorImage: normalizeImageSource(row?.authorImage),
    nftImage: normalizeImageSource(row?.nftImage),
    title:
      typeof row?.title === "string" && row.title.trim()
        ? row.title.trim()
        : "Untitled NFT",
    price: Number.isFinite(Number(row?.price)) ? Number(row.price) : 0,
    likes: Number.isFinite(Number(row?.likes)) ? Number(row.likes) : 0,
    expiryDate:
      typeof row?.expiryDate === "string" && row.expiryDate.trim()
        ? row.expiryDate.trim()
        : "",
    authorWallet: pickAuthorWalletFromApiRow(row || {}),
  };
}

export function useAuthorNfts(authorId) {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authorId == null) {
      setItems([]);
      setAllItems([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(EXPLORE_API_URL, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          setItems([]);
          setAllItems([]);
          return;
        }
        const idStr = String(authorId);
        const normalized = data.map(normalizeExploreItem);
        setAllItems(normalized);
        setItems(normalized.filter((item) => String(item.authorId) === idStr));
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message || "Failed to load author items");
        setItems([]);
        setAllItems([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [authorId]);

  return { items, allItems, loading, error };
}
