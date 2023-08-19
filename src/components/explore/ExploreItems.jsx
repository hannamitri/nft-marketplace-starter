import React from "react";
import ExploreCards from "../reusable-components/ExploreCards";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SkeletonLoading from "../reusable-components/SkeletonLoading";

const ExploreItems = () => {
  // Filter Options Data & Loading States
  const [exploreItemsUsersData, setExploreItemsUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData(filter) {
    setLoading(true);
    let apiUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    if (filter === "price_low_to_high") {
      apiUrl += "?filter=price_low_to_high";
    } else if (filter === "price_high_to_low") {
      apiUrl += "?filter=price_high_to_low";
    } else if (filter === "likes_high_to_low") {
      apiUrl += "?filter=likes_high_to_low";
    }

    const { data } = await axios.get(apiUrl);
    setExploreItemsUsersData(data);
    setLoading(false);
  }

  function filterCards(filter) {
    fetchData(filter);
  }

  // Upon click, load more items
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [showMoreItems2, setShowMoreItems2] = useState(false);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);

  const handleClick = () => {
    setShowMoreItems((current) => !current);
    setShowButton1(false);
    setShowButton2(true);
  };

  const handleClick2 = () => {
    setShowMoreItems2(true);
    setShowButton2(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="DEFAULT"
          onChange={(event) => filterCards(event.target.value)}
        >
          <option value="DEFAULT">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(16).fill(0).map((_, index) => <SkeletonLoading key={index} />)
      ) : (
        <ExploreCards usersData={exploreItemsUsersData.slice(0, 8)} />
      )}

      {showMoreItems && (
        <ExploreCards usersData={exploreItemsUsersData.slice(8, 12)} />
      )}

      {showMoreItems2 && (
        <ExploreCards usersData={exploreItemsUsersData.slice(12, 16)} />
      )}

      {showButton1 && (
        <div className="col-md-12 text-center">
          <a id="loadmore" className="btn-main lead" onClick={handleClick}>
            Load more
          </a>
        </div>
      )}

      {showButton2 && (
        <div className="col-md-12 text-center">
          <a id="loadmore" className="btn-main lead" onClick={handleClick2}>
            Load more
          </a>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
