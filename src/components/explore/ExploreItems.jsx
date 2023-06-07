import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItem from "../utility/NewItem";
import NewItemLoadingState from "../utility/NewItemLoadingState";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [dataSlice, setDataSlice] = useState(8);
  const [loading, isLoading] = useState();
  let maxItems = exploreData.length;
  const increment = 4;

  async function getExploreData() {
    isLoading(true);
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreData(data);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }

  const show4MoreItems = () => {
    setDataSlice((dataSlice) => dataSlice + increment);
  };

  const setFilterQuery = async (event) => {
    isLoading(true);
    let { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event.target.value}`
    );
    setExploreData(data);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }

  useEffect(() => {
    getExploreData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={setFilterQuery}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading
        ? exploreData.slice(0, dataSlice).map((exploreItem) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItem newItem={exploreItem} />
            </div>
          ))
        : new Array(exploreData.length)
            .fill(0)
            .map((_, index) => 
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              >
              <NewItemLoadingState/>
            </div>
            )}
      {dataSlice < maxItems && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={show4MoreItems}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
