import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const getTimeRemaining = (expiryDate) => {
  const total = new Date(expiryDate) - new Date();

  if (total <= 0) return "Expired";

  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("default");

  const API_MAP = {
    default: "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    price_low_to_high: "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high",
    price_high_to_low: "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low",
    likes_high_to_low: "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low",
  };

  useEffect(() => { 
    setLoading(true);

    const url = API_MAP[filter] || API_MAP.default;

    axios
      .get(url)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
        setVisibleCount(8);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [filter]);

  return (
    <>
      <div className="col-12">
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {(loading
        ? new Array(8).fill(0)
        : items.slice(0, visibleCount)
      ).map((item, index) => (
        <div
          key={index}
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            <div className="author_list_pp">
              {loading ? (
                <div className="skeleton-circle"></div>
              ) : (
                <Link to={`/author/${item.authorId}`}>
                  <img
                    className="lazy"
                    src={item.authorImage || AuthorImage}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              )}
            </div>

            <div className="de_countdown">
              {loading ? (
                <div className="skeleton-text small"></div>
              ) : (
                getTimeRemaining(item.expiryDate)
              )}
            </div>

            <div className="nft__item_wrap">
              {loading ? (
                <div className="skeleton-box"></div>
              ) : (
                <Link to={`/item-details/${item.nftId}`} state={item}>
                  <img
                    src={item.nftImage || nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              )}
            </div>

            <div className="nft__item_info">
              {loading ? (
                <>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text small"></div>
                </>
              ) : (
                <>
                  <Link to={`/item-details/${item.nftId}`} state={item}>
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {item.price} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {!loading && visibleCount < items.length && (
        <div className="col-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + 4, items.length)
              )
            }
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;