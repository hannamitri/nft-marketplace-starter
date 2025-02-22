import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [authorInfo, setAuthorInfo] = useState([]);
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchAuthorInfo() {
    try {
      console.log("Fetching data for authorId:", authorId);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );

      console.log("Fetched author data:", data);

      setAuthorInfo(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(authorInfo.address)
      .then(() => {
        console.log("Address copied to clipboard!");
        alert("Address copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying address:", error);
      });
  };

  useEffect(() => {
    fetchAuthorInfo();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <>
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
                {loading ? (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "200px",
                                }}
                              />
                              <span className="profile_username">
                                <div
                                  className="skeleton-box"
                                  style={{
                                    width: "100px",
                                  }}
                                />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <div
                                  className="skeleton-box"
                                  style={{
                                    width: "250px",
                                  }}
                                />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div
                        className="profile_follow de-flex"
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <div className="de-flex-col">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "150px",
                              height: "40px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorInfo.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorInfo.authorName}
                              <span className="profile_username">
                                @{authorInfo.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorInfo.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={copyToClipboard}
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
                            {authorInfo.followers + (isFollowing ? 1 : 0)}{" "}
                            followers
                          </div>
                          <button className="btn-main" onClick={toggleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorInfo={authorInfo}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </div>
  );
};

export default Author;
