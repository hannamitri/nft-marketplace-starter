import React, { useEffect, useRef, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const PER_VIEW = 4;
const SPACING = 24;

function ensureLoopable(list, minCount) {
  if (!Array.isArray(list) || list.length === 0) return [];
  const out = [...list];
  while (out.length < minCount) out.push(...list);
  return out.slice(0, Math.max(minCount, list.length));
}

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const draggingRef = useRef(false);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    rubberband: false,
    slides: { perView: PER_VIEW, spacing: SPACING },
    breakpoints: {
      "(max-width: 1199.98px)": { slides: { perView: 3, spacing: 20 } },
      "(max-width: 978px)": { slides: { perView: 2, spacing: 18 } },
      "(max-width: 575.98px)": { slides: { perView: 1, spacing: 12 } },
    },
    created(s) {
      s.on("dragStarted", () => (draggingRef.current = true));
      s.on("dragEnded", () => (draggingRef.current = false));
      s.on("animationEnded", () => (draggingRef.current = false));
      // ensure layout is recalculated when fonts/images load
      requestAnimationFrame(() => s.update());
    },
  });

  // Skeletons: ensure enough slides for loop
  const minForLoop = PER_VIEW * 3; // plenty to avoid edge gaps
  const data = loading
    ? new Array(minForLoop).fill(null)
    : ensureLoopable(items, minForLoop);

  const handleNavigate = (e) => {
    if (draggingRef.current) e.preventDefault();
  };

  return (
    <section id="section-collections" className="no-bottom">
      <style>{`
        @keyframes hcShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .hc-skel{background:linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%);background-size:200% 100%;animation:hcShimmer 1.2s linear infinite}
        .keen-slider{overflow:hidden}
        /* IMPORTANT: let Keen control widths, don't override .keen-slider__slide width */
      `}</style>

      <div className="container">
        <div className="row align-items-center mb-3">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center" style={{ overflow: "hidden", width: "100%" }}>
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
              const title = it?.title ?? "Pinky Ocean";
              const img = it?.nftImage ?? nftImage;
              const aimg = it?.authorImage ?? AuthorImage;
              const authorId = it?.authorId ?? "";
              const code = it?.code ?? 192;
              const nftId = it?.nftId ?? "";

              return (
                <div className="keen-slider__slide" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      {it ? (
                        <Link to={nftId ? `/item-details/${nftId}` : "/item-details"} onClick={handleNavigate}>
                          <img src={img} className="lazy img-fluid" alt={title} loading="lazy" />
                        </Link>
                      ) : (
                        <div className="hc-skel" style={{ width: "100%", paddingTop: "75%", borderRadius: 8 }} />
                      )}
                    </div>

                    <div className="nft_coll_pp">
                      {it ? (
                        <Link to={authorId ? `/author/${authorId}` : "/author"} onClick={handleNavigate}>
                          <img className="lazy pp-coll" src={aimg} alt={title} />
                        </Link>
                      ) : (
                        <div className="hc-skel" style={{ width: 60, height: 60, borderRadius: "50%" }} />
                      )}
                      {it && <i className="fa fa-check"></i>}
                    </div>

                    <div className="nft_coll_info">
                      {it ? (
                        <>
                          <Link to={nftId ? `/item-details/${nftId}` : "/item-details"} onClick={handleNavigate}>
                            <h4>{title}</h4>
                          </Link>
                          <span>{`ERC-${code}`}</span>
                        </>
                      ) : (
                        <>
                          <div className="hc-skel" style={{ height: 20, width: "70%", borderRadius: 6, marginBottom: 8 }} />
                          <div className="hc-skel" style={{ height: 14, width: "40%", borderRadius: 6 }} />
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

export default HotCollections;