import React, { useEffect, useMemo, useState } from "react";
import NftItemCard from "../common/NftItemCard";
import NftItemCardSkeleton from "../common/NftItemCardSkeleton";
import useExploreNfts from "../../hooks/useExploreNfts";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_INCREMENT = 4;

const exploreColumnClass =
  "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12";
const exploreColumnStyle = { display: "block", backgroundSize: "cover" };

const ExploreItems = ({ notice = "" }) => {
  const [filter, setFilter] = useState("");
  const { uniqueItems, loading, error } = useExploreNfts({ filter });
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setVisibleCount(
      uniqueItems.length > 0
        ? Math.min(INITIAL_VISIBLE_COUNT, uniqueItems.length)
        : INITIAL_VISIBLE_COUNT
    );
  }, [filter, uniqueItems]);

  const visibleItems = useMemo(
    () => uniqueItems.slice(0, visibleCount),
    [uniqueItems, visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + LOAD_MORE_INCREMENT, uniqueItems.length)
    );
  };

  const showLoadMore =
    !loading && !error && uniqueItems.length > visibleCount;

  return (
    <>
      {notice && (
        <div className="col-md-12 text-center mb-3">
          <p>{notice}</p>
        </div>
      )}
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading &&
        Array.from({ length: INITIAL_VISIBLE_COUNT }, (_, index) => (
          <NftItemCardSkeleton
            key={`explore-skeleton-${index}`}
            columnClassName={exploreColumnClass}
            style={exploreColumnStyle}
          />
        ))}
      {error && (
        <div className="col-md-12 text-center">
          <p>{error}</p>
        </div>
      )}
      {!loading &&
        !error &&
        visibleItems.map((item) => (
          <NftItemCard
            key={item.id ?? item.nftId}
            item={item}
            columnClassName={exploreColumnClass}
            columnStyle={exploreColumnStyle}
          />
        ))}
      {showLoadMore && (
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
