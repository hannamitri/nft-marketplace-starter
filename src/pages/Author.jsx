import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
          );
          const data = await response.json();
          console.log("Author data:", data);
          setAuthor(data);
          setFollowerCount(data.followers || 0);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching author:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
      setIsFollowing(false);
    } else {
      setFollowerCount(followerCount + 1);
      setIsFollowing(true);
    }
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
          style={{ background: `url(${author?.nftImage || author?.authorBanner || AuthorBanner}) top`, backgroundSize: 'cover' }}
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
                          style={{
                            width: "150px",
                            height: "150px",
                            backgroundColor: "#e0e0e0",
                            borderRadius: "50%",
                          }}
                        ></div>
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div
                              style={{
                                height: "24px",
                                width: "150px",
                                backgroundColor: "#e0e0e0",
                                borderRadius: "4px",
                                marginBottom: "10px",
                              }}
                            ></div>
                          ) : (
                            author?.authorName || "Author Name"
                          )}
                          <span className="profile_username">
                            {loading ? "" : `@${author?.tag || "username"}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <div
                                style={{
                                  height: "16px",
                                  width: "300px",
                                  backgroundColor: "#e0e0e0",
                                  borderRadius: "4px",
                                }}
                              ></div>
                            ) : (
                              author?.address || "No address available"
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
                        {loading ? (
                          <div
                            style={{
                              height: "20px",
                              width: "100px",
                              backgroundColor: "#e0e0e0",
                              borderRadius: "4px",
                            }}
                          ></div>
                        ) : (
                          `${followerCount} followers`
                        )}
                      </div>
                      <button onClick={handleFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} />
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
