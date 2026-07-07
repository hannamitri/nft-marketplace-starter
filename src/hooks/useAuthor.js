import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

export default function useAuthor(authorId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorId) return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}?author=${authorId}`);
        if (isMounted) setData(res?.data || null);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [authorId]);

  return { data, loading, error };
}