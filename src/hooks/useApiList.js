import { useEffect, useState } from "react";
import { fetchApiList } from "../api/nftApi";

const useApiList = (url, errorMessage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    async function loadData() {
      try {
        const response = await fetchApiList(url, controller.signal);
        if (!controller.signal.aborted) setData(response);
      } catch (requestError) {
        if (!controller.signal.aborted) setError(errorMessage);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [errorMessage, url]);

  return { data, loading, error };
};

export default useApiList;
