import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../UI/NFTCard";
import Skeleton from "../UI/Skeleton";

function ExploreItems() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setvisible] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    

    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

    axios.get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  return (
    <>
      <div>
        <select id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
        {loading
          ? new Array(8).fill(0).map((_, index) => (
            <Skeleton key={index} />
          ))
          : data.slice(0, visible).map((item, index) => (
            <NFTCard key={index} item={item} />
          ))}
      </div>
        <div className="col-md-12 text-center">
        <button onClick={() => setvisible((prev) => prev + 4)} className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
}


export default ExploreItems;
