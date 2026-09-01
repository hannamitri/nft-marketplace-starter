import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch explore items");
        }

        const data = await response.json();

        setItems(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const sortedItems = useMemo(() => {
    const sorted = [...items];

    if (filter === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (filter === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (filter === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted;
  }, [items, filter]);

  const displayedItems = sortedItems.slice(0, visibleItems);

  const handleLoadMore = () => {
    setVisibleItems((previous) => previous + 8);

    setTimeout(() => {
      AOS.refreshHard();
    }, 0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setVisibleItems(8);

    setTimeout(() => {
      AOS.refreshHard();
    }, 0);
  };

  if (loading) {
    return <ExploreSkeleton />;
  }

  if (error) {
    return (
      <div className="col-md-12 text-center">
        <h3>Unable to load items</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="col-md-12 text-center">
        <h3>No items found</h3>
        <p>There are currently no NFTs available to explore.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="col-md-12"
        data-aos="fade-down"
        data-aos-duration="650"
      >
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>

          <option value="price_low_to_high">
            Price, Low to High
          </option>

          <option value="price_high_to_low">
            Price, High to Low
          </option>

          <option value="likes_high_to_low">
            Most liked
          </option>
        </select>
      </div>

      {displayedItems.map((item, index) => (
        <ExploreItemCard
          key={item.id}
          item={item}
          index={index}
        />
      ))}

      {visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            type="button"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

const ExploreItemCard = ({ item, index }) => {
  const hasTimer = Boolean(item.expiryDate);

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!hasTimer) {
      return 0;
    }

    return Math.max(
      new Date(item.expiryDate).getTime() - Date.now(),
      0
    );
  });

  useEffect(() => {
    if (!hasTimer) {
      return;
    }

    const interval = setInterval(() => {
      const remaining =
        new Date(item.expiryDate).getTime() - Date.now();

      setTimeLeft(Math.max(remaining, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [item.expiryDate, hasTimer]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{
        display: "block",
        backgroundSize: "cover",
      }}
      data-aos="fade-up"
      data-aos-duration="650"
      data-aos-delay={(index % 4) * 100}
      data-aos-offset="100"
      data-aos-once="true"
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Creator: ${item.authorName || "Unknown"}`}
          >
            <img
              className="lazy"
              src={item.authorImage}
              alt={item.authorName || "NFT creator"}
            />

            <i className="fa fa-check"></i>
          </Link>
        </div>

        {hasTimer && timeLeft > 0 && (
          <div className="de_countdown">
            {formatTime(timeLeft)}
          </div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button type="button">
                Buy Now
              </button>

              <div className="nft__item_share">
                <h4>Share</h4>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share on Facebook"
                >
                  <i className="fa fa-facebook fa-lg"></i>
                </button>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share on Twitter"
                >
                  <i className="fa fa-twitter fa-lg"></i>
                </button>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share by email"
                >
                  <i className="fa fa-envelope fa-lg"></i>
                </button>
              </div>
            </div>
          </div>

          <Link to="/item-details">
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt={item.title}
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExploreSkeleton = () => {
  return (
    <>
      <div className="col-md-12">
        <div
          className="skeleton"
          style={{
            width: "180px",
            maxWidth: "100%",
            height: "40px",
            marginBottom: "30px",
          }}
        ></div>
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <ExploreSkeletonCard key={index} />
      ))}
    </>
  );
};

const ExploreSkeletonCard = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div
          className="skeleton"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginBottom: "15px",
          }}
        ></div>

        <div
          className="skeleton"
          style={{
            width: "100%",
            height: "250px",
            marginBottom: "20px",
          }}
        ></div>

        <div
          className="skeleton"
          style={{
            width: "75%",
            height: "20px",
            marginBottom: "12px",
          }}
        ></div>

        <div
          className="skeleton"
          style={{
            width: "45%",
            height: "16px",
            marginBottom: "12px",
          }}
        ></div>

        <div
          className="skeleton"
          style={{
            width: "25%",
            height: "16px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ExploreItems;
