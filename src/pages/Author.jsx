import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams(); // Capture the author ID from the URL route
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        setAuthorData(response.data);
        setFollowersCount(response.data.followers || 573); // Fallback to initial count
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount(followersCount + 1);
      setIsFollowing(true);
    }
  };

  const copyWalletToClipboard = () => {
    if (authorData?.address) {
      navigator.clipboard.writeText(authorData.address);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div id="wrapper">
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
                {loading ? (
                  /* SKELETON LOADING STATE FOR PROFILE HEADER */
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            backgroundColor: "#e0e0e0",
                          }}
                        ></div>
                        <div className="profile_name">
                          <h4>
                            <div
                              className="skeleton-box mb-2"
                              style={{
                                width: "200px",
                                height: "24px",
                                backgroundColor: "#e0e0e0",
                              }}
                            ></div>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "120px",
                                height: "16px",
                                backgroundColor: "#e0e0e0",
                              }}
                            ></div>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LIVE AUTHOR PROFILE DATA */
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          src={authorData?.authorImage || AuthorImage}
                          alt={authorData?.authorName || "Author"}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData?.authorName || "Unnamed Author"}
                            <span className="profile_username">
                              @{authorData?.tag || "tag"}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData?.address || "0x0000...0000"}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={copyWalletToClipboard}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followersCount} followers
                        </div>
                        <button
                          className="btn-main"
                          onClick={handleFollowClick}
                          style={{ border: "none", cursor: "pointer" }}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/* Pass authorData and loading directly so AuthorItems has the nftCollection and authorImage */}
                  <AuthorItems authorData={authorData} loading={loading} />
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
