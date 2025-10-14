import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewItems } from "../../lib/api";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";

function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600); // total hours (can be > 24)
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

/* component shows a ticking pill */
function Countdown({ end }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!end) {
      setRemaining(0);
      return;
    }

    const update = () => setRemaining(end - Date.now());
    update(); 

    const id = setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) {
        setRemaining(0);
        clearInterval(id);
      } else {
        setRemaining(left);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [end]);

  if (!end) return null; // no pill if no expiry
  if (remaining <= 0) return <div className="de_countdown">Ended</div>;
  return <div className="de_countdown">{formatRemaining(remaining)}</div>;
}

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
    aria-label="Next"
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
    aria-label="Previous"
    onClick={onClick}
    className={className}
    style={{ ...arrowBtn, left: -22 }}
  >
    <ChevronLeft />
  </button>
);

// MAIN COMPONENT // 

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    accessibility: true,
    swipeToSlide: true,
  };

  useEffect(() => {
    const c = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchNewItems(c.signal);
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e?.name !== "AbortError") console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      c.abort();
    };
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          {/* header */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* content */}
          <div className="col-12">
            {loading ? (
              <Slider {...settings} className="new-items-slider">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`sk-${index}`} className="slide-gutter">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <span>
                          <div className="sk sk-avatar" />
                        </span>
                      </div>
                      <div className="nft__item_wrap">
                        <div className="sk sk-img" />
                      </div>

                      <div className="nft__item_info">
                        <div className="sk sk-title" />
                        <div className="sk sk-sub" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings} className="new-items-slider">
                {items.slice(0, 6).map((item, index) => {
                  const id = item?.id ?? index;
                  const authorId = item?.authorId;
                  const authorImg = item?.authorImage || AuthorImage;
                  const img = item?.nftImage || nftImage;
                  const nftId = item?.nftId ?? id;
                  const title = item?.title || "Untitled";
                  const price = item?.price != null ? `${item.price} ETH` : "";
                  const likes = item?.likes ?? 0;
                  const expires = item?.expiryDate;

                  return (
                    <div key={id} className="slide-gutter">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${authorId || ""}`}
                            title={`Creator: ${authorId || ""}`}
                          >
                            <img
                              className="lazy"
                              src={authorImg}
                              alt={title}
                              loading="lazy"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        {expires ? <Countdown end={expires} /> : null}

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${nftId}`}>
                            <img
                              src={img}
                              className="lazy nft__item_preview"
                              alt={title}
                              loading="lazy"
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${nftId}`}>
                            <h4>{title}</h4>
                          </Link>
                          <div className="nft__item_price">{price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{likes}</span>
                          </div>
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

export default NewItems;