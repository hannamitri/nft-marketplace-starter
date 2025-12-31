import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams, Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authorPic, setAuthorPic] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [username, setUsername] = useState("");
  const [followCount, setFollowCount] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [address, setAddress] = useState("");

  async function getAuthorData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(data);
      setAuthorPic(data.authorImage);
      setAuthorName(data.authorName);
      setAddress(data.address);
      setUsername(data.tag);
      setFollowCount(data.followers);
      console.log("MainAuthorData:", data);
    } catch {
      console.log("Error Fetching API Data");
    } finally {
      setLoading(false);
    }
  }

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowCount(followCount - 1);
    } else {
      setFollowCount(followCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  function authorTopSkeleton() {
    return (
        <div className="d_profile de-flex__skeleton">
          <div className="de-flex-col__skeleton" style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="profile_avatar">
              <div className="author__pp--container">
                 <div
                className="skeleton-box"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                  backgroundColor: "#ddd",
                  
                }}
              ></div>
              <div className="fa fa-check" style={{position: "relative", bottom: "40px", left: "70px", backgroundColor: "#8364e2", color: "white", borderRadius: "100%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center"}}></div>
              </div>
             
              <div
                className="profile_name"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <div
                  className="skeleton-box"
                  style={{
                    width: "100%",
                    minWidth: "175px",
                    height: "20px",
                    marginBottom: "8px",
                  }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "80px", marginBottom: "8px", marginTop: "4px" }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{
                    width: "100%",
                    minWidth: "175px",
                    marginBottom: "8px",
                    marginTop: "4px"
                  }}
                ></div>
              </div>
            </div>
            <div className="profile_follow de-flex">
              <div className="de-flex-col">
                <div
                  className="skeleton-box"
                  style={{ width: "100%", minWidth: "112px", height: "28px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  useEffect(() => {
    getAuthorData();
  }, []);

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
              <div className="col-md-12">
                <>
                  {!loading ? (
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorPic} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorName}
                              <span className="profile_username">
                                @{username}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {address}
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
                            {followCount} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={handleFollowToggle}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    authorTopSkeleton()
                  )}
                </>
              </div>
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
