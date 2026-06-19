import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      )
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      });
  }, [authorId]);

  const [following, setFollowing] = useState(false);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
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
          style={{
            background: `url(${author?.authorImage || AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div
                          className="skeleton-box skeleton-avatar"
                          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        />
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <div
                                className="skeleton-box skeleton-title"
                                style={{ width: "200px" }}
                              />
                              <div
                                className="skeleton-box skeleton-subtitle"
                                style={{ width: "120px", marginTop: "8px" }}
                              />
                              <div
                                className="skeleton-box skeleton-subtitle"
                                style={{ width: "300px", marginTop: "8px" }}
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
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div
                          className="skeleton-box skeleton-subtitle"
                          style={{ width: "80px" }}
                        />
                      ) : (
                        <div className="profile_follower">
                          {following
                            ? (author?.followers || 0) + 1
                            : author?.followers}{" "}
                          followers
                        </div>
                      )}
                      <button onClick={handleFollow} className="btn-main">
                        {following ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={author} />
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