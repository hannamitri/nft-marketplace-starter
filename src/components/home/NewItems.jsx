import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";

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

  // Fetch New Items
  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch New Items");
        }

        return response.json();
      })
      .then((data) => {
        console.log("New Items:", data);
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("New Items Error:", error);
        setLoading(false);
      });
  }, []);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format API expiryDate
  const formatCountdown = (expiryDate) => {
    const difference = expiryDate - currentTime;

    if (difference <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
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
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    background: "#e5e5e5",
                    borderRadius: "8px",
                    animation:
                      "newItemsSkeletonPulse 1.5s ease-in-out infinite",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    paddingTop: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      minWidth: "50px",
                      borderRadius: "50%",
                      background: "#e5e5e5",
                    }}
                  />

                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        width: "70%",
                        height: "18px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    />

                    <div
                      style={{
                        width: "40%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Keen Slider */}
        {!loading && items.length > 0 && (
          <div
            style={{
              position: "relative",
              padding: "0 50px",
            }}
          >
            {/* Previous Arrow */}
            <button
              type="button"
              onClick={() => slider.current?.prev()}
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa fa-chevron-left"></i>
            </button>

            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div
                  className="keen-slider__slide"
                  key={item.id}
                >
                  <div className="nft__item">
                    {/* Author */}
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator"
                      >
                        <img
                          className="lazy"
                          src={item.authorImage || AuthorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {/* Countdown */}
                    <div className="de_countdown">
                      {formatCountdown(item.expiryDate)}
                    </div>

                    {/* NFT Image */}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>

                          <div className="nft__item_share">
                            <h4>Share</h4>

                            <a
                              href=""
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>

                            <a
                              href=""
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>

                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
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

            {/* Next Arrow */}
            <button
              type="button"
              onClick={() => slider.current?.next()}
              style={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && items.length === 0 && (
          <div className="text-center">
            <p>No new items found.</p>
          </div>
        )}
      </div>

      {/* Skeleton Animation */}
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