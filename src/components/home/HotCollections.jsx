import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

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
  <button type="button" style={{ ...arrowStyle, left: "-22px" }} onClick={onClick}>
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button type="button" style={{ ...arrowStyle, right: "-22px" }} onClick={onClick}>
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

const SkeletonCards = ({ count = 4 }) => (
  <>
    <style>{`
      .hc-sk-row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -6px;
      }
      .hc-sk-item {
        flex: 0 0 25%;
        max-width: 25%;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .hc-sk-card {
        position: relative;
        margin-top: 30px;
        border: 1px solid #eee;
        border-radius: 8px;
        background: #fff;
      }
      .hc-sk-image {
        height: 200px;
        border-radius: 8px 8px 0 0;
      }
      .hc-sk-avatar {
        position: absolute;
        left: 50%;
        top: 200px;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid #fff;
      }
      .hc-sk-info {
        padding: 40px 16px 20px;
        text-align: center;
      }
      .hc-sk-title {
        height: 16px;
        width: 55%;
        margin: 0 auto 10px;
        border-radius: 4px;
      }
      .hc-sk-sub {
        height: 12px;
        width: 30%;
        margin: 0 auto;
        border-radius: 4px;
      }
      .hc-sk-shimmer {
        background: linear-gradient(90deg, #dcdce2 25%, #f0f0f4 50%, #dcdce2 75%);
        background-size: 300% 100%;
        animation: hc-sk-shine 1.2s linear infinite;
      }
      @keyframes hc-sk-shine {
        0% { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
      }
      @media (max-width: 1280px) {
        .hc-sk-item { flex-basis: 33.333%; max-width: 33.333%; }
      }
      @media (max-width: 768px) {
        .hc-sk-item { flex-basis: 50%; max-width: 50%; }
      }
      @media (max-width: 480px) {
        .hc-sk-item { flex-basis: 100%; max-width: 100%; }
      }
    `}</style>

    <div className="hc-sk-row">
      {Array.from({ length: count }).map((_, i) => {
        const delay = { animationDelay: `${i * 0.15}s` };
        return (
          <div className="hc-sk-item" key={i}>
            <div className="hc-sk-card">
              <div className="hc-sk-image hc-sk-shimmer" style={delay} />
              <div className="hc-sk-avatar hc-sk-shimmer" style={delay} />
              <div className="hc-sk-info">
                <div className="hc-sk-title hc-sk-shimmer" style={delay} />
                <div className="hc-sk-sub hc-sk-shimmer" style={delay} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await axios.get(HOT_COLLECTIONS_URL);
        if (!cancelled) {
          setCollections(data);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load hot collections:", err);
        if (!cancelled) setStatus("error");
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
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {status === "loading" && <SkeletonCards />}

            {status === "error" && (
              <p className="text-center">Couldn't load hot collections.</p>
            )}

            {status === "ready" && (
              <div style={{ position: "relative", marginTop: 30 }}>
                <Slider {...sliderSettings}>
                  {collections.map((item) => (
                    <div key={item.id}>
                      <div className="nft_coll" style={{ margin: "0 6px" }}>
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