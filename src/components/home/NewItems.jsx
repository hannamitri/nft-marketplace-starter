import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/styles/NewItems.css";

const formatCountdown = (expiryDate, now) => {
  const remaining = Number(expiryDate) - now;

  if (!Number.isFinite(remaining) || remaining <= 0) {
    return "";
  }

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 15,
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    async function getNewItems() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Unexpected response from new items API");
        }

        setItems(response.data);
      } catch (fetchError) {
        console.error("Error fetching new items:", fetchError.message);
        setError("Unable to load new items.");
      } finally {
        setLoading(false);
      }
    }

    getNewItems();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      instanceRef.current?.update();
    }
  }, [items, instanceRef, loading]);

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

          <div
            className="new-items-carousel"
            aria-busy={loading}
            aria-live="polite"
          >
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? Array.from({ length: 4 }, (_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div
                        className="nft__item skeleton-box"
                        aria-hidden="true"
                      />
                    </div>
                  ))
                : items.map((item) => {
                    const itemUrl = `/item-details/${item.nftId}`;
                    const countdown = formatCountdown(item.expiryDate, now);

                    return (
                      <div
                        className="keen-slider__slide"
                        key={item.id}
                        style={{ overflow: "visible" }}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                            >
                              <img
                                className="lazy"
                                src={item.authorImage}
                                alt=""
                                loading="lazy"
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          {countdown && (
                            <div className="de_countdown">{countdown}</div>
                          )}

                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                      window.location.origin + itemUrl,
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Share on Facebook"
                                  >
                                    <i className="fa fa-facebook fa-lg"></i>
                                  </a>
                                  <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                      window.location.origin + itemUrl,
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Share on Twitter"
                                  >
                                    <i className="fa fa-twitter fa-lg"></i>
                                  </a>
                                  <a
                                    href={`mailto:?subject=${encodeURIComponent(
                                      item.title,
                                    )}&body=${encodeURIComponent(
                                      `Check out this item: ${
                                        window.location.origin + itemUrl
                                      }`,
                                    )}`}
                                    aria-label="Share by email"
                                  >
                                    <i className="fa fa-envelope fa-lg"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <Link to={itemUrl}>
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt={item.title}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link to={itemUrl}>
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
                    );
                  })}
            </div>

            {error && <p role="alert">{error}</p>}

            {!loading && !error && loaded && instanceRef.current && (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    instanceRef.current?.prev();
                  }}
                  className="arrow-btn arrow-btn--left"
                  aria-label="Previous item"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    instanceRef.current?.next();
                  }}
                  className="arrow-btn arrow-btn--right"
                  aria-label="Next item"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
