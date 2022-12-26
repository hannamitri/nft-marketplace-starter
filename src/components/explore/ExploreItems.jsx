import axios from "axios";
import React, { useEffect, useState } from "react";
import Nft from "../home/Nft";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(8);

  function addition() {
    setIndex((prevIndex) => prevIndex + 4);
  }
  async function getData(filter) {
    setItems([]);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
        filter ? `?filter=${filter}` : ""
      }`
    );
    setItems(data);
    setLoading(true);
  }

  useEffect(() => {
    getData();
  }, []);

  const filter = (e) => {
    getData(e.target.value);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? items?.slice(0, index).map((data) => <Nft data={data} />)
        : new Array(8).fill(0).map((obj, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={"100%"} height={400} borderRadius={11} />
            </div>
          ))}

      {index !== 16 && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              addition();
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
