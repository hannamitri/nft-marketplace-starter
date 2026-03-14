import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NftCard from "../UI/NftCard";
import axios from "axios";

const BASE_URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [sliceViz, setSliceViz] = useState(8);
  const [rank, setRank] = useState("");
  const [suffix, setSuffix] = useState("");

  //Axios BASE API call
  async function getExploreItems() {
    const response = await axios.get(BASE_URL + suffix);
    setExploreItems(response.data);
    console.log(response.data)
  }
  //Function for Load More button
  function loadMore() {
    sliceViz < 16 && setSliceViz(sliceViz + 4);
  }

  useEffect(() => {
    getExploreItems();
  }, [rank]);
  //Function for Select Option
  const handleRank = (event) => {
    setRank(event.target.value);
    setSuffix(`?filter=${event.target.value}`);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={rank} onChange={handleRank}>
          <option value="">All</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {exploreItems.length === 0
        ? new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <NftCard data={null} />
            </div>
          ))
        : exploreItems.slice(0, sliceViz).map((item) => (
            <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <NftCard data={item} />
            </div>
          ))}
      {sliceViz < 16 && (
        <div className="col-md-12 text-center" onClick={loadMore}>
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
