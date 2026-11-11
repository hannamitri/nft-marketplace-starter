import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

// Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

// Custom Left Arrow Component
const PrevArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-prev custom-arrow"
    onClick={onClick}
    aria-label="Previous"
  >
    <i className="fa fa-chevron-left"></i>
  </button>
);

// Custom Right Arrow Component
const NextArrow = ({ onClick }) => (
  <button
    className="slick-arrow slick-next custom-arrow"
    onClick={onClick}
    aria-label="Next"
  >
    <i className="fa fa-chevron-right"></i>
  </button>
);

// Reusable Countdown Timer Component using requestAnimationFrame
const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const requestRef = useRef(null);

  useEffect(() => {
    const targetTime = expiryDate
      ? new Date(expiryDate).getTime()
      : Date.now() + 3600000 * 5;

    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
      requestRef.current = requestAnimationFrame(updateCountdown);
    };

    requestRef.current = requestAnimationFrame(updateCountdown);

    return () => cancelAnimationFrame(requestRef.current);
  }, [expiryDate]);

  const pad = (num) => String(num).padStart(2, "0");

  if (timeLeft.isExpired) {
    return <div className="de_countdown">EXPIRED</div>;
  }

  return (
    <div className="de_countdown">
      {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  // Carousel Configuration
  const settings = {
    dots: false,
    infinite: true, // Continuous loop
    speed: 500,
    slidesToShow: 4, // 4 cards at a time on desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile view
        settings: {
          slidesToShow: 1, // Single card view for mobile phone size
        },
      },
    ],
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

          <div className="col-lg-12">
            {loading ? (
              /* SKELETON LOADING STATE */
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                      </div>
                      <div
                        className="nft__item_wrap skeleton-box"
                        style={{
                          height: "200px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "8px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div className="nft__item_info">
                        <div
                          className="skeleton-box mb-2"
                          style={{
                            height: "18px",
                            width: "70%",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{
                            height: "14px",
                            width: "40%",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIVE CAROUSEL DATA */
              <Slider {...settings}>
                {items.map((item) => (
                  <div key={item.id} className="px-2">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator"
                        >
                          <img
                            className="lazy"
                            src={item.authorImage || AuthorImage}
                            alt="Author"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {/* Countdown Timer powered by requestAnimationFrame */}
                      <CountdownTimer expiryDate={item.expiryDate} />

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId || item.id}`}>
                          <img
                            src={item.nftImage || nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId || item.id}`}>
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
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
