import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",

    slides: {
      perView: 4,
      spacing: 20,
    },

    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },

      "(max-width: 575px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
  });

  // Fetch New Items API
  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch new items");
        }

        return response.json();
      })
      .then((data) => {
        console.log("New Items API:", data);

        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("New Items API Error:", error);
        setLoading(false);
      });
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update Keen Slider after API data loads
  useEffect(() => {
    if (!loading && items.length > 0) {
      slider.current?.update();
    }
  }, [loading, items, slider]);

  // Countdown
  const formatCountdown = (expiryDate) => {
    if (!expiryDate) {
      return "No expiration";
    }

    const difference = Number(expiryDate) - currentTime;

    if (difference <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(
      difference / 1000
    );

    const days = Math.floor(
      totalSeconds / 86400
    );

    const hours = Math.floor(
      (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          {/* TITLE */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* SKELETON LOADING */}
          {loading &&
            new Array(7).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={`skeleton-${index}`}
              >
                <div className="nft__item">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#e5e5e5",
                      marginBottom: "15px",
                      animation:
                        "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      background: "#e5e5e5",
                      borderRadius: "8px",
                      animation:
                        "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "65%",
                        height: "18px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "12px",
                        animation:
                          "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "35%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        animation:
                          "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "25%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        animation:
                          "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

          {/* KEEN SLIDER */}
          {!loading && (
            <div className="col-lg-12">
              <div
                ref={sliderRef}
                className="keen-slider"
              >
                {items.map((item) => (
                  <div
                    className="keen-slider__slide"
                    key={item.id}
                  >
                    <div className="nft__item">
                      {/* AUTHOR */}
                      <div className="author_list_pp">
                        <Link
                          to={
                            item.authorId
                              ? `/author/${item.authorId}`
                              : "/author"
                          }
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator"
                        >
                          <img
                            className="lazy"
                            src={
                              item.authorImage ||
                              AuthorImage
                            }
                            alt={
                              item.title ||
                              "Author"
                            }
                          />

                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {/* COUNTDOWN */}
                      <div className="de_countdown">
                        {formatCountdown(
                          item.expiryDate
                        )}
                      </div>

                      {/* NFT IMAGE */}
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>
                              Buy Now
                            </button>

                            <div className="nft__item_share">
                              <h4>Share</h4>

                              {/* Facebook */}
                              <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on Facebook"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>

                              {/* X / Twitter */}
                              <a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on X"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>

                              {/* Email */}
                              <a
                                href="mailto:?subject=Check out this NFT&body=Check out this NFT!"
                                aria-label="Share by email"
                              >
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={
                            item.nftId
                              ? `/item-details/${item.nftId}`
                              : "/item-details"
                          }
                        >
                          <img
                            src={
                              item.nftImage ||
                              nftImage
                            }
                            className="lazy nft__item_preview"
                            alt={
                              item.title ||
                              "NFT"
                            }
                          />
                        </Link>
                      </div>

                      {/* NFT INFORMATION */}
                      <div className="nft__item_info">
                        <Link
                          to={
                            item.nftId
                              ? `/item-details/${item.nftId}`
                              : "/item-details"
                          }
                        >
                          <h4>{item.title}</h4>
                        </Link>

                        <div className="nft__item_price">
                          {item.price || 0} ETH
                        </div>

                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>

                          <span>
                            {item.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NO ITEMS */}
          {!loading && items.length === 0 && (
            <div className="col-lg-12 text-center">
              <p>No new items found.</p>
            </div>
          )}
        </div>
      </div>

      {/* SKELETON ANIMATION */}
      <style>
        {`
          @keyframes newItemsSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default NewItems;