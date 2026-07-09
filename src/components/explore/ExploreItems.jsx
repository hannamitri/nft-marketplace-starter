import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../Countdown";
import ItemCard from "../ItemCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  async function fetchExploreItems(filter = "") {
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
      filter ? `?filter=${filter}` : ""
    }`;

    const { data } = await axios.get(url);
    setExploreItems(data);
  }

    useEffect(() => {
      fetchExploreItems();
    }, []);

    useEffect(() => {
      fetchExploreItems(sortOption);
    }, [sortOption]);


  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const SkeletonCard = () => (
    <div className="nft__item skeleton">
      <div className="author_list_pp">
        <div className="skeleton-avatar"></div>
      </div>

      <div className="de_countdown">
        <div className="skeleton-countdown"></div>
      </div>

      <div className="nft__item_wrap">
        <div className="skeleton-img"></div>
      </div>

      <div className="nft__item_info">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-likes"></div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length === 0 ? (
        <div className="row">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col-6 col-md-3 mb-4">
              <SkeletonCard className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"/>
            </div>
          ))}
        </div>
      ) : (
        exploreItems.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <ItemCard {...item}/>
          </div>
        ))
      )}
      {visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center mt-4">
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
