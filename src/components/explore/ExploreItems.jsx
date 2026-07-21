import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import CardSkeleton from "../UI/CardSkeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    fetchExploreItems();
  }, []);

  async function fetchExploreItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems(data);
    } catch (error) {
      console.error("There was an error fetching Explore Items", error);
    } finally {
      setLoading(false);
    }
  }

function loadMoreItems() {
  setVisibleItems((prevVisible)=> prevVisible + 4);
}

async function filterNfts(value) {
  setLoading(true);
  try {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    )
    setExploreItems(data);
  } catch(error){
    console.error("There was an error filtering Explore Items", error);
  }
  finally {
    setLoading(false);
  }
}

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterNfts(event.target.value)}>
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
        className="d-item col-lg-3 col-md-6 col-sm-6 col-12"
        style={{ display: "block" }}
      >
        <CardSkeleton />
      </div>
    ))
  : exploreItems.slice(0, visibleItems).map((item, index) => (
      <div
        key={item.nftId || index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-12"
        style={{ display: "block" }}
      >
        <Card {...item} />
      </div>
    ))}

      <div className="col-md-12 text-center">
        {visibleItems < exploreItems.length && (<button onClick={loadMoreItems} id="loadmore" className="btn-main lead">
          Load more
        </button>)}
      </div>
    </>
  );
};

export default ExploreItems;