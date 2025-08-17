import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ExploreSkeletonList } from "../UI/Skeleton";
import CountdownTimer from "../reused/CountdownTimer";
import NFTItem from "../reused/NFTItem";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("");

  const fetchExploreItems = async (filter = "") => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const baseUrl =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      const url = filter ? `${baseUrl}?filter=${filter}` : baseUrl;

      const response = await axios.get(url);

      setItems(response.data);
      setDisplayedItems(8);
      setHasMore(response.data.length > 8);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems(currentFilter);
  }, [currentFilter]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setCurrentFilter(selectedFilter);
  };

  const handleLoadMore = () => {
    const newDisplayedItems = displayedItems + 4;
    setDisplayedItems(newDisplayedItems);
    setHasMore(newDisplayedItems < items.length);
  };

  const itemsToShow = items.slice(0, displayedItems);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={currentFilter}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <ExploreSkeletonList />
      ) : (
        itemsToShow.map((item, index) => (
          <NFTItem
            key={item.id}
            item={item}
            data-aos="fade-in"
            data-aos-delay={index * 100}
          />
        ))
      )}
      {!loading && hasMore && (
        <div className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
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
