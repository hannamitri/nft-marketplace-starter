import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Counter from "../Counter";
import ItemSkeleton from "../UI/ItemSkeleton";
import ItemCard from "../ItemCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");
  const fetchExploreItems = async (filter) => {
    try {
      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const { data } = await axios.get(url);

      setTimeout(() => {
        setExploreItems(data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching explore items:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setLoading(true);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <ItemSkeleton key={i} />)
          : exploreItems
              .slice(0, visibleCount)
              .map((item, index) => <ItemCard item={item} />)}
      </div>
      {!loading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center mt-4">
          <button
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
