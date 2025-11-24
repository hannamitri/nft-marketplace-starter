import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const skeletonBox = {
  background: "#e2e5e7",
  borderRadius: "10px",
  width: "100%",
  margin: "8px auto",
  minHeight: "22px",
};

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const effectiveAuthorId = authorId || "73855012";

  useEffect(() => {
    setLoading(true);
    setHasFollowed(false);
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${effectiveAuthorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setFollowers(data.followers);
        setLoading(false);
      });
  }, [effectiveAuthorId]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  });

  const handleFollowToggle = () => {
    setFollowers((prev) => prev + (hasFollowed ? -1 : 1));
    setHasFollowed((prev) => !prev);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          data-aos="fade-down"
          data-aos-delay="000"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${AuthorBanner}) top`}
          style={{ background: `url(${AuthorBanner}) top` }}
        />
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div
                      className="profile_avatar"
                      data-aos="fade-right"
                      data-aos-delay="600"
                    >
                      {loading ? (
                        <div>
                          <div
                            style={{
                              ...skeletonBox,
                              width: "90px",
                              height: "90px",
                              borderRadius: "50%",
                              margin: "0 auto 14px auto",
                            }}
                          />
                          <div
                            style={{
                              ...skeletonBox,
                              width: "80%",
                              minHeight: "22px",
                            }}
                          />
                          <div
                            style={{
                              ...skeletonBox,
                              width: "60%",
                              minHeight: "18px",
                            }}
                          />
                        </div>
                      ) : (
                        <img
                          src={author.authorImage}
                          alt={author.authorName}
                          className="profile_avatar__img"
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                          }}
                        />
                      )}
                      <i className="fa fa-check profile_avatar__icon" />
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <div
                                style={{
                                  ...skeletonBox,
                                  width: "48%",
                                  minHeight: "18px",
                                }}
                              />
                            </>
                          ) : (
                            <>
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
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div
                    className="profile_follow de-flex"
                    data-aos="fade-left"
                    data-aos-delay="600"
                  >
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <div
                            style={{
                              ...skeletonBox,
                              width: "70px",
                              minHeight: "22px",
                            }}
                          />
                          <div
                            style={{
                              ...skeletonBox,
                              width: "110px",
                              minHeight: "36px",
                              borderRadius: "8px",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <button
                            className="btn-main nav__link--primary"
                            onClick={handleFollowToggle}
                          >
                            {hasFollowed ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nfts={author?.nftCollection}
                    loading={loading}
                    authorImage={author?.authorImage}
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
