import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [loading, setLoading] = useState(undefined);
  const [items, setItems] = useState([]);

  const [index, setIndex] = useState(8);
  function loadMore() {
    setIndex(index + 4);
  }

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  async function filterItems(filter) {
    setLoading(true);
    if (filter === "default") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data);
    } else if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setItems(data);
    } else if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setItems(data);
    } else if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setItems(data);
    }
    setLoading(false);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterItems(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading === true
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={"100%"} height={400} />
            </div>
          ))
        : items
            .slice(0, index)
            .map((item) => (
              <Card
                key={item.id}
                item={item}
                responsiveClass={" col-lg-3 col-md-6 col-sm-6 col-xs-12"}
              />
            ))}

      {index != 16 && (
        <div className="col-md-12 text-center">
          <button className="btn-main lead" onClick={() => loadMore()}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
