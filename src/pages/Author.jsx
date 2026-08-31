import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchAuthorData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAuthorData();
    }
  }, [id]);

  const toggleFollow = () => {
    if (following) {
      setAuthor((prev) => ({ ...prev, followers: prev.followers - 1 }));
      setFollowing(false);
    } else {
      setAuthor((prev) => ({ ...prev, followers: prev.followers + 1 }));
      setFollowing(true);
    }
  };

  const authorImage = author?.authorImage || author?.authorImg;

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ backgroundColor: "#e2e8f0", height: "300px" }}
          ></section>
          <section aria-label="section">
            <div className="container">
              <div className="row">
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
                        ></div>
                      </div>
                      <div className="profile_name">
                        <h4>
                          <div
                            className="skeleton-box"
                            style={{ width: "200px", height: "24px" }}
                          ></div>
                        </h4>
                        <span className="profile_username">
                          <div
                            className="skeleton-box"
                            style={{ width: "100px", height: "16px" }}
                          ></div>
                        </span>
                        <span id="wallet" className="profile_wallet">
                          <div
                            className="skeleton-box"
                            style={{ width: "250px", height: "16px" }}
                          ></div>
                        </span>
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
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${author?.authorBanner || AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorImage} alt={author?.authorName} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="profile_name">
                      <h4>
                        {author?.authorName}
                        <span className="profile_username">@{author?.tag}</span>
                        <span id="wallet" className="profile_wallet">
                          {author?.address}
                        </span>
                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author?.followers} followers
                      </div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={author?.nftCollection}
                    authorImg={authorImage}
                  />
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