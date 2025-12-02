import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import useFetch from "../components/UI/apiFetch";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const { data: authorData, loading } = useFetch(
    id ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}` : null
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (authorData) {
      setFollowerCount(authorData.followers);
    }
  }, [authorData]);

  const handleFollowToggle = () => {
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
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="24px" borderRadius="4px" />
                            <span className="profile_username">
                              <Skeleton width="120px" height="16px" borderRadius="4px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="300px" height="16px" borderRadius="4px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width="120px" height="20px" borderRadius="4px" />
                        </div>
                        <Skeleton width="100px" height="40px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                ) : authorData ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">@{authorData.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
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
                        <div className="profile_follower">{followerCount} followers</div>
                        <button onClick={handleFollowToggle} className="btn-main">
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>Author not found</div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} authorImage={authorData?.authorImage} />
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
