
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

// Countdown component
const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
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
        days > 0
          ? `${days}d ${hours}h ${minutes}m ${seconds}s`
          : `${hours}h ${minutes}m ${seconds}s`
      );
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

// New Items component
const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 992px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
  });

  // Fetch API data
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Update slider when data loads
  useEffect(() => {
    slider.current?.update();
  }, [items, isLoading, slider]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">

          {/* Section heading */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Keen Slider */}
          <div ref={sliderRef} className="keen-slider">

            {/* Skeleton loading */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="keen-slider__slide"
                  key={index}
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

            {/* Actual NFT items */}
            {!isLoading &&
              items.map((item) => (
                <div
                  className="keen-slider__slide"
                  key={item.id}
                >
                  <div className="nft__item"
                  data-aos="fade-up">

                    {/* Author */}
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        title={`Creator: ${item.title}`}
                      >
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

                    {/* NFT image */}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>

                          <div className="nft__item_share">
                            <h4>Share</h4>

                            <a
                              href="#"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>

                            <a
                              href="#"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>

                            <a href="#">
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

                    {/* NFT information */}
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

          {/* Slider controls */}
          <div className="text-center mt-4">
            <button
              className="btn-main"
              onClick={() => slider.current?.prev()}
            >
              Previous
            </button>

            <button
              className="btn-main ml-2"
              onClick={() => slider.current?.next()}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewItems;

