import axios from "axios";
import React, { useEffect, useState } from "react";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const INITIAL_ITEM_COUNT = 8;
const ITEMS_PER_LOAD = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEM_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchExploreItems = async () => {
      setLoading(true);
      setError("");
      setVisibleCount(INITIAL_ITEM_COUNT);

      try {
        const config = filter ? { params: { filter } } : {};
        const { data } = await axios.get(EXPLORE_URL, config);

        if (isCurrentRequest) {
          setItems(data);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          console.error("Unable to fetch explore items:", requestError);
          setItems([]);
          setError("Unable to load explore items. Please try again later.");
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    fetchExploreItems();

    return () => {
      isCurrentRequest = false;
    };
  }, [filter]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Sort explore items"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {error && (
        <div className="col-12 text-center" role="alert">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="col-12" role="status" aria-live="polite">
          <span className="sr-only">Loading explore items...</span>
          <div className="row">
            {Array.from({ length: INITIAL_ITEM_COUNT }, (_, index) => (
              <div
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <NftCardSkeleton showCountdown />
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading &&
        visibleItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCard item={item} />
          </div>
        ))}

      {!loading && hasMoreItems && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleCount((currentCount) =>
                Math.min(currentCount + ITEMS_PER_LOAD, items.length)
              )
            }
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
