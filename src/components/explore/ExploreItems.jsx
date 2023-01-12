import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExploreItem from "../UI/ItemInfo";
import Skeleton from "../UI/Skeleton";

import Aos from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {
  Aos.init();

  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [splice, setSplice] = useState(8);
  const [userFilter, setUserFilter] = useState("");

  function loadMore() {
    if (splice < explore.length) {
      setSplice(splice + 4);
    } else {
      console.log("Max Loaded");
    }
  }

  async function getExplore() {
    setLoading(true);
    const { data } = userFilter
      ? await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${userFilter}`
        )
      : await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
    setExplore(data);
    setLoading(false);
  }

  function filter(e) {
    setUserFilter(e.target.value);
  }

  useEffect(() => {
    getExplore();
  }, [userFilter]);

  return (
    <>
      <div>
        <select
          onChange={(event) => filter(event)}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading
        ? explore
            .map((item) => (
              <ExploreItem
                key={item.id}
                authId={item.authorId}
                authImg={item.authorImage}
                expire={item.expiryDate}
                likes={item.likes}
                nftId={item.nftId}
                nftImg={item.nftImage}
                price={item.price}
                title={item.title}
                classN={"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
                styleA={{ display: "block", backgroundSize: "cover" }}
              />
            ))
            .splice(0, splice)
        : new Array(splice).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton
                width={"284px"}
                height={"422px"}
                borderRadius={"16px"}
              />
            </div>
          ))}
      <div className="col-md-12 text-center" onClick={loadMore}>
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
