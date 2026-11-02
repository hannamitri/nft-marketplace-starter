import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NFTItemCard from "../UI/NFTItemCard";
import NFTItemSkeleton from "../UI/NFTItemSkeleton";

const exploreItemsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const exploreItemsUrlFilter =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch items based on whether a filter value is provided
  async function getExploreItems(filterValue = "") {
    setLoading(true);
    try {
      const url = filterValue
        ? `${exploreItemsUrlFilter}${filterValue}`
        : exploreItemsUrl;
      const { data } = await axios.get(url);
      setExploreItems(data);
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getExploreItems();
  }, []);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setVisibleCount(8);
    getExploreItems(selectedFilter);
  };

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
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

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTItemSkeleton />
            </div>
          ))
        : exploreItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTItemCard item={item} />
            </div>
          ))}

      {!loading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(event) => {
              event.preventDefault();
              loadMoreItems();
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
