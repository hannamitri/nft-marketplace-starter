import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
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

        setItems(data);
      } catch (error) {
        console.error("Explore API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getExploreItems();
  }, []);

  // Unix countdown timer
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

  // Sorting
  const getSortedItems = () => {
    const sorted = [...items];

    if (sortBy === "price-low") {
      sorted.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      sorted.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "likes") {
      sorted.sort(
        (a, b) =>
          Number(b.likes || 0) -
          Number(a.likes || 0)
      );
    }

    return sorted;
  };

  const sortedItems = getSortedItems();

  const visibleItems = sortedItems.slice(
    0,
    visibleCount
  );

  const handleSort = (value) => {
    setSortBy(value);
    setVisibleCount(8);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Filter */}
      <div
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
        data-aos="fade-up"
      >
        <div className="items_filter">
          <div className="dropdown">
            <button
              className="btn-main dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              Sort
            </button>

            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleSort("default")}
              >
                Default
              </button>

              <button
                className="dropdown-item"
                onClick={() => handleSort("price-low")}
              >
                Price: Low to High
              </button>

              <button
                className="dropdown-item"
                onClick={() => handleSort("price-high")}
              >
                Price: High to Low
              </button>

              <button
                className="dropdown-item"
                onClick={() => handleSort("likes")}
              >
                Most Likes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NFT GRID */}
      <div
        className="explore-nft-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "30px",
          width: "100%",
        }}
      >
        {/* Skeleton Loading */}
        {loading &&
          Array.from({ length: 8 }).map(
            (_, index) => (
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
            )
          )}

        {/* NFT Cards */}
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
                {/* Author */}
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

                {/* NFT Image */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        {/* Facebook */}
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Facebook"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        {/* X / Twitter */}
                        <a
                          href="https://x.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on X"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        {/* Email */}
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

                {/* NFT Information */}
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

                  {/* Countdown */}
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

      {/* No Results */}
      {!loading &&
        visibleItems.length === 0 && (
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

      {/* Load More */}
      {!loading &&
        visibleCount < sortedItems.length && (
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
              onClick={() =>
                setVisibleCount(
                  (current) => current + 8
                )
              }
            >
              Load More
            </button>
          </div>
        )}

      {/* Responsive Grid */}
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