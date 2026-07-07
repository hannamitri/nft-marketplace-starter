import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import useExploreNfts from "../../hooks/useExploreNfts";
import NftItemCard from "../common/NftItemCard";
import NftItemCardSkeleton from "../common/NftItemCardSkeleton";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_INCREMENT = 4;

const ExploreItems = ({ notice = "" }) => {
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const { uniqueItems, loading, error } = useExploreNfts({ filter });

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

  const showLoadMore = !loading && !error && uniqueItems.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + LOAD_MORE_INCREMENT, uniqueItems.length)
    );
  };

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });
    return () => window.cancelAnimationFrame(id);
  }, [loading, error, visibleCount, visibleItems.length, filter]);

  return (
    <>
      {notice && (
        <div
          className="col-md-12 text-center mb-3"
          data-aos="fade-up"
          data-aos-duration="1100"
          data-aos-easing="ease-out"
        >
          <p>{notice}</p>
        </div>
      )}
      <div
        className="mb-4"
        data-aos="fade-up"
        data-aos-duration="1100"
        data-aos-easing="ease-out"
        data-aos-delay="80"
      >
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
        new Array(INITIAL_VISIBLE_COUNT).fill(0).map((_, index) => (
          <NftItemCardSkeleton key={`loading-${index}`} />
        ))}
      {error && (
        <div
          className="col-md-12 text-center"
          data-aos="fade-up"
          data-aos-duration="1100"
          data-aos-easing="ease-out"
        >
          <p>{error}</p>
        </div>
      )}
      {!loading &&
        !error &&
        visibleItems.map((item, index) => (
          <NftItemCard
            key={item.id ?? item.nftId ?? index}
            item={item}
            enableAos
            aosDelay={Math.min(index * 100, 700)}
          />
        ))}
      {showLoadMore && (
        <div
          className="col-md-12 text-center"
          data-aos="fade-up"
          data-aos-duration="1100"
          data-aos-easing="ease-out"
        >
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
