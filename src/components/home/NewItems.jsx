import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./NewItems.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(max-width: 992px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    }
    fetchNewItems();
  }, []);

  useEffect(() => {
    if (!loading && instanceRef.current) {
      instanceRef.current.update();
    }
  }, [loading, instanceRef]);

  const Countdown = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        const now = Date.now();
        const expiry = new Date(expiryDate).getTime();
        const diff = expiry - now;

        if (diff <= 0) {
          setTimeLeft("Expired");
          clearInterval(interval);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);

    return <div className="de_countdown">{timeLeft}</div>;
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
            <div className="nft_slider_wrapper">
              {/* Left Arrow */}
              <button
                className="slider_arrow slider_arrow--left"
                onClick={() => instanceRef.current?.prev()}
              >
                &#8592;
              </button>

              {/* Right Arrow */}
              <button
                className="slider_arrow slider_arrow--right"
                onClick={() => instanceRef.current?.next()}
              >
                &#8594;
              </button>

              {/* Slider */}
              <div className="nft_slider_clip">
                {loading ? (
                  <div ref={sliderRef} className="keen-slider">
                    {new Array(4).fill(0).map((_, index) => (
                      <div className="keen-slider__slide" key={index}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <div className="skeleton-box skeleton-avatar"></div>
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="skeleton-box skeleton-image"></div>
                          <div className="nft__item_info">
                            <div className="skeleton-box skeleton-title"></div>
                            <div className="skeleton-box skeleton-price"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div ref={sliderRef} className="keen-slider">
                    {newItems.map((item) => (
                      <div className="keen-slider__slide" key={item.id}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={`Creator: ${item.authorName || "Unknown"}`}
                            >
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt={item.authorName || "Author"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          {item.expiryDate && (
                            <Countdown expiryDate={item.expiryDate} />
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
                                alt={item.title}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;