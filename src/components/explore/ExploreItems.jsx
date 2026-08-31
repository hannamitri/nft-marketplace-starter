import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/styles/Skeleton.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    async function fetchExploreItems() {
      try {
        setLoading(true);

        const response = await axios.get(API_URL);

        setItems(response.data);
      } catch (error) {
        console.error(
          "Error fetching explore items:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchExploreItems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];

    if (sortBy === "price-low") {
      return itemsCopy.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      return itemsCopy.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "most-liked") {
      return itemsCopy.sort(
        (a, b) =>
          Number(b.likes) - Number(a.likes)
      );
    }

    return itemsCopy;
  }, [items, sortBy]);

  const handleLoadMore = () => {
    setVisibleItems((currentVisible) =>
      Math.min(
        currentVisible + 4,
        items.length
      )
    );
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setVisibleItems(8);
  };

  const getCountdown = (expiryDate) => {
    if (!expiryDate) {
      return null;
    }

    const distance =
      Number(expiryDate) - now;

    if (distance <= 0) {
      return "Expired";
    }

    const hours = Math.floor(
      distance / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <>
        <div className="col-md-12">
          <div className="items_filter">
            <select
              id="filter-items"
              className="form-control"
              disabled
            >
              <option>Default</option>
            </select>
          </div>
        </div>

        {new Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{
                display: "block",
                backgroundSize: "cover",
              }}
            >
              <div className="new-item-skeleton">
                <div className="skeleton-card-top">
                  <div className="skeleton-author-circle skeleton-shimmer"></div>

                  <div className="skeleton-timer skeleton-shimmer"></div>
                </div>

                <div className="skeleton-nft-image skeleton-shimmer"></div>

                <div className="skeleton-card-bottom">
                  <div className="skeleton-title skeleton-shimmer"></div>

                  <div className="skeleton-bottom-row">
                    <div className="skeleton-price skeleton-shimmer"></div>

                    <div className="skeleton-likes skeleton-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <>
      <div className="col-md-12">
        <div className="items_filter">
          <select
            id="filter-items"
            className="form-control"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">
              Default
            </option>

            <option value="price-low">
              Price, Low to High
            </option>

            <option value="price-high">
              Price, High to Low
            </option>

            <option value="most-liked">
              Most liked
            </option>
          </select>
        </div>
      </div>

      {sortedItems
      .slice(0, visibleItems)
      .map((item) => {

        const countdown =
          getCountdown(item.expiryDate);

        return (
          <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{
                display: "block",
                backgroundSize: "cover",
              }}
            >
              <div className="nft__item explore-nft-item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${
                      item.title === "Teal Ocean"
                        ? 83937449
                        : item.authorId
                    }`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt=""
                    />

                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {countdown && (
                  <div className="de_countdown">
                    {countdown}
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>
                        Buy Now
                      </button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        <a
                          href="/"
                          onClick={(event) =>
                            event.preventDefault()
                          }
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a
                          href="/"
                          onClick={(event) =>
                            event.preventDefault()
                          }
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a
                          href="/"
                          onClick={(event) =>
                            event.preventDefault()
                          }
                        >
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/item-details/${item.id}`}
                  >
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link
                    to={`/item-details/${item.id}`}
                  >
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {item.price} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      {item.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
            type="button"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
