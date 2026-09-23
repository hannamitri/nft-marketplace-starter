import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NextArrow = ({ onClick }) => {
  const timerRef = useRef(null);

  const startHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (onClick) onClick();
    }, 150);
  };

  const stopHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <button
      type="button"
      className="slick-arrow slick-next"
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      onClick={onClick}
    >
      <i className="fa fa-angle-right" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  const timerRef = useRef(null);

  const startHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (onClick) onClick();
    }, 150);
  };

  const stopHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <button
      type="button"
      className="slick-arrow slick-prev"
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      onClick={onClick}
    >
      <i className="fa fa-angle-left" />
    </button>
  );
};


const Countdown = React.memo(function Countdown({ end }) {
  const [timeLeft, setTimeLeft] = useState(() => calc(end));

  useEffect(() => {
    if (!end) return;

    setTimeLeft(calc(end));

    const interval = setInterval(() => {
      const remaining = calc(end);
      setTimeLeft(remaining);

      if (!remaining) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [end]);

  if (!end || !timeLeft) return null;

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
});

function calc(endTs) {
  if (!endTs) return null;

  const diff = endTs - Date.now();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}


const SkeletonCard = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <div className="skeleton-avatar" />
    </div>
    <div className="nft__item_wrap">
      <div className="skeleton-box" />
    </div>
    <div className="nft__item_info">
      <div className="skeleton-text title" />
      <div className="skeleton-text code" />
    </div>
  </div>
);


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const raw = await res.json();

        const mapped = raw.map((d) => {
          const itemId = d.nftId ?? d.id ?? d.itemId;

          let endsAt = null;
          if (d.expiryDate) {
            endsAt = d.expiryDate > Date.now() ? d.expiryDate : Date.now() + 10000000;
          }

          return {
            id: itemId,
            authorId: d.authorId,
            title: d.title,
            nftImage: d.nftImage,
            authorImage: d.authorImage,
            eth: d.price,
            likes: d.likes,
            endsAt: endsAt,
          };
        });


        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (isMounted) {
          setItems(mapped);
          setLoading(false);
        }
      } catch (err) {
        console.error("NewItems fetch error:", err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    arrows: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2" />
          </div>
        </div>

        {loading ? (
          <div className="row">
            {[0, 1, 2, 3].map((i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="slider-wrapper">
                <Slider key={items.length} {...settings}>
                  {items.map((it) => (
                    <div key={it.id}>
                      <div className="slide-item">
                        <div className="nft__item">
                          <div className="author_list_pp">
  <Link to={`/author/${it.authorId}`}>
    <img
      className="lazy"
      src={it.authorImage}
      alt=""
    />
    <i className="fa fa-check" />
  </Link>
</div>

                          {it.endsAt ? <Countdown end={it.endsAt} /> : null}

                          <div className="nft__item_wrap">
                            <Link to={`/item-details/${it.id}`}>
                              <img
                                src={it.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            </Link>
                          </div>

                          <div className="nft__item_info">
                            <Link to={`/item-details/${it.id}`}>
                              <h4>{it.title}</h4>
                            </Link>
                            <div className="nft__item_price">
                              {it.eth} ETH
                            </div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart" />
                              <span>{it.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;





