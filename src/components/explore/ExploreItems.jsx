

import React, { useEffect, useState } from "react";
import AuthorLink from "../utils/AuthorLink";
import Countdown from "../home/Countdown";
import { Link } from "react-router-dom";
import axios from "axios";

const isValidAuthorId = (id) =>
  id && String(id).toLowerCase() !== "undefined" && !isNaN(Number(id));

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("likes_high_to_low");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
            filter ? `?filter=${filter}` : ""
          }`
        );
        setItems(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch explore items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const wrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "280px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    flex: "1 1 240px",
    transition: "transform 0.3s ease",
  };

  return (
    <>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: "100%",
            maxWidth: 220,
          }}
        >
          <option value="likes_high_to_low">Most liked</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
        </select>
      </div>

      <div style={wrapperStyle}>
        {loading &&
          Array(8)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  ...cardStyle,
                  background: "#eee",
                  height: "360px",
                }}
              />
            ))}

        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <div
              key={item.nftId}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Author Info */}
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isValidAuthorId(item.authorId) ? (
                  <AuthorLink id={item.authorId}>
                    <img
                      src={item.authorImage}
                      alt={item.authorName || "Author"}
                      style={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(0.85)";
                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(144, 79, 190, 0.8)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <i
                      className="fa fa-check"
                      style={{ marginLeft: "6px", color: "#39f" }}
                    ></i>
                  </AuthorLink>
                ) : (
                  <span style={{ color: "#666" }}>Unknown Author</span>
                )}
              </div>

              {/* NFT Image + Countdown badge */}
              <div style={{ position: "relative", width: "100%", marginBottom: "10px" }}>
                {item.expiryDate && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-25px",
                      backgroundColor: "#fee",
                      padding: "2px 6px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#f00",
                      display: "inline-flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      maxWidth: "fit-content",
                      zIndex: 2,
                    }}
                  >
                    <Countdown expiryDate={new Date(item.expiryDate).getTime()} />
                  </div>
                )}
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </Link>
              </div>

              {/* Title */}
              <Link to={`/item-details/${item.nftId}`}>
                <h4 style={{ fontSize: "16px", margin: "0 0 8px" }}>
                  {item.title}
                </h4>
              </Link>

              {/* Price & Likes */}
              <div
                style={{
                  marginBottom: "6px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {item.price} ETH
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                ❤️ {item.likes}
              </div>
            </div>
          ))}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p style={{ color: "red", fontSize: "18px" }}>
              🚫 Explore API returned no items. Check dev console for details.
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link
          to="#"
          id="loadmore"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
