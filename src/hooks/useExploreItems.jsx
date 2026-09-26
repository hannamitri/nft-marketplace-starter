import { useEffect, useState } from "react";
import { getExploreItems } from "../api/explore";

const INITIAL_VISIBLE = 8;

const useExploreItems = (filter) => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setVisibleCount(INITIAL_VISIBLE);

    getExploreItems(filter)
      .then((data) => {
        if (!isMounted) return;
        setItems(data || []);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filter]);

  const showMore = () => {
    setVisibleCount((prev) => {
      const next = prev + 4;
      return next > 16 ? 16 : next;
    });
  };

  return {
    items,
    loading,
    visibleCount,
    showMore,
  };
};

export default useExploreItems;
