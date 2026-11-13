
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";


const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) {
      setTimeLeft("No expiration");
      return;
    }

    const calculateTime = () => {
      const difference = Number(expiryDate) - Date.now();

      if (difference <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${days > 0 ? days + "d " : ""}${hours}h ${minutes}m ${seconds}s`
      );
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};


const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);

  // Fetch NFT items
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Explore items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Refresh AOS after items load
  useEffect(() => {
    if (!isLoading) {
      AOS.refresh();
    }
  }, [items, isLoading]);

  // Sorting
  const sortedItems = [...items].sort((a, b) => {
    if (filter === "price_low_to_high") {
      return Number(a.price) - Number(b.price);
    }

    if (filter === "price_high_to_low") {
      return Number(b.price) - Number(a.price);
    }

    if (filter === "likes_high_to_low") {
      return Number(b.likes) - Number(a.likes);
    }

    return 0;
  });

  const displayedItems = sortedItems.slice(0, visibleItems);

  return (
    <>
      {/* Filter */}
      <div className="mb-4">
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleItems(8);
          }}
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

      {/* NFT Grid */}
      <div className="row">

        {/* Skeleton Loading */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <div className="nft__item skeleton-card">
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton skeleton-countdown"></div>
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          ))}

        {/* Actual NFT Items */}
        {!isLoading &&
          displayedItems.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="nft__item">

                {/* Author */}
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      className="lazy"
                      src={item.authorImage || AuthorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* Countdown */}
              <Countdown expiryDate={item.expiryDate} />

                {/* NFT Image */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>

                     
<div className="nft__item_share">
  <h4>Share</h4>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Facebook"
  >
    <i className="fa fa-facebook fa-lg"></i>
  </a>

  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Twitter"
  >
    <i className="fa fa-twitter fa-lg"></i>
  </a>

  <a
    href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(window.location.href)}`}
    aria-label="Share by email"
  >
    <i className="fa fa-envelope fa-lg"></i>
  </a>
</div>

                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                {/* NFT Information */}
                <div className="nft__item_info">
                  <Link to="/item-details">
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

      {/* Load More */}
      {!isLoading && visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleItems((previous) => previous + 8)
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
