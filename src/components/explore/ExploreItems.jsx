import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewItemCard, NewItemsSkeleton, extractItems } from "../UI/NftCard";
import "./ExploreItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const FILTERS = ["price_low_to_high", "price_high_to_low", "likes_high_to_low"];
const PAGE_SIZE = 8;
const MAX_ITEMS = 16;

export default function ExploreItems() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const started = Date.now();
    setLoading(true);
    setError("");
    setItems([]);
    setVisibleCount(PAGE_SIZE);

    async function loadItems() {
      try {
        const response = await axios.get(API_URL, {
          params: FILTERS.includes(filter) ? { filter } : {},
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setItems(extractItems(response.data).slice(0, MAX_ITEMS));
        }
      } catch (err) {
        if (!controller.signal.aborted)
          setError("Unable to load NFTs. Please try again.");
      } finally {
        const remaining = Math.max(0, 2000 - (Date.now() - started));
        await new Promise((resolve) => setTimeout(resolve, remaining));
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadItems();
    return () => controller.abort();
  }, [filter]);

  return (
    <div className="explore-items col-12">
      <div className="explore-filter">
        <label htmlFor="filter-items">Sort by</label>
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

      {loading ? (
        <div className="explore-skeleton">
          <NewItemsSkeleton count={8} />
        </div>
      ) : error ? (
        <p role="alert" className="explore-message">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className="explore-message">No NFTs available.</p>
      ) : (
        <>
          <div className="explore-card-grid">
            {items.slice(0, visibleCount).map((item, index) => (
              <div
                className="explore-card-item"
                key={item.id ?? item.nftId ?? index}
              >
                <NewItemCard item={item} />
              </div>
            ))}
          </div>
          {visibleCount < items.length && (
            <div className="col-md-12 text-center explore-more-wrap">
              <button
                type="button"
                id="loadmore"
                className="btn-main lead"
                onClick={() =>
                  setVisibleCount((count) => Math.min(count + 4, items.length))
                }
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
