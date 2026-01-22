import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/skeleton/Skeleton";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();

  // Data passed from NewItems
  const {
    authorName = "Unknown Author",
    authorImage = AuthorImage,
    authorUsername = "@unknown",
    authorWallet = "No wallet provided",
    followers: initialFollowers = 0,
  } = location.state || {};

  // Local state
  const [followers, setFollowers] = useState(initialFollowers);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [authorItems, setAuthorItems] = useState([]);

  // ------------------------------
  // FOLLOW / UNFOLLOW ANIMATION
  // ------------------------------
  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  // ------------------------------
  // FETCH AUTHOR ITEMS
  // ------------------------------
  useEffect(() => {
    async function fetchAuthorItems() {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/author?author=${authorId}`
        );

        setAuthorItems(response.data);
      } catch (error) {
        console.error("Error fetching author items:", error);
      } finally {
        setLoadingItems(false);
        setLoadingAuthor(false);
      }
    }

    fetchAuthorItems();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* BANNER */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              {/* ------------------------------ */}
              {/* AUTHOR HEADER */}
              {/* ------------------------------ */}
              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      {/* IMAGE + SKELETON */}
                      {loadingAuthor ? (
                        <Skeleton width="120px" height="120px" borderRadius="50%" />
                      ) : (
                        <img src={authorImage} alt={authorName} />
                      )}

                      {!loadingAuthor && <i className="fa fa-check"></i>}

                      <div className="profile_name">
                        <h4>
                          {loadingAuthor ? (
                            <Skeleton width="200px" height="25px" />
                          ) : (
                            <>
                              {authorName}
                              <span className="profile_username">{authorUsername}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorWallet}
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

                  {/* FOLLOW BUTTON */}
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loadingAuthor ? (
                        <Skeleton width="100px" height="20px" />
                      ) : (
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                      )}

                      {!loadingAuthor && (
                        <button
                          className={`btn-main ${isFollowing ? "btn-following" : ""}`}
                          onClick={toggleFollow}
                          style={{
                            transition: "0.3s",
                            background: isFollowing ? "#aaa" : "",
                          }}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* ------------------------------ */}
              {/* AUTHOR ITEMS */}
              {/* ------------------------------ */}
              <div className="col-md-12 mt-4">
                <div className="de_tab tab_simple">

                  {loadingItems ? (
                    <div className="row">
                      {new Array(6).fill(0).map((_, i) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={i}>
                          <Skeleton width="100%" height="250px" />
                          <Skeleton width="60%" height="20px" className="mt-2" />
                          <Skeleton width="40%" height="15px" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <AuthorItems items={authorItems} />
                  )}

                </div>
              </div>

              {/* ------------------------------ */}
              {/* MORE FROM THIS CREATOR */}
              {/* ------------------------------ */}
              {!loadingItems && authorItems.length > 0 && (
                <div className="col-md-12 mt-5">
                  <h3 className="mb-3">More from this creator</h3>

                  <div className="row">
                    {authorItems.slice(0, 3).map((item, index) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                          <img
                            src={item.nftImage}
                            alt={item.title}
                            className="img-fluid rounded"
                          />
                        </Link>
                        <h5 className="mt-2">{item.title}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;