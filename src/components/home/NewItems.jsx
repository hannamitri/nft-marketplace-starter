import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  className: "owl-theme",
  loop: true,
  margin: 30,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

const skeletonCarouselOptions = {
  ...carouselOptions,
  loop: false,
  nav: false,
  mouseDrag: false,
  touchDrag: false,
};

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

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!countdown) {
    return null;
  }

  return <div className="de_countdown">{countdown}</div>;
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        setNewItems(data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-lg-12" data-aos="fade-up">
              <OwlCarousel key="new-items-loading" {...skeletonCarouselOptions}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
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
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <div className="col-lg-12" data-aos="fade-up">
              <OwlCarousel key="new-items-loaded" {...carouselOptions}>
                {newItems.map((item) => (
                  <div className="nft__item" key={item.id}>
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
                          <button>Buy Now</button>
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
                              href="https://twitter.com/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href={`mailto:?subject=${item.title}`}>
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
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
