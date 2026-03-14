import { useState, useEffect } from "react";
import { fetchAuthor } from "../services/nftApi";



export const useAuthor = (authorId) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorId) return;

    const loadAuthor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAuthor(authorId);
        setAuthor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAuthor();
  }, [authorId]);

  return { author, loading, error };
};












