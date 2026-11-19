import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/new-items.css";
const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

// Convert expiry timestamps into milliseconds
const getExpiryTime = (expiryDate) => {
  if (
    expiryDate === null ||
    expiryDate === undefined ||
    expiryDate === ""
  ) {
    return null;
  }

  const timestamp = Number(expiryDate);

  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return null;
  }

  return timestamp < 100000000000
    ? timestamp * 1000
    : timestamp;
};

// Countdown Timer
const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const expiry = getExpiryTime(expiryDate);

  if (!expiry) {
    return null;
  }

  const remaining = Math.max(0, expiry - now);

  if (remaining === 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div className="de_countdown">
      {days > 0 && `${days}d `}
      {hours}h {minutes}m {seconds}s
    </div>
  );
};

// Skeleton Loading Card
const SkeletonCard = () => {
  return (
    <div className="new-items-slide">
      <div className="nft__item new-items-skeleton">
        <div className="new-items-skeleton-avatar"></div>
        <div className="new-items-skeleton-image"></div>
        <div className="new-items-skeleton-line"></div>
        <div className="new-items-skeleton-line short"></div>
      </div>
    </div>
  );
};

// Main New Items Component
const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        console.log("New Items API Response:", response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response");
        }

        if (active) {
          setItems(data);
        }
      } catch (err) {
        console.error("Error fetching New Items:", err);

        if (active) {
          setError("Unable to load New Items. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      active = false;
    };
  }, []);

  // Carousel Settings
  const sliderSettings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    adaptiveHeight: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">

        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">

              <h2>New Items</h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="row">
            {[1, 2, 3, 4].map((id) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={id}
              >
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center">
            <p>{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center">
            <p>No new items available.</p>
          </div>
        ) : (
          <div className="new-items-slider">
            <Slider {...sliderSettings}>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="new-items-slide"
                >
                  <div className="nft__item">

                    {/* Author Image */}
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        title="View Creator"
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt="NFT Creator"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {/* Live Countdown Timer */}
                    <Countdown expiryDate={item.expiryDate} />

                    {/* NFT Image */}
                    <div className="nft__item_wrap">

                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button type="button">
                            Buy Now
                          </button>
                        </div>
                      </div>

                      <Link
                        to={`/item-details/${item.nftId}`}
                      >
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title || "NFT"}
                        />
                      </Link>

                    </div>

                    {/* NFT Information */}
                    <div className="nft__item_info">

                      {/* NFT Title */}
                      <Link
                        to={`/item-details/${item.nftId}`}
                      >
                        <h4>{item.title}</h4>
                      </Link>

                      {/* NFT Price */}
                      <div className="nft__item_price">
                        {item.price} ETH
                      </div>

                      {/* NFT Likes */}
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </Slider>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewItems;