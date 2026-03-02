import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [authorError, setAuthorError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorId) return;

    setLoadingAuthor(true);
    setAuthorError("");

    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const authorData = Array.isArray(data) ? data[0] : data;

        setAuthor(authorData);
        setFollowers(authorData?.followers ?? 0);
        setIsFollowing(false);
        setLoadingAuthor(false);
      })
      .catch((err) => {
        console.error("author page api error:", err);
        setAuthorError("Failed to load author.");
        setLoadingAuthor(false);
      });
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }

    setIsFollowing((prev) => !prev);
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {authorError ? (
                        <div style={{ padding: 12 }}>{authorError}</div>
                      ) : (
                        <>
                          {/* Avatar */}
                          {loadingAuthor ? (
                            <Skeleton
                              width="80px"
                              height="80px"
                              borderRadius="50%"
                            />
                          ) : (
                            <img
                              src={author?.authorImage || AuthorImage}
                              alt=""
                            />
                          )}

                          <i className="fa fa-check"></i>

                          {/* Name + meta (KEEP THIS WRAPPER for layout) */}
                          <div className="profile_name">
                            {loadingAuthor ? (
                              <div style={{ marginTop: 8 }}>
                                <Skeleton
                                  width="220px"
                                  height="22px"
                                  borderRadius="6px"
                                />
                                <div style={{ marginTop: 8 }}>
                                  <Skeleton
                                    width="140px"
                                    height="16px"
                                    borderRadius="6px"
                                  />
                                </div>
                                <div style={{ marginTop: 10 }}>
                                  <Skeleton
                                    width="320px"
                                    height="16px"
                                    borderRadius="6px"
                                  />
                                </div>
                              </div>
                            ) : (
                              <h4>
                                {author?.authorName}
                                <span className="profile_username">
                                  @{author?.tag}
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  {author?.address}
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loadingAuthor ? (
                        <>
                          <Skeleton
                            width="140px"
                            height="16px"
                            borderRadius="6px"
                          />
                          <div style={{ marginTop: 10 }}>
                            <Skeleton
                              width="110px"
                              height="38px"
                              borderRadius="10px"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>

                          <button
                            onClick={handleFollowToggle}
                            className="btn-main"
                            style={{ border: "none" }}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
