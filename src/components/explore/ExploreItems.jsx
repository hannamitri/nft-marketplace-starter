import React, { useEffect, useState } from "react";
import NftCardSkeleton from "../common/NftCardSkeleton";
import NftItemCard from "./NftItemCard";
import {
  getExploreListUrl,
  SKELETON_MIN_MS,
} from "../../constants/exploreApi";
import { withMinDelay } from "../../utils/withMinDelay";

const INITIAL_VISIBLE = 8;
const LOAD_MORE_INCREMENT = 4;

const ExploreItems = () => {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await withMinDelay(
          SKELETON_MIN_MS,
          (async () => {
            const res = await fetch(getExploreListUrl(filter));
            if (!res.ok) {
              throw new Error(`Request failed (${res.status})`);
            }
            const json = await res.json();
            if (!Array.isArray(json)) {
              throw new Error("Invalid response shape");
            }
            return json;
          })()
        );
        if (cancelled) return;
        setItems(data);
        setVisibleCount(Math.min(INITIAL_VISIBLE, data.length));
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load explore items");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((c) => Math.min(c + LOAD_MORE_INCREMENT, items.length));
  };

  const visibleItems = items.slice(0, visibleCount);
  const canLoadMore = !loading && !error && visibleCount < items.length;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading &&
        Array.from({ length: INITIAL_VISIBLE }, (_, i) => (
          <div
            key={`skeleton-${i}`}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCardSkeleton />
          </div>
        ))}
      {error && (
        <div className="col-md-12 text-center py-4 text-danger">{error}</div>
      )}
      {!loading &&
        !error &&
        visibleItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftItemCard
              authorImage={item.authorImage}
              nftImage={item.nftImage}
              title={item.title}
              price={item.price}
              likes={item.likes}
              expiryDate={item.expiryDate}
              nftId={item.nftId}
              authorId={item.authorId}
            />
          </div>
        ))}
      {canLoadMore && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
