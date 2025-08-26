import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const PROD_BASE = "https://nft-marketplacee.web.app";

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

function parseDeadlineFlexible(item) {
  const raw =
    item?.expiryDate ??
    item?.deadline ??
    item?.expiry ??
    item?.expiresAt ??
    item?.endTime ??
    item?.expiration ??
    item?.ending_in ??
    item?.end_at ??
    item?.end;

  if (raw == null) return null;

  if (typeof raw === "number" || /^\d+$/.test(String(raw))) {
    const n = Number(raw);
    if (n < 1e6) return new Date(Date.now() + n * 1000);
    if (n < 1e12) return new Date(n * 1000);
    return new Date(n);
  }

  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d;

  const matchH = /(\d+)\s*h/i.exec(raw);
  const matchM = /(\d+)\s*m/i.exec(raw);
  const matchS = /(\d+)\s*s/i.exec(raw);
  if (matchH || matchM || matchS) {
    const h = matchH ? Number(matchH[1]) : 0;
    const m = matchM ? Number(matchM[1]) : 0;
    const s = matchS ? Number(matchS[1]) : 0;
    const ms = (h * 3600 + m * 60 + s) * 1000;
    return new Date(Date.now() + ms);
  }

  return null;
}
function formatLeft(ms) {
  if (ms <= 0) return "Expired";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if (days > 0) return `${days}d ${hrs}h ${mins}m ${secs}s`;
  return `${hrs}h ${mins}m ${secs}s`;
}
function Countdown({ item }) {
  const target = parseDeadlineFlexible(item);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [item]);

  if (!target) return null;

  const left = target.getTime() - now;
  const text = formatLeft(left);

  return (
    <div
      className="de_countdown"
      style={{
        background: "#fff",
        border: "2px solid #8364e2",
        borderRadius: "30px",
        color: "#0d0c22",
        padding: "1px 10px",
        position: "absolute",
        top: "2px",
        right: "20px",
        zIndex: 100,
        fontSize: "16px",
        opacity: left <= 0 ? 0.6 : 1,
      }}
    >
      {text}
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

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("newItems fetch failed:", e);
      setItems([]);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  }

  useEffect(() => {
    fetchNewItems();
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

          <div
            className="slider-container"
            style={{ position: "relative", marginTop: 16, width: "100%" }}
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
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
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
                        <div
                          className="nft__item_wrap"
                          style={{ marginTop: 8 }}
                        >
                          <div
                            className="skeleton"
                            style={{
                              width: "100%",
                              height: 220,
                              borderRadius: 12,
                            }}
                          />
                        </div>
                        <div
                          className="nft__item_info"
                          style={{ marginTop: 12 }}
                        >
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
                            style={{
                              width: "40%",
                              height: 16,
                              borderRadius: 6,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item, idx) => (
                    <div key={item.id ?? item.nftId ?? idx} className="px-1">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <a
                            href={`${PROD_BASE}/author/${item.authorId}`}
                            title={`Creator: ${item.author || "Unknown"}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </a>
                        </div>

                        <div
                          className="nft__item_wrap"
                          style={{ position: "relative", marginTop: 8 }}
                        >
                          <Countdown item={item} />

                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="#" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="#" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="#">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <a href={`${PROD_BASE}/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title || ""}
                            />
                          </a>
                        </div>

                        <div className="nft__item_info">
                          <a href={`${PROD_BASE}/item-details/${item.nftId}`}>
                            <h4>{item.title || "Untitled"}</h4>
                          </a>
                          <div className="nft__item_price">
                            {item.price ? `${item.price} ETH` : "—"}
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes ?? 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>

            {!loading && items.length === 0 && (
              <div style={{ textAlign: "center", padding: 16, opacity: 0.7 }}>
                No new items available.
              </div>
            )}
          </div>
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

export default NewItems;
