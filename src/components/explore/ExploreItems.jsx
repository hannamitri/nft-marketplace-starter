import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import {
  getCreatorDisplayName,
  getCreatorRouteId,
} from "../../utils/authorProfiles";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const minSkeletonMs = 700;
    const start = Date.now();
    let timeoutId;

    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        setError("");
        setVisibleCount(8);

        const query = filter ? `?filter=${encodeURIComponent(filter)}` : "";

        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${query}`
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
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

        try {
          sessionStorage.setItem("explore-items-cache", JSON.stringify(normalizedItems));
        } catch (storageError) {
          console.warn("Unable to cache explore items", storageError);
        }

        setItems(normalizedItems);
      } catch (fetchError) {
        console.error("Failed to fetch explore items:", fetchError);
        setError("Unable to load explore items.");
        setItems([]);
      } finally {
        const elapsed = Date.now() - start;
        const remaining = minSkeletonMs - elapsed;
        if (remaining > 0) {
          timeoutId = setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      }
    };

    fetchExploreItems();

    return () => clearTimeout(timeoutId);
  }, [filter]);

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

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 4, items.length));
  };

  const persistItemDetails = (item, routeId) => {
    if (!routeId) {
      return;
    }

    try {
      sessionStorage.setItem(`nft-item-${routeId}`, JSON.stringify(item));
    } catch (storageError) {
      console.warn("Unable to persist NFT details in session storage", storageError);
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading &&
        new Array(4).fill(null).map((_, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
      {!loading && error && <div className="col-12">{error}</div>}
      {!loading && !error && visibleItems.length === 0 && (
        <div className="col-12">No explore items found.</div>
      )}

      {!loading &&
        !error &&
        visibleItems.map((item) => {
          const creatorRouteId = getCreatorRouteId(item);
          const creatorName = getCreatorDisplayName(item);
          const itemRouteId = item?.nftId || item?.id;
          const itemTitle = item?.title || "Untitled";
          const itemPrice = Number(item?.price || 0).toFixed(2);
          const itemLikes = item?.likes ?? 0;
          const authorImageSrc = item?.authorImage || AuthorImage;
          const nftImageSrc = item?.nftImage || nftImage;
          const authorLink = creatorRouteId ? `/author/${creatorRouteId}` : "/author";
          const detailsLink = itemRouteId ? `/item-details/${itemRouteId}` : "/item-details";

          return (
            <div
              key={item?.id || itemRouteId || `${creatorRouteId}-${itemTitle}`}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={authorLink} data-bs-toggle="tooltip" data-bs-placement="top" title={`Creator: ${creatorName}`}>
                    <img className="lazy" src={authorImageSrc} alt={creatorName} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">{formatCountdown(item?.expiryDate)}</div>

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
                  <Link to={detailsLink} state={{ item }} onClick={() => persistItemDetails(item, itemRouteId)}>
                    <img src={nftImageSrc} className="lazy nft__item_preview" alt={itemTitle} />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={detailsLink} state={{ item }} onClick={() => persistItemDetails(item, itemRouteId)}>
                    <h4>{itemTitle}</h4>
                  </Link>
                  <div className="nft__item_price">{itemPrice} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{itemLikes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {!loading && !error && hasMore && (
        <div className="col-md-12 text-center">
          <button id="loadmore" className="btn-main lead" onClick={handleLoadMore} type="button">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
