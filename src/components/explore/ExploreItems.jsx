import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const formatCountdown = (expiryDate, now) => {
  if (!expiryDate) {
    return "No expiry";
  }

  const remainingMs = expiryDate - now;

  if (remainingMs <= 0) {
    return "Expired";
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const ExploreItems = ({ items, isLoading, error, now }) => {
  const [sortKey, setSortKey] = useState("");

  const sortedItems = useMemo(() => {
    const list = [...items];
    switch (sortKey) {
      case "price_low_to_high":
        return list.sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return list.sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return list.sort((a, b) => b.likes - a.likes);
      default:
        return list;
    }
  }, [items, sortKey]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading &&
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <Skeleton width="100%" height="230px" borderRadius="8px" />
              <div className="nft__item_info mt-2">
                <Skeleton width="70%" height="20px" borderRadius="6px" />
                <div className="mt-2">
                  <Skeleton width="40%" height="16px" borderRadius="6px" />
                </div>
              </div>
            </div>
          </div>
        ))}

      {!isLoading && error && <p>{error}</p>}

      {!isLoading && !error && items.length === 0 && (
        <p>No items to show right now.</p>
      )}

      {!isLoading &&
        !error &&
        sortedItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator ID: ${item.id}`}
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">
                {formatCountdown(item.expiryDate, now)}
              </div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button type="button">Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href="https://x.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="mailto:">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="col-md-12 text-center">
        <Link
          to="#"
          id="loadmore"
          className="btn-main lead"
          onClick={(e) => {
            e.preventDefault();
            // API returns a single page; pagination is not wired yet.
          }}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
