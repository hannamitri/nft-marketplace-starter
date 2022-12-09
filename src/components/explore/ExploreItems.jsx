import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Card from "../Card";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
  };

  async function filterItems(filter) {
    setLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setItems(data);
    setLoading(true);
  }

  useEffect(() => {
    getItems();
  }, []);

  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div
      key={index}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <Skeleton width="100%" height="400px" />
      </div>
    </div>
  ));

  return (
    <>
      <div>
        <select
          onChange={(e) => filterItems(e.target.value)}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length && loading
        ? items
            .slice(0, itemsCount)
            .map((item) => (
              <Card
                key={item.id}
                item={item}
                responsiveStyling={"col-lg-3 col-md-6 col-sm-6 col-xs-12"}
              />
            ))
        : skeletonLoading}
      <div className="col-md-12 text-center">
        {itemsCount !== 16 && (
          <Link
            onClick={() => setItemsCount(itemsCount + 4)}
            to=""
            id="loadmore"
            data-aos="fade-up"
            className="btn-main lead"
          >
            Load More
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
