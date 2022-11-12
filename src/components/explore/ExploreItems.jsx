import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import NFTcard from "../UI/NFTcard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExporeItems] = useState();
  const [loading, setLoading] = useState();
  const [loadIndex, setLoadIndex] = useState(8);

  function addToIndex() {
    setLoadIndex((prevIndex) => prevIndex + 4);
  }

  async function exploreData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExporeItems(data);
    setLoading(false);
    console.log(exploreItems);
  }

  useEffect(() => {
    exploreData();
  }, []);

  async function filterNFTS(filter) {
    setLoading(false)
    if (filter === "Sort") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExporeItems(data);
    }
    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setExporeItems(data);
    }
    if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setExporeItems(data);
    }
    if (filter === 'likes_high_to_low') {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setExporeItems(data);
    }
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="Default"
          onChange={(event) => filterNFTS(event.target.value)}
        >
          <option value="Default" disabled>
            Default
          </option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading
        ? exploreItems
            ?.slice(0, loadIndex)
            .map((data) => <NFTcard data={data} />)
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={335} height={420} borderRadius={12} />
            </div>
          ))}

      {loadIndex != 16 && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              addToIndex();
            }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
