import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const ExploreItems = () => {
  const [exporeItems, setExporeItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  async function fetchExpore() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${
        filterValue || ""
      }`
    );
    setExporeItems(data);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchExpore();
  }, [filterValue]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  function filter(v) {
    setFilterValue(v);
  }

  return (
    <>
      <div>
        <select onChange={(event) => filter(event.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoaded
        ? exporeItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemCard item={item} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemCardSkeleton />
            </div>
          ))}
      <div className="col-md-12 text-center">
        {visibleCount < exporeItems.length && (
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
