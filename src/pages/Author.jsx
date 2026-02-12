import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const skeletonStyle = {
    background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
    borderRadius: "4px",
  };

  const skeletonCircle = {
    ...skeletonStyle,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    flexShrink: 0,
  };

  const skeletonText = (width) => ({
    ...skeletonStyle,
    height: "12px",
    margin: "4px 0",
    width,
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(response.data);
        setFollowers(response.data.followers);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleFollowToggle = () => {
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1);
    setIsFollowing(prev => !prev);
  };

  if (loading || !author) {
    return (
      <>
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <section
              id="profile_banner"
              style={{
                background: `url(${AuthorBanner}) top`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            ></section>

            <section>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div style={skeletonCircle}></div>
                          <div style={skeletonText("50%")}></div>
                          <div style={skeletonText("30%")}></div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div style={skeletonText("40%")}></div>
                          <div
                            style={{
                              ...skeletonStyle,
                              width: "100px",
                              height: "36px",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="row">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          key={idx}
                        >
                          <div className="nft__item" style={{ position: "relative" }}>
                            <div className="nft__item_wrap">
                              <div
                                style={{
                                  ...skeletonStyle,
                                  width: "100%",
                                  height: "200px",
                                  borderRadius: "10px",
                                }}
                              ></div>
                            </div>
                            <div className="nft__item_info mt-2">
                              <div style={skeletonText("80%")}></div>
                              <div style={skeletonText("50%")}></div>
                              <div style={skeletonText("30%")}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <style>
          {`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}
        </style>
      </>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span className="profile_wallet">{author.address}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-4">
                <div className="row">
                  {author.nftCollection?.map((nft) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={nft.nftId}
                    >
                      <div className="nft__item" style={{ position: "relative" }}>
                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="img-fluid"
                              alt={nft.title}
                            />
                          </Link>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <img
                            src={author.authorImage}
                            alt={author.authorName}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid white",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "-2px",
                              width: "14px",
                              height: "14px",
                              backgroundColor: "#8364e2",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "4px",
                              fontWeight: "bold",
                            }}
                          >
                            <i className="fa fa-check" style={{ fontSize: "10px" }}></i>
                          </div>
                        </div>
                        <div className="nft__item_info mt-2">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <h4>{nft.title}</h4>
                          </Link>
                          <div className="nft__item_price">{nft.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
