import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NFT from "../UI/NFT";
import axios from "axios";
import NFTSkeleton from "../UI/NFTSkeleton";

const ExploreItems = () => {
  const itemsPerPage = 4;
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    setDisplayedItems(displayedItems + itemsPerPage);
  };

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setLoading(false);
    setExplore(data);
  }

  async function filterItems(filter) {
    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setExplore(data);
    } else if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setExplore(data);
    } else if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setExplore(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading && explore.length > 0
        ? explore.slice(0, displayedItems).map((explore) => (
            <div
              key={explore.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFT data={explore} />
            </div>
          ))
        : new Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTSkeleton />
            </div>
          ))}

      {parseFloat(explore.length) === parseFloat(displayedItems) ? (
        <></>
      ) : (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
