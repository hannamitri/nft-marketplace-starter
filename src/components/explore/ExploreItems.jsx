import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemsCard from "../ItemCard";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState(""); // NEW: to track selected filter

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();
        setNfts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // 💡 Function to sort NFTs based on filter
  const getSortedNFTs = () => {
    let sorted = [...nfts]; // copy of nfts

    if (filter === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filter === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filter === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted.slice(0, visibleCount);
  };

  return (
    <>
      {/* 🔽 Dropdown Filter */}
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

      {loading ? (
        <p>Loading NFTs...</p>
      ) : (
        <div className="row">
          {getSortedNFTs().map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemsCard Itemcard={item} />
            </div>
          ))}
        </div>
      )}

      {!loading && visibleCount < nfts.length && (
        <div className="col-md-12 text-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
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
