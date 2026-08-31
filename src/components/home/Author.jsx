import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton"; // Adjust path if needed

const Author = () => {
  const { id } = useParams(); // Gets author ID from URL path
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    async function fetchAuthorData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
        setFollowers(data.followers);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorData();
  }, [id]);

  // Toggle Follow / Unfollow logic
  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Header / Banner Background */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_single/author_banner.jpg) top"
          style={{ background: `url("/images/author_single/author_banner.jpg") top` }}
        ></section>

        {/* Profile Info Section */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                // Skeleton Loader for Author Header
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="100%"
                        />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="24px" />
                            <span className="profile_username">
                              <Skeleton width="100px" height="16px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" height="16px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex-col">
                      <div className="de-flex-col">
                        <Skeleton width="120px" height="40px" borderRadius="6px" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Loaded Author Info
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author?.authorImg} alt={author?.authorName} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author?.authorName}
                            <span className="profile_username">
                              @{author?.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author?.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() =>
                                navigator.clipboard.writeText(author?.address)
                              }
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex-col">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <button
                          className="btn-main"
                          onClick={handleFollowToggle}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Author NFT Items Grid */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <div className="tab-1">
                      <div className="row">
                        {loading
                          ? new Array(8).fill(0).map((_, index) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-12 mb-4"
                                key={index}
                              >
                                <div className="nft_coll">
                                  <div className="nft_wrap">
                                    <Skeleton
                                      width="100%"
                                      height="220px"
                                      borderRadius="8px"
                                    />
                                  </div>
                                  <div className="nft_coll_pp">
                                    <Skeleton
                                      width="50px"
                                      height="50px"
                                      borderRadius="50%"
                                    />
                                  </div>
                                  <div className="nft_coll_info text-center mt-3">
                                    <Skeleton
                                      width="120px"
                                      height="20px"
                                      className="mb-2"
                                    />
                                    <Skeleton width="60px" height="16px" />
                                  </div>
                                </div>
                              </div>
                            ))
                          : author?.nftCollection?.map((item) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-12 mb-4"
                                key={item.id}
                              >
                                <div className="nft__item">
                                  <div className="author_list_pp">
                                    <Link to="#">
                                      <img
                                        className="lazy"
                                        src={author.authorImg}
                                        alt={author.authorName}
                                      />
                                      <i className="fa fa-check"></i>
                                    </Link>
                                  </div>
                                  <div className="nft__item_wrap">
                                    <Link to={`/item-details/${item.nftId}`}>
                                      <img
                                        src={item.nftImage}
                                        className="lazy nft__item_preview"
                                        alt={item.title}
                                      />
                                    </Link>
                                  </div>
                                  <div className="nft__item_info">
                                    <Link to={`/item-details/${item.nftId}`}>
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
                            ))}
                      </div>
                    </div>
                  </div>
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