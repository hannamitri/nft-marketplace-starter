// NewItems.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ---------- helpers ----------
function formatHMS(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}
function normalizeExpiryMs(v) {
  if (v == null) return NaN;
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v; // seconds → ms
  const t = Date.parse(v); // ISO string support
  return Number.isNaN(t) ? NaN : t;
}
const Countdown = ({ expiry }) => {
  const expiryMs = normalizeExpiryMs(expiry);
  const [remain, setRemain] = useState(
    Number.isFinite(expiryMs) ? Math.max(0, expiryMs - Date.now()) : 0
  );

  useEffect(() => {
    if (!Number.isFinite(expiryMs)) return;
    const tick = () => setRemain(Math.max(0, expiryMs - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiryMs]);

  if (!Number.isFinite(expiryMs) || remain <= 0) return null;
  return <div className="de_countdown">{formatHMS(remain)}</div>;
};

export default function NewItems() {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
          { signal: controller.signal }
        );
        setNewItems(Array.isArray(data) ? data : Object.values(data || {}));
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("New Items fetch failed:", e);
          setNewItems([]);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const slickSettings = useMemo(
    () => ({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      speed: 500,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 4 } },
        { breakpoint: 800,  settings: { slidesToShow: 3 } },
        { breakpoint: 400,  settings: { slidesToShow: 2 } },
        { breakpoint: 0,    settings: { slidesToShow: 1 } },
      ],
    }),
    []
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2" />
          </div>

          {loading ? (
            <div className="skeleton-box">
              {[...Array(4)].map((_, i) => (
                <div className="card" key={i}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div className="ske-avatar ske-shimmer" />
                      <div className="ske-badge ske-shimmer" />
                    </div>
                    <div className="nft__item_wrap">
                      <div className="ske-img ske-shimmer" />
                    </div>
                    <div className="nft__item_info">
                      <div className="ske-title ske-shimmer" />
                      <div className="ske-row">
                        <div className="ske-price ske-shimmer" />
                        <div className="ske-like">
                          <div className="ske-like-dot ske-shimmer" />
                          <div className="ske-like-bar ske-shimmer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...slickSettings}>
              {newItems.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    {/* avatar top-left */}
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.title}
                      >
                        <img className="lazy" src={item.authorImage} alt={item.title} />
                        <i className="fa fa-check" />
                      </Link>
                    </div>

                    {/* countdown top-right */}
                    <Countdown expiry={item.expiryDate} />

                    {/* image */}
                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    {/* info */}
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
