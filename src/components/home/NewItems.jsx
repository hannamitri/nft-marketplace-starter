import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 2,
          spacing: 15,
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

  useEffect(() => {
    const fetchItems = async () => {
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

    fetchItems();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    const updateCountdowns = () => {
      const now = Date.now();

      const updatedTimes = {};

      items.forEach((item) => {
        const difference = item.expiryDate - now;

        if (difference <= 0) {
          updatedTimes[item.id] = "Expired";
          return;
        }

        const totalSeconds = Math.floor(difference / 1000);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (days > 0) {
          updatedTimes[item.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          updatedTimes[item.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeLeft(updatedTimes);
    };

    updateCountdowns();

    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [items]);

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

          {loading ? (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <div className="keen-slider skeleton-slider">
                  {new Array(4).fill(0).map((_, index) => (
                    <div
                      className="keen-slider__slide skeleton-slide"
                      key={index}
                    >
                      <div className="nft__item skeleton-nft-item">
                        <div className="skeleton skeleton-author"></div>

                        <div className="skeleton skeleton-countdown"></div>

                        <div className="skeleton skeleton-nft-image"></div>

                        <div className="skeleton-nft-info">
                          <div className="skeleton skeleton-nft-title"></div>
                          <div className="skeleton skeleton-nft-price"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <button
                  className="carousel-arrow carousel-arrow-left"
                  onClick={() => slider.current?.prev()}
                  aria-label="Previous item"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <div ref={sliderRef} className="keen-slider">
                  {items.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
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
                              src={item.authorImage || AuthorImage}
                              alt={item.title || "Creator"}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="de_countdown">
                          {timeLeft[item.id] || "Loading..."}
                        </div>

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

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title || "NFT"}
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

                <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={() => slider.current?.next()}
                  aria-label="Next item"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
