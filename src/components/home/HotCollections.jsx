import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [pv, setPv] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const setPerView = () => {
      const w = window.innerWidth;
      if (w <= 575.98) setPv(1);
      else if (w <= 767.98) setPv(2);
      else if (w <= 978) setPv(2);
      else if (w <= 1199.98) setPv(3);
      else setPv(4);
    };
    setPerView();
    window.addEventListener("resize", setPerView);
    return () => window.removeEventListener("resize", setPerView);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "precision",
    rubberband: false,
    slides: { perView: 4, spacing: 24 },
    breakpoints: {
      "(max-width: 1199.98px)": { slides: { perView: 3, spacing: 20 } },
      "(max-width: 978px)": { slides: { perView: 2, spacing: 18 } },
      "(max-width: 767.98px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 575.98px)": { slides: { perView: 1, spacing: 12 } },
    },
  });

  const coverH = pv >= 4 ? 240 : pv === 3 ? 260 : pv === 2 ? 300 : 340;
  const overlap = pv >= 4 ? -20 : pv === 3 ? -24 : pv === 2 ? -28 : -32;

  const skeletonCount = Math.max(4, pv);
  const data = loading ? new Array(skeletonCount).fill(null) : items;

  return (
    <section id="section-collections" className="no-bottom">
      <style>{`
        @keyframes hcShimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        .hc-skeleton { background: linear-gradient(90deg, #e9ecef 0%, #f8f9fa 40%, #e9ecef 80%); background-size: 200% 100%; animation: hcShimmer 1.2s linear infinite; }
        .hc-radius { border-radius: 8px; }
        .hc-round { border-radius: 50%; }
      `}</style>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-12 d-flex align-items-center">
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
              {data.map((it, i) => {
                const isSkeleton = !it;
                const title = (it && (it.name || it.title || it.collectionName)) || "Pinky Ocean";
                const cover = (it && (it.image || it.cover || it.banner || it.nftImage)) || nftImage;
                const avatar = (it && (it.authorImage || it.avatar || it.logo)) || AuthorImage;
                const chain = (it && (it.chain || it.symbol || it.standard || it.network)) || "ERC-192";
                return (
                  <div className="keen-slider__slide" key={i} style={{ minWidth: 0 }}>
                    <div className="nft_coll">
                      <div className="nft_wrap" style={{ borderRadius: 8, overflow: "hidden" }}>
                        {isSkeleton ? (
                          <div className="hc-skeleton hc-radius" style={{ width: "100%", height: coverH }} />
                        ) : (
                          <Link to="/item-details">
                            <img
                              src={cover}
                              className="lazy img-fluid"
                              alt={title}
                              style={{ width: "100%", height: coverH, objectFit: "cover", display: "block" }}
                              loading="lazy"
                            />
                          </Link>
                        )}
                      </div>
                      <div className="nft_coll_pp" style={{ marginTop: overlap }}>
                        {isSkeleton ? (
                          <div className="hc-skeleton hc-round" style={{ width: 60, height: 60, margin: "0 auto" }} />
                        ) : (
                          <Link to="/author">
                            <img className="lazy pp-coll" src={avatar} alt={title} />
                          </Link>
                        )}
                        {!isSkeleton && <i className="fa fa-check"></i>}
                      </div>
                      <div className="nft_coll_info">
                        {isSkeleton ? (
                          <>
                            <div className="hc-skeleton hc-radius" style={{ height: 18, width: "60%", marginBottom: 8 }} />
                            <div className="hc-skeleton hc-radius" style={{ height: 14, width: "40%" }} />
                          </>
                        ) : (
                          <>
                            <Link to="/explore">
                              <h4>{title}</h4>
                            </Link>
                            <span>{chain}</span>
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
      </div>
    </section>
  );
};

export default HotCollections;