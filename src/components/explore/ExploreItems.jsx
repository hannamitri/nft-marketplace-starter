import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown.jsx";
import ItemSkeletons from "../UI/ItemSkeletons.jsx";

import axios from "axios";

const EXPLORE_COLS = Array(8).fill("col-lg-3 col-md-6 col-sm-6 col-xs-12");
const EXPLORE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [collections, setCollections] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(EXPLORE_URL, { params: { filter } })
      .then((response) => setCollections(response.data))
      .catch((err) => console.error(err));
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {collections.length === 0 ? (
        <ItemSkeletons cols={EXPLORE_COLS} />
      ) : (
        collections.slice(0, visibleCount).map((collection) => (
          <div
            key={collection.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${collection.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={collection.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {collection.expiryDate && <Countdown expiryDate={collection.expiryDate} />}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${collection.nftId}`}>
                  <img
                    src={collection.nftImage}
                    className="lazy nft__item_preview"
                    alt={collection.title}
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${collection.nftId}`}>
                  <h4>{collection.title}</h4>
                </Link>
                <div className="nft__item_price">{collection.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{collection.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {visibleCount < collections.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((current) => current + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
