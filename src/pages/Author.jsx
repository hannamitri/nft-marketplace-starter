import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!id) {
        setError("No author ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthorData(response.data);
        setFollowerCount(response.data.followers || 0);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setError("Failed to load author data");
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  // Copy wallet address to clipboard
  const handleCopyWallet = async () => {
    if (authorData?.address) {
      try {
        await navigator.clipboard.writeText(authorData.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy wallet address:", err);
      }
    }
  };

  // Format wallet address for display (show first 6 and last 4 characters)
  const formatWalletAddress = (address) => {
    if (!address) return "";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle follow/unfollow functionality
  const handleFollowToggle = () => {
    if (isFollowing) {
      // Unfollow: decrease follower count
      setFollowerCount((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      // Follow: increase follower count
      setFollowerCount((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div id="wrapper" data-aos="fade-in">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <div className="profile_name">
                          <Skeleton
                            width="200px"
                            height="32px"
                            borderRadius="4px"
                          />
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton
                              width="120px"
                              height="20px"
                              borderRadius="4px"
                            />
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton
                              width="300px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton
                          width="100px"
                          height="20px"
                          borderRadius="4px"
                        />
                        <div style={{ marginTop: "12px" }}>
                          <Skeleton
                            width="80px"
                            height="40px"
                            borderRadius="4px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div style={{ padding: "20px", textAlign: "center" }}>
                      <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="8px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div id="wrapper" data-aos="fade-in">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-center" style={{ padding: "50px 0" }}>
                    <h2>Author Not Found</h2>
                    <p>{error}</p>
                    <Link to="/explore" className="btn-main">
                      Back to Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Main render with dynamic data
  return (
    <div id="wrapper" data-aos="fade-in">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{
            background: authorData?.banner
              ? `url(${authorData.banner}) top`
              : `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorData?.authorImage || AuthorImage}
                        alt={`${authorData?.authorName || "Author"}'s profile`}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData?.authorName || "Unknown Author"}
                          <span className="profile_username">
                            @
                            {authorData?.tag ||
                              authorData?.authorName
                                ?.toLowerCase()
                                .replace(/\s+/g, "") ||
                              "unknown"}
                          </span>
                          {authorData?.address && (
                            <>
                              <span id="wallet" className="profile_wallet">
                                {formatWalletAddress(authorData.address)}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Wallet Address"
                                onClick={handleCopyWallet}
                                style={{
                                  backgroundColor: copied ? "#28a745" : "",
                                  color: copied ? "white" : "",
                                }}
                              >
                                {copied ? "Copied!" : "Copy"}
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} followers
                      </div>
                      <button
                        onClick={handleFollowToggle}
                        className="btn-main"
                        style={{
                          backgroundColor: isFollowing ? "#dc3545" : "",
                          borderColor: isFollowing ? "#dc3545" : "",
                        }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} authorData={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
