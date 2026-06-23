import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    async function getNewItems() {
      try {
        setHasError(false);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load new items:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const visibleItems = isLoading ? new Array(6).fill(null) : items;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
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

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;

    const expiryMs = Number(expiryDate);
    if (Number.isNaN(expiryMs)) return null;

    const totalSeconds = Math.floor((expiryMs - currentTime) / 1000);

    if (totalSeconds <= 0) {
      return "EXPIRED";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {hasError && (
              <p className="text-center">
                We couldn&apos;t load new items right now. Please try again
                later.
              </p>
            )}

            {!isLoading && !hasError && items.length === 0 && (
              <p className="text-center">
                No new items are available at the moment. Check back soon.
              </p>
            )}

            {!hasError && (isLoading || items.length > 0) && (
              <Slider {...settings}>
                {visibleItems.map((item, index) => {
                  const countdownText = item
                    ? formatCountdown(item.expiryDate)
                    : null;

                  return (
                    <div key={item?.id || index} className="px-2" data-aos="fade-up">
                      <div className="nft__item" data-aos="fade-up">
                        <div className="author_list_pp">
                          {item ? (
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={`Creator ID: ${item.authorId}`}
                            >
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt={item.title}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          )}
                        </div>
                        {countdownText && (
                          <div className="de_countdown">{countdownText}</div>
                        )}

                        {!item && (
                          <div className="de_countdown">
                            <Skeleton
                              width="70px"
                              height="16px"
                              borderRadius="12px"
                            />
                          </div>
                        )}

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            {/* keep your buttons/share here */}
                          </div>

                          {item ? (
                            <Link to={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt={item.title}
                              />
                            </Link>
                          ) : (
                            <Skeleton
                              width="100%"
                              height="230px"
                              borderRadius="8px"
                            />
                          )}
                        </div>
                        <div className="nft__item_info">
                          {item ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <Skeleton
                                width="55%"
                                height="18px"
                                borderRadius="4px"
                              />
                              <div style={{ marginTop: "10px" }}>
                                <Skeleton
                                  width="35%"
                                  height="16px"
                                  borderRadius="4px"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
