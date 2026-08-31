import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Countdown({ expiryDate }) {
  const getTimeLeft = () => {
    const difference = Number(expiryDate) - Date.now();

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        console.log("Explore API:", response.data);

        setItems(response.data);
      })
      .catch((error) => {
        console.error("Explore API error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sortedItems = useMemo(() => {
    const sorted = [...items];

    if (sortBy === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted;
  }, [items, sortBy]);

  const handleLoadMore = () => {
    setVisibleItems((previous) => previous + 4);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="loading-dot"
              style={{ "--i": index }}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-md-12 explore-filter">
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="">Default</option>

          <option value="price_low_to_high">
            Price, Low to High
          </option>

          <option value="price_high_to_low">
            Price, High to Low
          </option>

          <option value="likes_high_to_low">
            Most liked
          </option>
        </select>
      </div>

      <div
  className="explore-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "30px 24px",
    width: "100%",
  }}
>
        {sortedItems
          .slice(0, visibleItems)
          .map((item) => (
            <div
              key={item.id}
              className="explore-card"
            >
              <div className="nft__item">

                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt="Author"
                    />

                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <Countdown expiryDate={item.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a href="/">
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

                  <div className="nft__item_price">
                    {item.price} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
      </div>

      {visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            type="button"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}

export default ExploreItems;