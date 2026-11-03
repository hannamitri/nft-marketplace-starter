import React, { useEffect, useState } from "react";
import ItemCard, { ItemCardSkeleton, validItem } from "../UI/ItemCard";
import useItemClock from "../UI/useItemClock";
import "./ExploreItems.css";

const EXPLORE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [visibleCount, setVisibleCount] = useState(8);
  const now = useItemClock(items);

  useEffect(() => {
    const controller = new AbortController();
    async function loadItems() {
      setStatus("loading");
      setItems([]);
      setVisibleCount(8);
      try {
        const url = filter ? `${EXPLORE_URL}?filter=${filter}` : EXPLORE_URL;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load explore items");
        const data = await response.json();
        // Fail closed: malformed responses show an error instead of invented card data.
        if (!Array.isArray(data) || !data.every(validItem)) throw new Error("Invalid explore items");
        if (!controller.signal.aborted) {
          setItems(data.slice(0, 16));
          setStatus("success");
        }
      } catch (error) {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    loadItems();
    return () => controller.abort();
  }, [filter]);

  return (
    <section className="explore-items" aria-label="Explore items">
      <div className="explore-items-filter">
        <label htmlFor="filter-items">Sort items</label>
        <select id="filter-items" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {status === "loading" && (
        <div role="status" aria-label="Loading explore items" aria-busy="true">
          <span className="explore-items-sr-only">Loading explore items…</span>
          <div className="explore-items-grid" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => <ItemCardSkeleton key={index} />)}
          </div>
        </div>
      )}
      {status === "error" && <p role="alert">Unable to load explore items. Please try again later.</p>}
      {status === "success" && items.length === 0 && <p role="status">No explore items available.</p>}
      {status === "success" && items.length > 0 && (
        <>
          <ul className="explore-items-grid" aria-label="Explore items">
            {items.slice(0, visibleCount).map((item) => (
              <li key={item.id}><ItemCard item={item} now={now} /></li>
            ))}
          </ul>
          {visibleCount < items.length && (
            <div className="text-center">
              <button type="button" id="loadmore" className="btn-main lead"
                onClick={() => setVisibleCount((count) => Math.min(count + 4, items.length))}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ExploreItems;
