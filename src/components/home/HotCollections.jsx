import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const PROD_BASE = "https://nft-marketplacee.web.app";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
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
  }

  useEffect(() => {
    fetchHotCollections();
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
                    <div className="nft__item">
                      <div
                        className="author_list_pp"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          className="skeleton"
                          style={{ width: 40, height: 40, borderRadius: "50%" }}
                        />
                        <i className="fa fa-check" />
                      </div>

                      <div
                        className="skeleton"
                        style={{
                          width: 120,
                          height: 18,
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      />
                      <div className="nft__item_wrap" style={{ marginTop: 8 }}>
                        <div
                          className="skeleton"
                          style={{
                            width: "100%",
                            height: 220,
                            borderRadius: 12,
                          }}
                        />
                      </div>
                      <div className="nft__item_info" style={{ marginTop: 12 }}>
                        <div
                          className="skeleton"
                          style={{
                            width: "60%",
                            height: 18,
                            borderRadius: 6,
                            marginBottom: 8,
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: "40%", height: 16, borderRadius: 6 }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((item, idx) => (
                  <div key={item.id ?? item.nftId ?? idx} className="px-1">
                    <div className="nft_coll" style={{ textAlign: "center" }}>
                      <div
                        className="nft_wrap"
                        style={{ position: "relative" }}
                      >
                        <a href={`${PROD_BASE}/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage || nftImage}
                            alt={item.title || ""}
                            className="lazy img-fluid"
                            style={{
                              width: "100%",
                              borderRadius: "12px",
                              display: "block",
                            }}
                          />
                        </a>

                        <div
                          className="nft_coll_pp"
                          style={{
                            position: "absolute",
                            top: "165px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 10,
                          }}
                        >
                          <a href={`${PROD_BASE}/author/${item.authorId}`}>
                            <img
                              src={item.authorImage || AuthorImage}
                              alt="author"
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                border: "3px solid #fff",
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </a>
                        </div>
                      </div>

                      <div
                        className="nft_coll_info"
                        style={{ marginTop: "40px" }}
                      >
                        <a href={`${PROD_BASE}/item-details/${item.nftId}`}>
                          <h4>{item.title || "Untitled"}</h4>
                        </a>
                        <span>ERC-{item.code ?? "192"}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>

          {!loading && collections.length === 0 && (
            <div style={{ textAlign: "center", padding: 16, opacity: 0.7 }}>
              No hot collections available.
            </div>
          )}
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

function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="custom-arrow next"
      style={{
        position: "absolute",
        top: "50%",
        right: "-25px",
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
      }}
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
      style={{
        position: "absolute",
        top: "50%",
        left: "-25px",
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
      }}
    >
      <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
    </div>
  );
}

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
    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default HotCollections;
