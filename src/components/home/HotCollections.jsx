import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow next"
        style={arrowStyle("right")}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }
  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow prev"
        style={arrowStyle("left")}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }
  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "-25px",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("hotCollections fetch failed:", e);
        setCollections([]);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    })();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <div
          className="slider-container"
          style={{ position: "relative", marginTop: 16 }}
        >
          <Slider {...sliderSettings}>
            {loading
              ? new Array(4).fill(0).map((_, idx) => (
                  <div key={`skeleton-${idx}`} className="px-1">
                    <div className="nft_coll" style={{ textAlign: "center" }}>
                      <div className="nft_wrap">
                        <div
                          className="skeleton"
                          style={{
                            width: "100%",
                            height: 220,
                            borderRadius: 12,
                          }}
                        />
                      </div>
                      <div style={{ height: 30 }} />
                      <div
                        className="skeleton"
                        style={{
                          width: 100,
                          height: 18,
                          borderRadius: 6,
                          margin: "12px auto",
                        }}
                      />
                      <div
                        className="skeleton"
                        style={{
                          width: 80,
                          height: 14,
                          borderRadius: 6,
                          margin: "6px auto",
                        }}
                      />
                    </div>
                  </div>
                ))
              : collections.map((item, idx) => (
                  <div key={item.id ?? item.nftId ?? idx} className="px-1">
                    <div
                      className="hc-card"
                      style={{
                        position: "relative",
                        textAlign: "center",
                        background: "#fff",
                        border: "1px solid #eee",
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
                      }}
                    >
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          alt={item.title || ""}
                          style={{
                            width: "100%",
                            height: 220,
                            objectFit: "cover",
                            display: "block",
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                          }}
                        />
                      </Link>

                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: 220 - 30,
                          transform: "translateX(-50%)",
                          zIndex: 5,
                        }}
                      >
                        <Link to={`/author?authorId=${item.authorId}`} title="Creator">
                          <img
                            src={item.authorImage || AuthorImage}
                            alt="author"
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              border: "4px solid #fff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              background: "#fff",
                            }}
                          />

                          <span
                            style={{
                              position: "absolute",
                              right: -2,
                              bottom: -2,
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#7C6CF1",
                              display: "grid",
                              placeItems: "center",
                              color: "#fff",
                              fontSize: 12,
                              border: "2px solid #fff",
                            }}
                          >
                            ✓
                          </span>
                        </Link>
                      </div>

                      <div style={{ padding: "44px 16px 20px" }}>
                        <Link
                          to={`/item-details?nftId=${item.nftId}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <h4 style={{ margin: 0, fontWeight: 700 }}>
                            {" "}
                            {item.title || item.name || "Untitled"}{" "}
                          </h4>
                        </Link>
                        <div style={{ marginTop: 6, color: "#6b7280" }}>
                          ERC-{item.code ?? "192"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .skeleton { position: relative; overflow: hidden; background: #e6e6e6; }
        .skeleton::after {
          content: ""; position: absolute; inset: 0; transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 1.25s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </section>
  );
};

export default HotCollections;
