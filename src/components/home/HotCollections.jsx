import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CollectionCard = ({ collection }) => (
  <div className="keen-slider__slide hot-collections__slide">
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          <img
            src={collection.nftImage}
            className="lazy img-fluid"
            alt={collection.title}
          />
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to="/author">
          <img
            className="lazy pp-coll"
            src={collection.authorImage}
            alt={`${collection.title} creator`}
          />
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{collection.title}</h4>
        </Link>
        <span>ERC-{collection.code}</span>
      </div>
    </div>
  </div>
);

const CollectionSkeleton = () => (
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

const CarouselArrow = ({ direction, onClick }) => (
  <button
    className="hot-collections__arrow"
    type="button"
    aria-label={`${direction < 0 ? "Previous" : "Next"} collections`}
    onClick={() => onClick(direction)}
  >
    <i
      className={`fa fa-chevron-${direction < 0 ? "left" : "right"}`}
      aria-hidden="true"
    ></i>
  </button>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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

    const loadCollections = async () => {
      try {
        const response = await fetch(HOT_COLLECTIONS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Hot collections request failed (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Hot collections response was not a list");
        }

        setCollections(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Failed to load hot collections:", requestError);
          setError("Hot collections could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCollections();
    return () => controller.abort();
  }, []);

  const navigateCarousel = (direction) =>
    direction < 0
      ? slider.current?.prev()
      : slider.current?.next();

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading && (
            <div className="col-lg-12" role="status">
              <span className="visually-hidden">
                Loading hot collections...
              </span>
              <div className="row" aria-hidden="true">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4"
                    key={index}
                  >
                    <CollectionSkeleton />
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
          {collections.length > 0 && (
            <div className="col-lg-12">
              <div className="hot-collections__layout">
                <CarouselArrow direction={-1} onClick={navigateCarousel} />
                <div
                  className="keen-slider hot-collections__carousel"
                  ref={sliderRef}
                  aria-label="Hot collections"
                >
                  {collections.map((collection) => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                    />
                  ))}
                </div>
                <CarouselArrow direction={1} onClick={navigateCarousel} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
