import React, { useState, useEffect } from "react";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../NftCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const url = filter
  ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
  : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const response = await axios.get(url);
        setItems(response.data);
        setVisibleCount(8); // reset pagination on filter change
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [filter]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      {/* ── Filter dropdown ───────────────────────────────────────────────── */}
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most Liked</option>
        </select>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────────────── */}
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCardSkeleton />
            </div>
          ))
        : visibleItems.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard
                nftId={item.nftId}
                nftImage={item.nftImage}
                title={item.title}
                price={item.price}
                likes={item.likes}
                authorId={item.authorId}
                authorImage={item.authorImage}
                expiryDate={item.expiryDate}
              />
            </div>
          ))}

      {/* ── Load more ────────────────────────────────────────────────────── */}
      {!loading && hasMore && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
