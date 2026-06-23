import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const INITIAL_VISIBLE_ITEMS = 8;
  const LOAD_MORE_STEP = 4;

  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [selectedFilter, setSelectedFilter] = useState("default");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);

  useEffect(() => {
    async function getExploreItems() {
      try {
        setHasError(false);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        );
        setExploreItems(response.data);
      } catch (error) {
        console.error("Failed to load hot exploreItems:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getExploreItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const visibleExploreItems =
    isLoading || hasError
      ? new Array(INITIAL_VISIBLE_ITEMS).fill(null)
      : exploreItems;

  const sortedExploreItems = [...visibleExploreItems].sort((a, b) => {
    if (!a || !b) return 0;

    if (selectedFilter === "price_low_to_high") {
      return a.price - b.price;
    }

    if (selectedFilter === "price_high_to_low") {
      return b.price - a.price;
    }

    if (selectedFilter === "likes_high_to_low") {
      return b.likes - a.likes;
    }

    return 0;
  });

  const displayedExploreItems = sortedExploreItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < sortedExploreItems.length;

  const handleLoadMore = () => {
    if (hasMoreItems) {
      setVisibleCount((currentVisibleCount) =>
        Math.min(
          currentVisibleCount + LOAD_MORE_STEP,
          sortedExploreItems.length,
        ),
      );
      return;
    }

    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  };

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;

    const expiryMs = Number(expiryDate);
    if (Number.isNaN(expiryMs)) return null;

    const totalSeconds = Math.floor((expiryMs - currentTime) / 1000);

    if (totalSeconds <= 0) {
      return "EXPIRED";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div data-aos="fade-up">
        <select
          id="filter-items"
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {displayedExploreItems.map((exploreItem, index) => {
        const countdownText = exploreItem
          ? formatCountdown(exploreItem.expiryDate)
          : null;

        return (
          <div
            key={exploreItem?.id || index}
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            data-aos="fade-up"
          >
            <div className="nft__item" data-aos="fade-up">
              <div className="author_list_pp">
                {exploreItem ? (
                  <Link
                    to={`/author/${exploreItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator ID: ${exploreItem.authorId}`}
                  >
                    <img
                      className="lazy"
                      src={exploreItem.authorImage}
                      alt={exploreItem.title}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                ) : (
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                )}
              </div>
              {countdownText && (
                <div className="de_countdown">{countdownText}</div>
              )}

              {!exploreItem && (
                <div className="de_countdown">
                  <Skeleton width="70px" height="16px" borderRadius="12px" />
                </div>
              )}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  {/* keep your buttons/share here */}
                </div>

                {exploreItem ? (
                  <Link to={`/item-details/${exploreItem.nftId}`}>
                    <img
                      src={exploreItem.nftImage}
                      className="lazy nft__item_preview"
                      alt={exploreItem.title}
                    />
                  </Link>
                ) : (
                  <Skeleton width="100%" height="230px" borderRadius="8px" />
                )}
              </div>
              <div className="nft__item_info">
                {exploreItem ? (
                  <>
                    <Link to={`/item-details/${exploreItem.nftId}`}>
                      <h4>{exploreItem.title}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {exploreItem.price} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{exploreItem.likes}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton width="55%" height="18px" borderRadius="4px" />
                    <div style={{ marginTop: "10px" }}>
                      <Skeleton width="35%" height="16px" borderRadius="4px" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {!hasError && sortedExploreItems.length > INITIAL_VISIBLE_ITEMS && (
        <div className="col-md-12 text-center" data-aos="fade-up">
          <button
            id="loadmore"
            className="btn-main lead"
            type="button"
            onClick={handleLoadMore}
          >
            {hasMoreItems ? "Load more" : "Show less"}
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
