import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import {
  getCreatorDisplayName,
  getCreatorRouteId,
} from "../../utils/authorProfiles";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const minSkeletonMs = 700;
    const start = Date.now();
    let timeoutId;

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        const normalizedItems = Array.isArray(data)
          ? data.map((item, index) => {
              const expiryDate = item?.expiryDate;
              if (expiryDate != null) {
                return item;
              }

              const fallbackMs = Date.now() + 5.5 * 3600 * 1000 + index * 300000;
              return {
                ...item,
                expiryDate: fallbackMs,
              };
            })
          : [];
        setItems(normalizedItems);
      })
      .catch((err) => {
        setError(err.message);
      })
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

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatCountdown = (expiryDate) => {
    const expiryMs = Number(expiryDate);
    if (!expiryDate || Number.isNaN(expiryMs)) {
      return "5h 30m 32s";
    }

    const diff = expiryMs - now;
    if (diff <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  };

  const itemsToShow = loading ? new Array(6).fill({}) : items.slice(0, 6);
  const visibleCount = 4;
  const itemCount = Math.max(itemsToShow.length, 1);
  const itemWidthPercent = 100 / visibleCount;
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const transitionMs = 500;

  const clonesBefore = itemsToShow.slice(-visibleCount);
  const clonesAfter = itemsToShow.slice(0, visibleCount);
  const carouselItems = [...clonesBefore, ...itemsToShow, ...clonesAfter];
  const initialIndex = visibleCount;

  const [currentStart, setCurrentStart] = useState(initialIndex);

  useEffect(() => {
    setCurrentStart(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

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
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="row">
            <div className="col-12 text-center mt-4">
              <p>Error loading new items: {error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className="row">
            {new Array(4).fill(null).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="de_countdown">--h --m --s</div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="260px" borderRadius="18px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="80%" height="24px" borderRadius="10px" />
                    <div className="nft__item_price">
                      <Skeleton width="60%" height="20px" borderRadius="10px" />
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>
                        <Skeleton width="24px" height="16px" borderRadius="10px" />
                      </span>
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
              aria-label="Previous items"
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
              aria-label="Next items"
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
                  const itemId = item?.nftId ?? item?.id;
                  const title = item?.title || item?.name || "Untitled";
                  const price = item?.price ?? item?.cost ?? "-";
                  const likes = item?.likes ?? item?.like ?? 0;
                  const creatorName = getCreatorDisplayName(item);
                  const creatorRouteId = getCreatorRouteId(item);
                  const authorProfilePath = creatorRouteId ? `/author/${creatorRouteId}` : null;
                  const authorSrc = item?.authorImage || item?.creatorImage || AuthorImage;
                  const nftSrc = item?.nftImage || item?.image || nftImage;
                  const toLink = itemId ? `/item-details/${itemId}` : "/item-details";
                  const countdownText = loading ? "--h --m --s" : formatCountdown(item?.expiryDate);

                  return (
                    <div
                      key={index}
                      style={{ flex: `0 0 ${itemWidthPercent}%`, maxWidth: `${itemWidthPercent}%` }}
                      className="px-2"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          {authorProfilePath ? (
                            <Link
                              to={authorProfilePath}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={`Creator: ${creatorName}`}
                            >
                              {loading ? (
                                <Skeleton width="60px" height="60px" borderRadius="50%" />
                              ) : (
                                <img className="lazy" src={authorSrc} alt={creatorName} />
                              )}
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <>
                              {loading ? (
                                <Skeleton width="60px" height="60px" borderRadius="50%" />
                              ) : (
                                <img className="lazy" src={authorSrc} alt={creatorName} />
                              )}
                              <i className="fa fa-check"></i>
                            </>
                          )}
                        </div>
                        <div className="de_countdown">{countdownText}</div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <button type="button" aria-label="Share on Facebook" style={{ background: "transparent", border: "none", padding: 0 }}>
                                  <i className="fa fa-facebook fa-lg"></i>
                                </button>
                                <button type="button" aria-label="Share on Twitter" style={{ background: "transparent", border: "none", padding: 0 }}>
                                  <i className="fa fa-twitter fa-lg"></i>
                                </button>
                                <button type="button" aria-label="Share by email" style={{ background: "transparent", border: "none", padding: 0 }}>
                                  <i className="fa fa-envelope fa-lg"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <Link to={toLink} state={{ item }}>
                            {loading ? (
                              <Skeleton width="100%" height="260px" borderRadius="18px" />
                            ) : (
                              <img src={nftSrc} className="lazy nft__item_preview" alt={title} />
                            )}
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={toLink} state={{ item }}>
                            {loading ? (
                              <Skeleton width="80%" height="24px" borderRadius="10px" />
                            ) : (
                              <h4>{title}</h4>
                            )}
                          </Link>
                          <div className="nft__item_price">
                            {loading ? (
                              <Skeleton width="60%" height="20px" borderRadius="10px" />
                            ) : (
                              `${price} ETH`
                            )}
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{loading ? <Skeleton width="24px" height="16px" borderRadius="10px" /> : likes}</span>
                          </div>
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

export default NewItems;
