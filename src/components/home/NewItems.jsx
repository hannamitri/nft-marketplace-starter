import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const MIN_LOADING_MS = 800;

const arrowStyle = {
  position: "absolute",
  top: "40%",
  zIndex: 2,
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "none",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  cursor: "pointer",
  fontSize: "24px",
  lineHeight: "44px",
  padding: 0,
  textAlign: "center",
  color: "#000",
};

const PrevArrow = ({ onClick }) => (
  <button 
    type="button" 
    style={{ ...arrowStyle, left: "-22px" }} onClick={onClick}
    aria-label="Previous items"
  >
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button 
    type="button" 
    style={{ ...arrowStyle, right: "-22px" }} onClick={onClick}
    aria-label="Next items"
  >
    ›
  </button>
);

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const skeletonSliderSettings = {
  ...sliderSettings,
  infinite: false,
  arrows: false,
  swipe: false,
  draggable: false,
  touchMove: false,
  accessibility: false,
};

const SkeletonCards = ({ count = 4 }) => (
  <>
    <style>{`
      .ni-sk-card {
        pointer-events: none;
      }

      .ni-sk-card .ni-sk-avatar {
        width: 50px;
        height: 50px;
        border: 3px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .ni-sk-card .ni-sk-image {
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 8px;
      }

      .ni-sk-card .ni-sk-title {
        width: 65%;
        height: 18px;
        margin-bottom: 10px;
        border-radius: 4px;
      }

      .ni-sk-card .ni-sk-price {
        width: 35%;
        height: 14px;
        border-radius: 4px;
      }

      .ni-sk-card .ni-sk-like {
        width: 32px;
        height: 14px;
        border-radius: 4px;
      }

      .ni-sk-shimmer {
        background: linear-gradient(
          90deg,
          #e2e2e7 25%,
          #f5f5f8 50%,
          #e2e2e7 75%
        );
        background-size: 200% 100%;
        animation: ni-sk-shine 1.5s ease-in-out infinite;
      }

      @keyframes ni-sk-shine {
        from {
          background-position: -200% 0;
        }
        to {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ni-sk-shimmer {
          animation: none;
        }
      }
    `}</style>

    <div
      style={{ position: "relative", marginTop: 30 }}
      aria-hidden="true"
    >
      <Slider {...skeletonSliderSettings}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            <div
              className="nft__item ni-sk-card"
              style={{ margin: "0 6px" }}
            >
              <div className="author_list_pp">
                <div className="ni-sk-avatar ni-sk-shimmer" />
              </div>

              <div className="nft__item_wrap">
                <div className="ni-sk-image ni-sk-shimmer" />
              </div>

              <div className="nft__item_info">
                <div className="ni-sk-title ni-sk-shimmer" />

                <div className="nft__item_price">
                  <div className="ni-sk-price ni-sk-shimmer" />
                </div>

                <div className="nft__item_like">
                  <div className="ni-sk-like ni-sk-shimmer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </>
);

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!expiryDate) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  if (!expiryDate) return null;

  const diff = expiryDate - now;
  if (diff <= 0) {
    return <div className="de_countdown">EXPIRED</div>;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return <div className="de_countdown">{`${h}h ${m}m ${s}s`}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");

      try {
        const minDelay = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS)
        );

        const [{ data }] = await Promise.all([
          axios.get(NEW_ITEMS_URL),
          minDelay,
        ]);

        if (!cancelled) {
          setItems(data);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load new items:", err);

        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
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
            {status === "loading" && <SkeletonCards />}

            {status === "error" && (
              <p className="text-center">Couldn't load new items.</p>
            )}

            {status === "ready" && (
              <div style={{ position: "relative", marginTop: 30 }}>
                <Slider {...sliderSettings}>
                  {items.map((item) => (
                    <div key={item.id}>
                      <div className="nft__item" style={{ margin: "0 6px" }}>
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator"
                          >
                            <img className="lazy" src={item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <Countdown expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <Link to={`/item-details/${item.nftId}`}>
                                <button>Buy Now</button>
                              </Link>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
