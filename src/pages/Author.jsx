import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {

  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  
  const fetchAuthorData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(response.data);
      setFollowerCount(response.data.followers || 0);
    } catch (error) {
      console.error("Error fetching author data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorData();
  }, [authorId]);

  const handleFollowToggle = () => {
    setIsFollowing((prevState) => !prevState);
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
  };

  return (
    <div className="container author-page-content">
      <div className="row mb-4 align-items-center">
        {/* Profile Image */}
        <div className="col-md-2 position-relative text-start">
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={authorData?.authorImage}
              alt={authorData?.authorName || "Author"}
              className="rounded-circle"
              width={150}
              height={150}
            />
            {/* Verified Checkmark */}
            <span
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                backgroundColor: "#A952DB",
                borderRadius: "50%",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <i
                className="fa fa-check"
                style={{ color: "white", fontSize: "16px" }}
              ></i>
            </span>
          </div>
        </div>

        {/* Author Details */}
        <div className="col-md-6 d-flex flex-column justify-content-center ml-md-5">
          <h2
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#121212",
              fontSize: "28px",
            }}
          >
            {authorData?.authorName || "Unknown Author"}
          </h2>

          {/* Username */}
          <p
            style={{
              color: "#A952DB",
              fontSize: "16px",
              margin: "0 0 8px 0",
              fontWeight: "500",
            }}
          >
            @{authorData?.tag || "unknown"}
          </p>

          {/* Address with Copy */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#888",
              fontFamily: "monospace",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            <span>{authorData?.address?.slice(0, 18)}...</span>
            <button
              onClick={() => navigator.clipboard.writeText(authorData?.address)}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                fontSize: "12px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f8f8f8",
                color: "#333",
              }}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Follow Section */}
        <div className="col-md-3 d-flex justify-content-end align-items-center mt-3 mt-md-0">
          <div
            className="inline-flex flex-column flex-md-row align-items-start align-items-md-center"
            style={{ gap: "15px", width: "100%", textAlign: "center" }}
          >
            {/* Follower Count */}
            <span
              style={{
                color: "#888",
                fontSize: "14px",
              }}
              className="mb-2 mb-md-0 "
            >
              {followerCount} followers
            </span>

            {/* Follow/Unfollow Button */}
            <button
              onClick={handleFollowToggle}
              style={{
                backgroundColor: isFollowing ? "#ff4d4d" : "#A952DB", // Red if Unfollow, Purple if Follow
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              className="w-100 w-md-auto"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      {/* Author NFT Items */}
      <h3 className="mb-3 ml-3">Author's NFT Items</h3>
      <div className="row">
        {loading || !authorData?.nftCollection
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
              >
                <div className="nft__item">
                  <Skeleton height={200} />
                  <Skeleton width={`80%`} height={20} className="mt-2" />
                  <Skeleton width={60} />
                </div>
              </div>
            ))
          : authorData.nftCollection.map((item) => (
              <div
                key={item.id}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
              >
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        alt={item.title}
                        className="lazy nft__item_preview"
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info text-center mt-2">
                    <h4>{item.title || "Unnamed Item"}</h4>
                    <div className="nft__item_price">
                      {item.price || "0.00"} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Author;
