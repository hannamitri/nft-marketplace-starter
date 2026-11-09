import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./NewItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const pad = (n) => String(n).padStart(2, "0");

const formatRemaining = (ms) => {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}h ${pad(m)}m ${pad(s)}s`;
};

// Each timer ticks on its own, so only this small element re-renders
// every second, not the whole carousel.
const Countdown = ({ expiryDate }) => {
  const [remaining, setRemaining] = useState(() => expiryDate - Date.now());

  useEffect(() => {
    // Recompute from the clock each tick so the timer never drifts.
    const tick = () => setRemaining(expiryDate - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  // Items without an expiry date show no timer.
  if (!expiryDate) return null;

  return (
    <div className="de_countdown ni-countdown">
      {remaining > 0 ? formatRemaining(remaining) : "Ended"}
    </div>
  );
};

const SkeletonSlide = () => (
  <div className="keen-slider__slide">
    <div className="nft__item ni-skeleton">
      <div className="ni-skeleton__img" />
      <span className="ni-skeleton__line" />
      <span className="ni-skeleton__line ni-skeleton__line--short" />
    </div>
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1.15, spacing: 12 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 3, spacing: 16 } },
      "(min-width: 992px)": { slides: { perView: 4, spacing: 20 } },
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    instanceRef.current?.update();
  }, [loading, items, instanceRef]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {error ? (
          <p className="text-center ni-error">
            New items didn’t load. Refresh the page to try again.
          </p>
        ) : (
          <div className="ni-wrap" data-aos="fade-up" data-aos-delay="100">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? Array.from({ length: 4 }, (_, i) => <SkeletonSlide key={i} />)
                : items.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={`Author of ${item.title}`}
                              loading="lazy"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <Countdown expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                              loading="lazy"
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {!loading && (
              <>
                <button
                  type="button"
                  className="ni-arrow ni-arrow--prev"
                  aria-label="Previous items"
                  onClick={() => instanceRef.current?.prev()}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="ni-arrow ni-arrow--next"
                  aria-label="Next items"
                  onClick={() => instanceRef.current?.next()}
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;
