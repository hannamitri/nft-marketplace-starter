/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../Card";
import { Skeleton } from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([])
  const [itemCount, setItemCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const exploreItem = async () => {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setItems(data);
  }

  const skeletonLoading = new Array(8).fill(0).map((_, index) => (
    <div
      key={index}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <Skeleton width="100%" height="350px" />
      </div>
    </div>
  ));

  async function filterItems(filter) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    exploreItem().then(() => {
      setLoading(false);
    }
    )
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""
          onChange={(e) => filterItems(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading ? items.slice(0, itemCount).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <Card item={item} />
        </div>
      )) : skeletonLoading
      }

      <div className="col-md-12 text-center" >
        {itemCount !== 16 &&
          <Link to="" id="loadmore" className="btn-main lead" onClick={() => setItemCount(itemCount + 4)}
            data-aos="fade-up">
            Load more
          </Link>
        }
      </div>
    </>
  );
};

export default ExploreItems;
