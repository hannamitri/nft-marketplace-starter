import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const fetchAuthor = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`;
    try {
      const { data } = await axios.get(fetchAuthor);
      setAuthor(data);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
    setAuthor((prev) => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
    }));
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

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
                <div className="d_profile de-flex" data-aos="fade-up">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isLoading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        ></div>
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {isLoading ? (
                            <div className="skeleton-box" style={{ width: "200px" }}></div>
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {isLoading ? (
                              <div className="skeleton-box" style={{ width: "100px" }}></div>
                            ) : (
                              author?.tag
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {isLoading ? (
                              <div className="skeleton-box" style={{ width: "250px" }}></div>
                            ) : (
                              author?.address
                            )}
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
                        {isLoading ? (
                          <div className="skeleton-box" style={{ width: "150px", height: "40px" }}></div>
                        ) : (
                          `${author?.followers} followers`
                        )}
                      </div>
                      {!isLoading && (
                        <button onClick={handleFollow} className="btn-main">
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12" data-aos="fade-up" data-aos-delay="100">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} isLoading={isLoading} />
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