import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingCard from "../UI/LoadingCard";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);


  async function getItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    )
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
          <LoadingCard key={index} />
        ))
        : items.map((item) => (
          <NftCard key={item.id} nftItem={item} />
        ))
      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
