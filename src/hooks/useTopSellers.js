import { useEffect, useState } from "react";
import { normalizeImageSource } from "../utils/imageFallback";
import { pickAuthorWalletFromApiRow } from "../utils/authorDisplay";

export const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

function normalizeSeller(row) {
  return {
    id: Number(row?.id) || 0,
    authorId: Number(row?.authorId) || 0,
    authorName:
      typeof row?.authorName === "string" && row.authorName.trim()
        ? row.authorName.trim()
        : "Creator",
    authorImage: normalizeImageSource(row?.authorImage),
    price: Number.isFinite(Number(row?.price)) ? Number(row.price) : 0,
    authorWallet: pickAuthorWalletFromApiRow(row || {}),
  };
}

export function useTopSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(TOP_SELLERS_URL, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        const data = await res.json();
        setSellers(Array.isArray(data) ? data.map(normalizeSeller) : []);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message || "Failed to load top sellers");
        setSellers([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { sellers, loading, error };
}
