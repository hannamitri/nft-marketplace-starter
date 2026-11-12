import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const COUNTDOWN_SECONDS = 5 * 60 * 60 + 30 * 60;

const NewItemCountdown = () => {
  const [expiresAt] = useState(() => Date.now() + COUNTDOWN_SECONDS * 1000);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const updateCountdown = () => {
      setSecondsLeft(Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [expiresAt]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <span className="de_countdown new-item__countdown" aria-live="off">
      {hours}:{minutes}:{seconds}
    </span>
  );
};

const NewItemCard = ({ item }) => (
  <div className="keen-slider__slide hot-collections__slide">
    <div className="nft_coll new-item__card">
      <div className="nft_wrap">
        <Link to={`/item-details/new/${item.id}`}>
          <img
            src={item.nftImage}
            className="lazy img-fluid new-item__image"
            alt={item.title}
          />
        </Link>
        <NewItemCountdown />
      </div>
      <div className="nft_coll_pp">
        <Link to="/author">
          <img
            className="lazy pp-coll"
            src={item.authorImage}
            alt={`${item.title} creator`}
          />
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info new-item__info">
        <Link to={`/item-details/new/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="new-item__stats">
          <span>{item.price} ETH</span>
          <span>
            <i className="fa fa-heart" aria-hidden="true"></i> {item.likes}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const NewItemSkeleton = () => (
  <div className="nft_coll hot-collections__skeleton">
    <Skeleton width="100%" height="220px" borderRadius="8px" />
    <div className="hot-collections__skeleton-author">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="hot-collections__skeleton-info">
      <Skeleton width="70%" height="20px" borderRadius="4px" />
      <Skeleton width="40%" height="14px" borderRadius="4px" />
    </div>
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 24 },
    breakpoints: {
      "(max-width: 991px)": { slides: { perView: 2, spacing: 24 } },
      "(max-width: 575px)": { slides: { perView: 1, spacing: 24 } },
    },
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        const response = await fetch(NEW_ITEMS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`New items request failed (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("New items response was not a list");
        }

        setItems(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Failed to load new items:", requestError);
          setError("New items could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadItems();
    return () => controller.abort();
  }, []);

  const navigateCarousel = (direction) =>
    direction < 0 ? slider.current?.prev() : slider.current?.next();

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
          {isLoading && (
            <div className="col-lg-12" role="status">
              <span className="visually-hidden">Loading new items...</span>
              <div className="row" aria-hidden="true">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4"
                    key={index}
                  >
                    <NewItemSkeleton />
                  </div>
                ))}
              </div>
            </div>
          )}
          {error && (
            <div className="col-lg-12 text-center" role="alert">
              {error}
            </div>
          )}
          {items.length > 0 && (
            <div className="col-lg-12">
              <div className="hot-collections__layout">
                <button
                  className="hot-collections__arrow"
                  type="button"
                  aria-label="Previous items"
                  onClick={() => navigateCarousel(-1)}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <div
                  className="keen-slider hot-collections__carousel"
                  ref={sliderRef}
                  aria-label="New items"
                >
                  {items.map((item) => (
                    <NewItemCard key={item.id} item={item} />
                  ))}
                </div>
                <button
                  className="hot-collections__arrow"
                  type="button"
                  aria-label="Next items"
                  onClick={() => navigateCarousel(1)}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
