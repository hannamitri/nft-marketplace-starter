import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import { fetchNewItems } from "../../api/nftApi";
import "./NewItems.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const formatCountdown = (expiryDate, now) => {
  if (!expiryDate) {
    return "No expiry";
  }

  const remainingMs = expiryDate - now;

  if (remainingMs <= 0) {
    return "Expired";
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const NewItemsCarousel = ({ sliderSettings, children }) => {
  return (
    <div className="new-items-slider position-relative">
      <Slider {...sliderSettings}>{children}</Slider>
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchNewItems(controller.signal);
        setItems(data.slice(0, 7));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Unable to load new items right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    return () => {
      controller.abort();
    };
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
            {isLoading && (
              <NewItemsCarousel sliderSettings={sliderSettings}>
                {new Array(7).fill(0).map((_, index) => (
                  <div key={index} className="p-2">
                    <div className="nft__item">
                      <Skeleton width="100%" height="230px" borderRadius="8px" />
                      <div className="nft__item_info mt-2">
                        <Skeleton width="70%" height="20px" borderRadius="6px" />
                        <div className="mt-2">
                          <Skeleton width="40%" height="16px" borderRadius="6px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </NewItemsCarousel>
            )}

            {!isLoading && error && (
              <p>{error}</p>
            )}

            {!isLoading && !error && (
              <NewItemsCarousel sliderSettings={sliderSettings}>
                {items.map((item) => (
                  <div key={item.id} className="p-2">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator ID: ${item.id}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">
                        {formatCountdown(item.expiryDate, now)}
                      </div>

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
                                href="https://x.com/"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="mailto:">
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
                  </div>
                ))}
              </NewItemsCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;