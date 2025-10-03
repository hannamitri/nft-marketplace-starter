import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchHotCollections } from "../../lib/api";


const arrowBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  borderRadius: 9999,
  background: "#fff",
  border: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 5,
  cursor: "pointer",
  outline: "none",
};

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19L8 12l7-7"
      stroke="#232323"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 5l7 7-7 7"
      stroke="#232323"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NextArrow = ({ onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    style={{ ...arrowBtn, right: -22 }}
  >
    <ChevronRight />
  </button>
);
const PrevArrow = ({ onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={className}
    style={{ ...arrowBtn, left: -22 }}
  >
    <ChevronLeft />
  </button>
);

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const c = new AbortController();
    (async () => {
      try {
        const data = await fetchHotCollections(c.signal);
        setItems(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => c.abort();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-12">
            {loading ? (
              <Slider {...settings} className="hot-collections-slider">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`sk-${i}`} className="slide-gutter">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="sk sk-img" />
                      </div>

                      <div className="nft_coll_pp">
                        <div className="sk sk-avatar" />
                      </div>

                      <div className="nft_coll_info">
                        <div className="sk sk-title" />
                        <div className="sk sk-sub" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings} className="hot-collections-slider">
                {items.map((item, i) => {
                  const id = item?.id ?? i;
                  const img = item?.nftImage || item?.nft || item?.image;
                  const authorImg = item?.authorImage || item?.author?.avatar;
                  const title = item?.name || item?.title || "Untitled";
                  const token = item?.code || item?.token || "ERC-192";
                  return (
                    <div key={id} className="slide-gutter">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${id}`}>
                            <img
                              src={img}
                              className="lazy img-fluid"
                              alt={title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${item?.authorId || ""}`}>
                            <img
                              className="lazy pp-coll"
                              src={authorImg}
                              alt={title}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{title}</h4>
                          </Link>
                          <span>{token}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;