import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const apiUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
        },
      },
    },
  });

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const response = await axios.get(apiUrl);
        const { data } = response;

        setNewItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = newItems.reduce((acc, item) => {
        acc[item.nftId] = calculateTimeLeft(item.expiryDate);
        return acc;
      }, {});
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [newItems]);

  const calculateTimeLeft = (expiryDate) => {
    const difference = expiryDate - Date.now();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
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
        <div className="keen-slider-container position-relative">
          <button
            className="arrow arrow-left"
            onClick={() => instanceRef.current?.prev()}
          >
            &lt;
          </button>
          <div ref={sliderRef} className="keen-slider">
            {isLoading
              ? new Array(4).fill(0).map((_, index) => (
                  <div
                    className="keen-slider__slide col-lg-3 col-md-4 col-sm-6"
                    key={index}
                  >
                    <div className="nft__item skeleton__new-items">
                      <div className="author_list_pp skeleton-avatar__new-items"></div>
                      <div className="skeleton-countdown__new-items"></div>
                      <div className="nft__item_wrap">
                        <div className="skeleton-img__new-items"></div>
                      </div>
                      <div className="nft__item_info">
                        <div className="skeleton-text__new-items title"></div>
                        <div className="skeleton-text__new-items subtitle"></div>
                      </div>
                    </div>
                  </div>
                ))
              : newItems.map((item, index) => (
                  <div
                    className="keen-slider__slide col-lg-3 col-md-4 col-sm-6"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div className="de_countdown">
                          {countdowns[item.nftId]?.hours}h{" "}
                          {countdowns[item.nftId]?.minutes}m{" "}
                          {countdowns[item.nftId]?.seconds}s
                        </div>
                      )}

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
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
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
                ))}
          </div>
          <button
            className="arrow arrow-right"
            onClick={() => instanceRef.current?.next()}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
