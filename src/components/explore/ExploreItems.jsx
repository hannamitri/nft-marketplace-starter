import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExploreItems } from "../../services/exploreItems";

const INITIAL_ITEMS_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const formatCountdown = (expiryDate, now) => {
  const remaining = Number(expiryDate) - now;

  if (!Number.isFinite(remaining) || remaining <= 0) {
    return "";
  }

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError("");

    fetchExploreItems(sortBy)
      .then((data) => {
        if (isMounted) {
          setItems(data);
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching explore items:", fetchError.message);
        if (isMounted) {
          setError("Unable to load explore items.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [sortBy]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="row" aria-busy={loading} aria-live="polite">
      <div className="col-md-12">
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
            setVisibleCount(INITIAL_ITEMS_COUNT);
          }}
          aria-label="Sort items"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        Array.from({ length: INITIAL_ITEMS_COUNT }, (_, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            aria-hidden="true"
          >
            <div
              className="skeleton-box"
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        ))
      ) : error ? (
        <div className="col-md-12" role="alert">
          {error}
        </div>
      ) : (
        <>
          {visibleItems.map((item) => {
            const itemUrl = `/item-details/${item.nftId}`;
            const itemAbsoluteUrl = `${window.location.origin}${itemUrl}`;
            const countdown = formatCountdown(item.expiryDate, now);
            const authorUrl = `/author/${item.authorId}`;

            return (
              <div
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id}
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={authorUrl}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorId}`}
                    >
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt={`Creator ${item.authorId}`}
                        loading="lazy"
                      />
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </Link>
                  </div>
                  {countdown && (
                    <div className="de_countdown">{countdown}</div>
                  )}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button type="button">Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              itemAbsoluteUrl
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              itemAbsoluteUrl
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(
                              item.title
                            )}&body=${encodeURIComponent(
                              `Check out this item: ${itemAbsoluteUrl}`
                            )}`}
                            aria-label="Share by email"
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={itemUrl}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={itemUrl}>
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
            );
          })}
          {visibleItems.length < items.length && (
            <div className="col-md-12 text-center">
              <button
                type="button"
                id="loadmore"
                className="btn-main lead"
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(count + LOAD_MORE_COUNT, items.length)
                  )
                }
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExploreItems;
