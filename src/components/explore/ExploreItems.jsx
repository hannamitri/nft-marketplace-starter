import React from "react";
import ExploreCards from "../reusable-components/ExploreCards";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SkeletonLoading from "../reusable-components/SkeletonLoading";

const ExploreItems = ({
  exploreItemsUsersData,
  setExploreItemsUsersData,
  newItemsLoading,
}) => {
  // Filter Options Data & Loading States
  const [lowToHighData, setLowToHighData] = useState([]);
  const [highToLowData, setHighToLowData] = useState([]);
  const [likesHighToLowData, setLikesHighToLowData] = useState([]);

  const [lowToHighLoading, setLowToHighLoading] = useState(true);
  const [highToLowLoading, setHighToLowLoading] = useState(true);
  const [likesHighToLowLoading, setLikesHighToLowLoading] = useState(true);

  async function lowToHighResponse() {
    setLowToHighLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`
    );
    setLowToHighData(data);
    setExploreItemsUsersData(lowToHighData);
    setLowToHighLoading(false);
  }

  async function highToLowResponse() {
    setHighToLowLoading(true);
    console.log("high to low");
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`
    );
    setHighToLowData(data);
    setExploreItemsUsersData(highToLowData);
    setHighToLowLoading(false);
  }

  async function likesHighToLowResponse() {
    setLikesHighToLowLoading(true);
    console.log("likes high to low");
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
    );
    setLikesHighToLowData(data);
    setExploreItemsUsersData(likesHighToLowData);
    setLikesHighToLowLoading(false);
  }

  function filterCards(filter) {
    if (filter === "price_low_to_high") {
      console.log("LowToHigh");
      lowToHighResponse();
    }

    if (filter === "price_high_to_low") {
      console.log("HighToLowData");
      highToLowResponse();
    }

    if (filter === "likes_high_to_low") {
      console.log("likesHighToLow");
      likesHighToLowResponse();
    }
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
    lowToHighResponse();
    highToLowResponse();
    likesHighToLowResponse();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="DEFAULT"
          onChange={(event) => filterCards(event.target.value)}
        >
          <option value="DEFAULT" disabled>
            Default
          </option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {newItemsLoading ||
      lowToHighLoading ||
      highToLowLoading ||
      likesHighToLowLoading ? (
        new Array(16)
          .fill(0)
          .map((_, index) => <SkeletonLoading index={index} />)
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
