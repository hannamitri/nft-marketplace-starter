import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    Math.floor(Date.now() / 1000)
  );

  // Fetch Explore API
  useEffect(() => {
    const getExploreItems = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Explore items");
        }

        const data = await response.json();

        console.log("Explore API:", data);

        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Explore API Error:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    getExploreItems();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Countdown
  const getCountdown = (expiryDate) => {
    if (!expiryDate) {
      return "Expired";
    }

    const expirySeconds =
      Number(expiryDate) > 10000000000
        ? Math.floor(Number(expiryDate) / 1000)
        : Number(expiryDate);

    const difference = expirySeconds - currentTime;

    if (difference <= 0) {
      return "Expired";
    }

    const days = Math.floor(difference / 86400);
    const hours = Math.floor((difference % 86400) / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    const seconds = difference % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Sort items
  const getSortedItems = () => {
    const sorted = [...items];

    if (sortBy === "highest") {
      sorted.sort(
        (a, b) =>
          Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortBy === "lowest") {
      sorted.sort(
        (a, b) =>
          Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "liked") {
      sorted.sort(
        (a, b) =>
          Number(b.likes || 0) - Number(a.likes || 0)
      );
    }

    return sorted;
  };

  const sortedItems = getSortedItems();

  const visibleItems = sortedItems.slice(0, visibleCount);

  // Sort selection
  const handleSort = (value) => {
    setSortBy(value);
    setVisibleCount(8);
    setSortOpen(false);
  };

  // Button label
  const getSortLabel = () => {
    if (sortBy === "highest") {
      return "Highest to Lowest";
    }

    if (sortBy === "lowest") {
      return "Lowest to Highest";
    }

    if (sortBy === "liked") {
      return "Most Liked";
    }

    return "Sort";
  };

  return (
    <div style={{ width: "100%" }}>
      {/* SORT */}
      <div
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
        data-aos="fade-up"
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* SORT BUTTON */}
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="btn-main"
            style={{
              minWidth: "180px",
              cursor: "pointer",
            }}
          >
            {getSortLabel()}
            <i
              className={`fa ${
                sortOpen ? "fa-angle-up" : "fa-angle-down"
              }`}
              style={{ marginLeft: "10px" }}
            ></i>
          </button>

          {/* SORT MENU */}
          {sortOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "8px",
                minWidth: "180px",
                background: "#ffffff",
                borderRadius: "5px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
                zIndex: 9999,
                overflow: "hidden",
              }}
            >
              {/* HIGHEST */}
              <button
                type="button"
                onClick={() => handleSort("highest")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 15px",
                  border: "none",
                  background:
                    sortBy === "highest"
                      ? "#f1f1f1"
                      : "#ffffff",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Highest to Lowest
              </button>

              {/* LOWEST */}
              <button
                type="button"
                onClick={() => handleSort("lowest")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 15px",
                  border: "none",
                  background:
                    sortBy === "lowest"
                      ? "#f1f1f1"
                      : "#ffffff",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Lowest to Highest
              </button>

              {/* MOST LIKED */}
              <button
                type="button"
                onClick={() => handleSort("liked")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 15px",
                  border: "none",
                  background:
                    sortBy === "liked"
                      ? "#f1f1f1"
                      : "#ffffff",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Most Liked
              </button>

              {/* DEFAULT */}
              <button
                type="button"
                onClick={() => handleSort("default")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 15px",
                  border: "none",
                  background:
                    sortBy === "default"
                      ? "#f1f1f1"
                      : "#ffffff",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Default
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NFT GRID */}
      <div
        className="explore-nft-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "30px",
          width: "100%",
        }}
      >
        {/* SKELETON */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="nft__item"
              style={{
                width: "100%",
                margin: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  background: "#e5e5e5",
                  borderRadius: "8px",
                  animation:
                    "exploreSkeletonPulse 1.5s ease-in-out infinite",
                }}
              ></div>

              <div style={{ paddingTop: "20px" }}>
                <div
                  style={{
                    width: "70%",
                    height: "18px",
                    background: "#e5e5e5",
                    borderRadius: "4px",
                    marginBottom: "12px",
                  }}
                ></div>

                <div
                  style={{
                    width: "40%",
                    height: "14px",
                    background: "#e5e5e5",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
            </div>
          ))}

        {/* NFT CARDS */}
        {!loading &&
          visibleItems.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 75}
              style={{
                width: "100%",
                minWidth: 0,
              }}
            >
              <div
                className="nft__item"
                style={{
                  width: "100%",
                  margin: 0,
                }}
              >
                {/* AUTHOR */}
                <div className="author_list_pp">
                  <Link
                    to={
                      item.authorId
                        ? `/author/${item.authorId}`
                        : "/author"
                    }
                  >
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt="Author"
                    />

                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* NFT IMAGE */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button type="button">
                        Buy Now
                      </button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Facebook"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a
                          href="https://x.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on X"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a
                          href="mailto:?subject=Check out this NFT&body=Check out this NFT!"
                          aria-label="Share by email"
                        >
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/item-details/${item.nftId}`}
                  >
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title || "NFT"}
                    />
                  </Link>
                </div>

                {/* NFT INFORMATION */}
                <div className="nft__item_info">
                  <Link
                    to={`/item-details/${item.nftId}`}
                  >
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {item.price || 0} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>

                    <span>
                      {item.likes || 0}
                    </span>
                  </div>

                  {/* COUNTDOWN */}
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "13px",
                    }}
                  >
                    <i className="fa fa-clock-o"></i>{" "}
                    {getCountdown(item.expiryDate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* NO RESULTS */}
      {!loading && visibleItems.length === 0 && (
        <div
          className="text-center"
          style={{
            width: "100%",
            marginTop: "30px",
          }}
        >
          <p>No NFTs found.</p>
        </div>
      )}

      {/* LOAD MORE */}
      {!loading && visibleCount < sortedItems.length && (
        <div
          className="text-center"
          data-aos="fade-up"
          style={{
            width: "100%",
            marginTop: "40px",
          }}
        >
          <button
            className="btn-main"
            type="button"
            onClick={() =>
              setVisibleCount((current) => current + 8)
            }
          >
            Load More
          </button>
        </div>
      )}

      {/* STYLES */}
      <style>
        {`
          @keyframes exploreSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }

          .explore-nft-grid {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          @media (max-width: 991px) {
            .explore-nft-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 575px) {
            .explore-nft-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ExploreItems;