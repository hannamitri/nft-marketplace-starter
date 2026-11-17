import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../UI/NFTCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchExploreItems = async (selectedFilter = "") => {
    setLoading(true);
    try {
      const url = selectedFilter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const response = await axios.get(url);
      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setItems(dataArray);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
    setVisibleCount(8);
    fetchExploreItems(selectedValue);
  };

  const loadMoreItems = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="row g-4">
      {/* Filter Dropdown Row */}
      <div className="col-12 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <select
            id="filter-items"
            value={filter}
            onChange={handleFilterChange}
            className="form-select shadow-sm border-light rounded-3 bg-white cursor-pointer"
            style={{ maxWidth: "220px" }}
          >
            <option value="">Default sorting</option>
            <option value="price_low_to_high">Price, low to high</option>
            <option value="price_high_to_low">Price, high to low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      {/* Items Grid / Skeleton Loader */}
      {loading
        ? [...Array(8)].map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card h-100 shadow-sm border-light rounded-4 p-3 d-flex flex-column justify-content-between">
                <Skeleton
                  width="100%"
                  height="200px"
                  borderRadius="rounded-4"
                />
                <div className="py-3 w-100">
                  <Skeleton width="75%" height="18px" className="mb-2" />
                  <Skeleton width="50%" height="14px" />
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleCount).map((item, index) => (
            <div
              key={item.id || index}
              className="col-lg-3 col-md-6 col-sm-6 col-12"
            >
              {/* Reusable Bootstrap NFT Card */}
              <NFTCard item={item} isCollection={false} />
            </div>
          ))}

      {/* Load More Button */}
      {!loading && visibleCount < items.length && (
        <div className="col-12 text-center mt-5">
          <button onClick={loadMoreItems} className="btn-main px-5 py-3 shadow">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreItems;