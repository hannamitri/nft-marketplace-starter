import { useState, useEffect } from "react";
import { fetchItemDetails } from "../services/nftApi";


export const useItemDetails = (nftId) => {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nftId) return;

    const loadItemDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItemDetails(nftId);
        setNft(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItemDetails();
  }, [nftId]);

  return { nft, loading, error };
};