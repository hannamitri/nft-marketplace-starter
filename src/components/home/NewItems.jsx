import React, { useEffect, useRef, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const PER_VIEW = 4;

function ensureLoopable(list, minCount) {
  if (!Array.isArray(list) || list.length === 0) return [];
  const out = [...list];
  while (out.length < minCount) out.push(...list);
  return out.slice(0, Math.max(minCount, list.length));
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const draggingRef = useRef(false);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    rubberband: false,
    slides: { perView: PER_VIEW, spacing: 24 },
    breakpoints: {
      "(max-width: 1199.98px)": { slides: { perView: 3, spacing: 20 } },
      "(max-width: 978px)": { slides: { perView: 2, spacing: 18 } },
      "(max-width: 575.98px)": { slides: { perView: 1, spacing: 12 } },
    },
    created(s) {
      s.on("dragStarted", () => (draggingRef.current = true));
      s.on("dragEnded", () => (draggingRef.current = false));
      s.on("animationEnded", () => (draggingRef.current = false));
      requestAnimationFrame(() => s.update());
    },
  });

  const formatCountdown = (end) => {
    if (!end) return null;
    const t = typeof end === "number" ? end : Date.parse(end);
    if (Number.isNaN(t)) return null;
    const ms = Math.max(0, t - now);
    if (ms === 0) return "Ended";
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  const minForLoop = PER_VIEW * 3;
  const data = loading ? new Array(minForLoop).fill(null) : ensureLoopable(items, minForLoop);

  const handleNavigate = (e, it) => {
    if (draggingRef.current) {
      e.preventDefault();
      return;
    }
    if (it) {
      try {
        sessionStorage.setItem("nft:selectedItem", JSON.stringify(it));
      } catch {}
    }
  };

  return (
    <section id="section-items" className="no-bottom">
      <style>{`
        @keyframes hcShimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        .hc-skeleton { background: linear-gradient(90deg, #e9ecef 0%, #f8f9fa 40%, #e9ecef 80%); background-size: 200% 100%; animation: hcShimmer 1.2s linear infinite; }
        .hc-radius { border-radius: 8px; }
        .hc-round { border-radius: 50%; }
        .keen-slider { overflow: hidden; }
        /* Let Keen size slides; do NOT override .keen-slider__slide width */
      `}</style>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="slider-wrapper d-flex align-items-center" style={{ overflow: "hidden", width: "100%" }}>
          <button
            onClick={() => instanceRef.current?.prev()}
            aria-label="Previous"
            className="btn btn-outline-secondary rounded-circle me-2"
            style={{ width: 40, height: 40, padding: 0, lineHeight: "38px", textAlign: "center" }}
            disabled={loading}
          >
            ❮
          </button>

          <div ref={sliderRef} className="keen-slider" style={{ width: "100%" }}>
            {data.map((it, index) => {
              const isSkeleton = !it;
              const creator = it?.author || it?.creator || it?.authorName || "Unknown";
              const avatar = it?.authorImage || it?.avatar || AuthorImage;
              const preview = it?.nftImage || it?.image || nftImage;
              const title = it?.title || it?.name || "Pinky Ocean";
              const price = it?.price ? `${it.price} ETH` : "3.08 ETH";
              const likes = typeof it?.likes === "number" ? it.likes : 69;
              const countdown = it ? formatCountdown(it.expiryDate || it.endAt || it.deadline || it.ending || it.countdown) : null;
              const authorId = it?.authorId ?? it?.ownerId ?? null;
              const nftId = it?.nftId ?? null;

              return (
                <div className="keen-slider__slide" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      {isSkeleton ? (
                        <div className="hc-skeleton hc-round" style={{ width: 50, height: 50 }} />
                      ) : (
                        <Link
                          to={authorId ? `/author/${authorId}` : "/author"}
                          state={{ authorId, name: creator, avatar, lastItem: it }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${creator}`}
                          aria-label={`View ${creator}'s profile`}
                          onClick={(e) => handleNavigate(e, it)}
                        >
                          <img className="lazy" src={avatar} alt={creator} />
                          <i className="fa fa-check"></i>
                        </Link>
                      )}
                    </div>

                    {isSkeleton ? (
                      <div className="hc-skeleton hc-radius" style={{ height: 24, width: 120, marginBottom: 12 }} />
                    ) : countdown ? (
                      <div className="de_countdown">{countdown}</div>
                    ) : null}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button disabled={isSkeleton}>Buy Now</button>
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

                      {isSkeleton ? (
                        <div className="hc-skeleton hc-radius" style={{ width: "100%", height: 260 }} />
                      ) : (
                        <Link to={nftId ? `/item-details/${nftId}` : "/item-details"} onClick={(e) => handleNavigate(e, it)}>
                          <img src={preview} className="lazy nft__item_preview" alt={title} loading="lazy" />
                        </Link>
                      )}
                    </div>

                    <div className="nft__item_info">
                      {isSkeleton ? (
                        <>
                          <div className="hc-skeleton hc-radius" style={{ height: 18, width: "70%", marginBottom: 10 }} />
                          <div className="hc-skeleton hc-radius" style={{ height: 16, width: "40%", marginBottom: 10 }} />
                          <div className="hc-skeleton hc-radius" style={{ height: 16, width: 60 }} />
                        </>
                      ) : (
                        <>
                          <Link to={nftId ? `/item-details/${nftId}` : "/item-details"} onClick={(e) => handleNavigate(e, it)}>
                            <h4>{title}</h4>
                          </Link>
                          <div className="nft__item_price">{price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{likes}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => instanceRef.current?.next()}
            aria-label="Next"
            className="btn btn-outline-secondary rounded-circle ms-2"
            style={{ width: 40, height: 40, padding: 0, lineHeight: "38px", textAlign: "center" }}
            disabled={loading}
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;