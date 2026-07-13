import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const INITIAL_ITEM_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const formatCountdown = (expiryDate, now) => {
  if (!expiryDate) {
    return "";
  }

  const timeLeft = expiryDate - now;

  if (timeLeft <= 0) {
    return "Auction ended";
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());
  const countdown = formatCountdown(expiryDate, now);

  useEffect(() => {
    if (!expiryDate) {
      return;
    }

    const timer = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return countdown ? <div className="de_countdown">{countdown}</div> : null;
};

const ExploreItemSkeleton = () => (
  <div
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", backgroundSize: "cover" }}
  >
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <Skeleton width="110px" height="34px" borderRadius="3px" />
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="260px" borderRadius="8px" />
      </div>
      <div className="nft__item_info">
        <Skeleton width="70%" height="18px" />
        <Skeleton width="45%" height="14px" />
      </div>
    </div>
  </div>
);

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEM_COUNT);

  useEffect(() => {
    async function fetchExploreItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch explore items:", error);
        setError("Unable to load explore items right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchExploreItems();
  }, []);

  const sortedItems = useMemo(() => {
    const nextItems = [...items];

    if (sortBy === "price_low_to_high") {
      return nextItems.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price_high_to_low") {
      return nextItems.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "likes_high_to_low") {
      return nextItems.sort((a, b) => b.likes - a.likes);
    }

    return nextItems;
  }, [items, sortBy]);

  const visibleItems = sortedItems.slice(0, visibleCount);

  return (
    <>
      <div className="col-md-12">
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort explore items"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {error ? (
        <div className="col-md-12 text-center">
          <p>{error}</p>
        </div>
      ) : loading ? (
        Array.from({ length: INITIAL_ITEM_COUNT }, (_, index) => (
          <ExploreItemSkeleton key={index} />
        ))
      ) : (
        visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-up"
            data-aos-delay={(index % 4) * 50}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator: ${item.authorId}`}
                >
                  <img
                    className="lazy"
                    src={item.authorImage}
                    alt={`Creator ${item.authorId}`}
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <Countdown expiryDate={item.expiryDate} />

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
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          item.title
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href={`mailto:?subject=${encodeURIComponent(item.title)}`}>
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
        ))
      )}

      {!loading && !error && visibleCount < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleCount((count) => count + LOAD_MORE_COUNT)
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
