import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import {
  getCreatorDisplayName,
  getCreatorRouteId,
} from "../../utils/authorProfiles";



const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStart, setCurrentStart] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const minSkeletonMs = 700;
    const start = Date.now();
    let timeoutId;

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
        return res.json();
      })
      .then((data) => setCollections(data))
      .catch((err) => setError(err.message))
      .finally(() => {
        const elapsed = Date.now() - start;
        const remaining = minSkeletonMs - elapsed;
        if (remaining > 0) {
          timeoutId = setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const items = loading ? new Array(6).fill({}) : collections.slice(0, 6);
  const visibleCount = 4;
  const itemCount = Math.max(items.length, 1);
  const itemWidthPercent = 100 / visibleCount;
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const transitionMs = 500;

  const clonesBefore = items.slice(-visibleCount);
  const clonesAfter = items.slice(0, visibleCount);
  const carouselItems = [...clonesBefore, ...items, ...clonesAfter];
  const initialIndex = visibleCount;

  useEffect(() => {
    setCurrentStart(initialIndex);
  }, [initialIndex, itemCount]);

  const handlePrev = () => {
    if (isAnimating || disableTransition) return;
    setIsAnimating(true);
    setCurrentStart((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating || disableTransition) return;
    setIsAnimating(true);
    setCurrentStart((prev) => prev + 1);
  };

  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const onTouchMove = (e) => setTouchEndX(e.touches[0].clientX);

  const onTouchEnd = () => {
    if (touchStartX == null || touchEndX == null) {
      setTouchStartX(null);
      setTouchEndX(null);
      return;
    }
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };
  

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="text-center text-md-start">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 text-center text-md-end">
          </div>
        </div>

        {error ? (
          <div className="row">
            <div className="col-12 text-center mt-4">
              <p>Error loading hot collections: {error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className="row">
            {new Array(4).fill(null).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="200px" borderRadius="16px" />
                  </div>
                  <div className="nft_coll_pp" style={{ marginTop: "-30px", marginBottom: "10px" }}>
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="75%" height="20px" borderRadius="8px" />
                    <div className="mt-2">
                      <Skeleton width="50%" height="16px" borderRadius="8px" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="position-relative">
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={handlePrev}
              aria-label="Previous collections"
              onMouseEnter={() => setHoveredArrow("prev")}
              onMouseLeave={() => setHoveredArrow(null)}
              style={{
                position: "absolute",
                top: "50%",
                left: "-20px",
                transform: "translateY(-50%)",
                width: hoveredArrow === "prev" ? "48px" : "42px",
                height: hoveredArrow === "prev" ? "48px" : "42px",
                borderRadius: "50%",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                background: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                zIndex: 2,
                transition: "width 0.15s ease, height 0.15s ease, transform 0.15s ease",
              }}
            >
              <i className="fa fa-chevron-left" />
            </button>
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={handleNext}
              aria-label="Next collections"
              onMouseEnter={() => setHoveredArrow("next")}
              onMouseLeave={() => setHoveredArrow(null)}
              style={{
                position: "absolute",
                top: "50%",
                right: "-20px",
                transform: "translateY(-50%)",
                width: hoveredArrow === "next" ? "48px" : "42px",
                height: hoveredArrow === "next" ? "48px" : "42px",
                borderRadius: "50%",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                background: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                zIndex: 2,
                transition: "width 0.15s ease, height 0.15s ease, transform 0.15s ease",
              }}
            >
              <i className="fa fa-chevron-right" />
            </button>

            <div
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="d-flex"
                onTransitionEnd={() => {
                  if (currentStart >= visibleCount + itemCount) {
                    const target = currentStart - itemCount;
                    setDisableTransition(true);
                    setCurrentStart(target);
                    setTimeout(() => {
                      setDisableTransition(false);
                      setIsAnimating(false);
                    }, 30);
                  } else if (currentStart < visibleCount) {
                    const target = currentStart + itemCount;
                    setDisableTransition(true);
                    setCurrentStart(target);
                    setTimeout(() => {
                      setDisableTransition(false);
                      setIsAnimating(false);
                    }, 30);
                  } else {
                    setIsAnimating(false);
                  }
                }}
                style={{
                  willChange: "transform",           
                  transform: `translateX(-${currentStart * itemWidthPercent}%)`,
                  transition: disableTransition ? "none" : `transform ${transitionMs}ms cubic-bezier(0.2,0.8,0.2,1)`,
                }}
              >
                {carouselItems.map((item, index) => {
                  const nftSrc = item.nftImage || nftImage;
                  const authorSrc = item.authorImage || AuthorImage;
                  const title = item.title || "Loading...";
                  const code = item.code ? `ERC-${item.code}` : "ERC-000";
                  const itemId = item.nftId ?? item.id;
                  const creatorRouteId = getCreatorRouteId(item);
                  const authorProfilePath = creatorRouteId ? `/author/${creatorRouteId}` : null;
                  const creatorName = getCreatorDisplayName(item);

                  return (
                    <div
                      key={index}
                      style={{ flex: `0 0 ${itemWidthPercent}%`, maxWidth: `${itemWidthPercent}%` }}
                      className="px-2"
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                            <img src={nftSrc} className="lazy img-fluid" alt={title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp d-flex align-items-center">
                          {authorProfilePath ? (
                            <Link to={authorProfilePath}>
                              <img className="lazy pp-coll" src={authorSrc} alt={creatorName} />
                            </Link>
                          ) : (
                            <img className="lazy pp-coll" src={authorSrc} alt={creatorName} />
                          )}
                          <i className="fa fa-check" />
                        </div>
                        <div className="nft_coll_info">
                          <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                            <h4>{title}</h4>
                          </Link>
                          <span>{code}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
  
  
export default HotCollections;
