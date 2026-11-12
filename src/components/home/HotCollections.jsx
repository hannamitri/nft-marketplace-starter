import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

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
    style={{ ...arrowStyle, left: "-22px" }}
    onClick={onClick}
    aria-label="Previous collections"
  >
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    style={{ ...arrowStyle, right: "-22px" }}
    onClick={onClick}
    aria-label="Next collections"
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
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
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
      .hc-sk-card {
        pointer-events: none;
      }

      .hc-sk-image {
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 8px 8px 0 0;
      }

      .hc-sk-card .hc-sk-avatar {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        border: 3px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .hc-sk-title {
        width: 55%;
        height: 18px;
        margin: 0 auto 10px;
        border-radius: 4px;
      }

      .hc-sk-sub {
        width: 30%;
        height: 12px;
        margin: 0 auto;
        border-radius: 4px;
      }

      .hc-sk-shimmer {
        background: linear-gradient(
          90deg,
          #e2e2e7 25%,
          #f5f5f8 50%,
          #e2e2e7 75%
        );
        background-size: 200% 100%;
        animation: hc-sk-shine 1.5s ease-in-out infinite;
      }

      @keyframes hc-sk-shine {
        from {
          background-position: -200% 0;
        }
        to {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hc-sk-shimmer {
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
              className="nft_coll hc-sk-card"
              style={{ margin: "0 6px" }}
            >
              <div className="nft_wrap">
                <div className="hc-sk-image hc-sk-shimmer" />
              </div>

              <div className="nft_coll_pp">
                <div className="hc-sk-avatar hc-sk-shimmer" />
              </div>

              <div className="nft_coll_info">
                <div className="hc-sk-title hc-sk-shimmer" />
                <div className="hc-sk-sub hc-sk-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
          axios.get(HOT_COLLECTIONS_URL),
          minDelay,
        ]);

        if (!cancelled) {
          setCollections(data);
          setStatus("ready");
          // Refresh AOS positions after slider DOM elements mount
          setTimeout(() => {
            AOS.refresh();
          }, 100);
        }
      } catch (err) {
        console.error("Failed to load hot collections:", err);

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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div
          className="row"
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-offset="150"
          data-aos-easing="ease-in-out"
        >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {status === "loading" && <SkeletonCards />}

            {status === "error" && (
              <p className="text-center">
                Couldn't load hot collections.
              </p>
            )}

            {status === "ready" && (
              <div style={{ position: "relative", marginTop: 30 }}>
                <Slider {...sliderSettings}>
                  {collections.map((item) => (
                    <div key={item.id}>
                      <div
                        className="nft_coll"
                        style={{ margin: "0 6px" }}
                      >
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt={item.title}
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
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

export default HotCollections;