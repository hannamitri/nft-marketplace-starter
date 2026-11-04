import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "../UI/Skeleton";
import "keen-slider/keen-slider.min.css";
import "./HotCollections.css";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollectionSkeleton = () => {
  return (
    <div className="hot-collections__skeleton-card" aria-hidden="true">
      <div className="hot-collections__skeleton-image">
        <Skeleton width="100%" height="100%" borderRadius="0" />
      </div>

      <div className="hot-collections__skeleton-avatar">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <div className="hot-collections__skeleton-info">
        <Skeleton width="65%" height="18px" borderRadius="4px" />
        <Skeleton width="35%" height="14px" borderRadius="4px" />
      </div>
    </div>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: {
          perView: 2,
          spacing: 18,
        },
      },
      "(min-width: 992px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
    },
    dragStarted: () => setDragging(true),
    dragEnded: () => setDragging(false),
  });

  useEffect(() => {
    let active = true;

    async function getHotCollections() {
      try {
        const { data } = await axios.get(HOT_COLLECTIONS_URL);

        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response");
        }

        if (active) {
          setCollections(data);
        }
      } catch (err) {
        console.error("Failed to load Hot Collections:", err);

        if (active) {
          setError("Couldn't load Hot Collections. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    getHotCollections();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && collections.length > 0) {
      instanceRef.current?.update();
    }
  }, [loading, collections, instanceRef]);

  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      loading ||
      collections.length < 2 ||
      hovered ||
      focused ||
      dragging ||
      reducedMotion
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      instanceRef.current?.next();
    }, 4000);

    return () => window.clearInterval(interval);
  }, [loading, collections.length, hovered, focused, dragging, instanceRef]);

  const canNavigate = !loading && !error && collections.length > 1;

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

          {error ? (
            <div className="col-12 text-center" role="alert">
              {error}
            </div>
          ) : !loading && collections.length === 0 ? (
            <div className="col-12 text-center">No collections found.</div>
          ) : (
            <div className="col-12">
              <div
                className="hot-collections__carousel"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocusCapture={() => setFocused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setFocused(false);
                  }
                }}
              >
                {loading ? (
                  <div
                    className="hot-collections__loading"
                    role="status"
                    aria-label="Loading Hot Collections"
                  >
                    {Array.from({ length: 4 }).map((_, index) => (
                      <HotCollectionSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div
                    ref={sliderRef}
                    className="keen-slider"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Hot Collections"
                    aria-live="off"
                  >
                    {collections.map((collection) => (
                      <div
                        className="keen-slider__slide hot-collections__slide"
                        key={collection.id ?? collection.nftId}
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${collection.nftId}`}>
                              <img
                                src={collection.nftImage}
                                className="lazy img-fluid"
                                alt={collection.title}
                                loading="lazy"
                              />
                            </Link>
                          </div>

                          <div className="nft_coll_pp">
                            <Link to="/author">
                              <img
                                src={collection.authorImage}
                                className="lazy pp-coll"
                                alt="Collection creator"
                                loading="lazy"
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>

                          <div className="nft_coll_info">
                            <Link to={`/item-details/${collection.nftId}`}>
                              <h4>{collection.title}</h4>
                            </Link>
                            <span>ERC-{collection.code}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(loading || canNavigate) && (
                  <>
                    <button
                      type="button"
                      className="hot-collections__arrow hot-collections__arrow--left"
                      aria-label="Previous collection"
                      disabled={!canNavigate}
                      onClick={() => instanceRef.current?.prev()}
                    >
                      <FaChevronLeft aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      className="hot-collections__arrow hot-collections__arrow--right"
                      aria-label="Next collection"
                      disabled={!canNavigate}
                      onClick={() => instanceRef.current?.next()}
                    >
                      <FaChevronRight aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
