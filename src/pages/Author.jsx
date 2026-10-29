import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAuthor() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
      );
      setPosts(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    fetchAuthor();
  }, [id]);

  // Click handler to toggle follow status and increment/decrement the follower count locally
  const onFollow = (e) => {
    e.preventDefault();
    if (following) {
      setPosts({ ...post, followers: post.followers - 1 });
    } else {
      setPosts({ ...post, followers: post.followers + 1 });
    }
    setFollowing(!following);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* LOADING SKELETON */}
              {loading ? (
                <>
                  {/* Profile Header Skeleton (Renders 1) */}
                  {new Array(1).fill(0).map((_, index) => (
                    <div
                      className="col-md-12"
                      key={`profile-skeleton-${index}`}
                    >
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <div
                              className="skeleton-avatar"
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "100%",
                                background: "#ddd",
                                animation: "pulse 1.5s infinite",
                              }}
                            ></div>
                            <div
                              className="profile_name"
                              style={{ marginLeft: "20px" }}
                            >
                              <h4 style={{ margin: 0 }}>
                                <div
                                  className="skeleton-title"
                                  style={{
                                    width: "150px",
                                    height: "24px",
                                    background: "#ddd",
                                    marginBottom: "10px",
                                  }}
                                ></div>
                                <span className="profile_username">
                                  <div
                                    className="skeleton-tag"
                                    style={{
                                      width: "80px",
                                      height: "16px",
                                      background: "#ddd",
                                      marginBottom: "5px",
                                    }}
                                  ></div>
                                </span>
                                <span className="profile_wallet">
                                  <div
                                    className="skeleton-wallet"
                                    style={{
                                      width: "200px",
                                      height: "14px",
                                      background: "#ddd",
                                    }}
                                  ></div>
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div
                              className="skeleton-follower"
                              style={{
                                width: "100px",
                                height: "18px",
                                background: "#ddd",
                                marginBottom: "10px",
                              }}
                            ></div>
                            <div
                              className="skeleton-btn"
                              style={{
                                width: "110px",
                                height: "36px",
                                background: "#ddd",
                                borderRadius: "4px",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* NFT Grid Items Skeletons (Renders a row of 4 items) */}
                  {new Array(8).fill(0).map((_, index) => (
                    <div
                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={`item-skeleton-${index}`}
                      style={{
                        display: "block",
                        backgroundSize: "cover",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        className="nft__item"
                        style={{ position: "relative" }}
                      >
                        <div className="author_list_pp" style={{ zIndex: 2 }}>
                          <div
                            className="skeleton-loading"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              backgroundColor: "#eee",
                            }}
                          ></div>
                        </div>

                        <div className="nft__item_wrap">
                          <div
                            className="skeleton-loading nft__item_preview"
                            style={{
                              width: "100%",
                              height: "150px",
                              borderRadius: "8px",
                              backgroundColor: "#eee",
                            }}
                          ></div>
                        </div>

                        <div
                          className="nft__item_info"
                          style={{ marginTop: "15px" }}
                        >
                          <div
                            className="skeleton-loading"
                            style={{
                              width: "70%",
                              height: "18px",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                              marginBottom: "10px",
                            }}
                          ></div>

                          <div
                            className="skeleton-loading"
                            style={{
                              width: "40%",
                              height: "14px",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                            }}
                          ></div>

                          <div
                            className="nft__item_like skeleton-loading"
                            style={{
                              width: "35px",
                              height: "15px",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                              position: "absolute",
                              bottom: "20px",
                              right: "20px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                /* ACTUAL CONTENT */
                post && (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src= {post.authorImage|| AuthorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {post.authorName}
                              <span className="profile_username">
                                @{post.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {post.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {post.followers} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={onFollow}>
                            {following ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
