import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItem from "../utility/NewItem";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [dataSlice, setDataSlice] = useState(8);
  let maxItems = exploreData.length;
  const increment = 4;

  async function getExploreData() {
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreData(data);
  }

  const show4MoreItems = () => {
    setDataSlice((dataSlice) => dataSlice + increment)
  };

  useEffect(() => {
    console.log(dataSlice);
  }, [dataSlice]);

  useEffect(() => {
    getExploreData();
  }, []);

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
      {exploreData.slice(0, dataSlice).map((exploreItem) => (
        <div
          key={exploreItem.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NewItem newItem={exploreItem} />
        </div>
      ))}
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
