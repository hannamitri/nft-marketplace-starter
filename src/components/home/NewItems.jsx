import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const formatCountdown = (expiryDate, now) => {
  if (expiryDate == null) return null;

  const expiry = Number(expiryDate);
  if (!Number.isFinite(expiry)) return null;

  const secondsLeft = Math.max(0, Math.ceil((expiry - now) / 1000));
  if (secondsLeft === 0) return "Expired";

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return `${days ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    mode: "snap",
    loop: items.length > 1,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 4, spacing: 16 } },
    },
    slideChanged(instance) {
      setCurrentSlide(instance.track.details.rel);
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      try {
        const { data } = await axios.get(NEW_ITEMS_URL, {
          signal: controller.signal,
          timeout: 15000,
        });
        if (!Array.isArray(data)) throw new Error("Unexpected new items response");
        if (!controller.signal.aborted) setItems(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load new items. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchItems();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!items.some((item) => item.expiryDate != null)) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [items]);

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
          {loading && <p className="col-12" role="status">Loading new items...</p>}
          {error && <p className="col-12" role="alert">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="col-12">No new items available.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="col-12">
              <div className="new-items-carousel">
                <div ref={sliderRef} className="keen-slider new-items-slider" aria-label="New items carousel">
                  {items.map((item) => {
            const countdown = formatCountdown(item.expiryDate, now);

            return (
              <div className="keen-slider__slide" key={item.id}>
                <div className="nft_coll new-item-card">
                  {countdown && <div className="de_countdown" title="Time remaining">{countdown}</div>}
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/item-details/${item.id}`} title={`View ${item.title} details`}>
                      <img className="lazy pp-coll" src={item.authorImage} alt={`Creator of ${item.title}`} />
                    </Link>
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${item.id}`}><h4>{item.title}</h4></Link>
                    <div className="new-item-price">{Number(item.price).toFixed(2)} ETH</div>
                    <div className="new-item-like">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
                  })}
                </div>
                {items.length > 1 && (
                  <div className="new-items-controls">
                    <button type="button" aria-label="Previous new item" onClick={() => slider.current?.prev()}>&#8249;</button>
                    <button type="button" aria-label="Next new item" onClick={() => slider.current?.next()}>&#8250;</button>
                  </div>
                )}
              </div>
              {items.length > 1 && (
                <p className="new-items-position" aria-live="polite">
                  {currentSlide + 1} / {items.length}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
