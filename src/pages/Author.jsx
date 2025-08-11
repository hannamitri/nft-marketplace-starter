import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(response.data);
        setIsFollowing(false);
      } catch (error) {
        console.error("Error fetching Author data", error);
      }
      setLoading(false);
    };
    fetchAuthor();
  }, [authorId]);

  useEffect(() => {
    setFollowerCount(authorData.followers || 0);
  }, [authorData]);

  useEffect(() => {
    setFollowerCount((current) => (isFollowing ? current + 1 : current - 1));
  }, [isFollowing]);

  const handleFollow = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
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
                        <div className="skeleton-nft-card-avatar"></div>
                        <div className="skeleton-nft-card-check">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="skeleton-de-flex-col">
                            <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>
                            <div className="skeleton-nft-card-row skeleton-nft-card-row-sm"></div>
                            <div className="skeleton-nft-card-row skeleton-nft-card-row-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex-2">
                      <div className="skeleton-de-flex-col-2">
                        <div className="skeleton-nft-card-row skeleton-nft-card-row-md-2"></div>
                        <div className="skeleton-nft-card-row skeleton-nft-card-row-sm-2"></div>
                      </div>
                      <div className="skeleton-nft-card-row skeleton-nft-card-row-md-3"></div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          src={authorData?.authorImage || AuthorImage}
                          alt=""
                        />
                        <Link to={`/author/${authorData.authorId}`}></Link>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData?.authorName}
                            <span className="profile_username">
                              @{authorData?.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData?.address}
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
                          {followerCount} followers
                        </div>
                        <button className="btn-main" onClick={handleFollow}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorImage={authorData.authorImage}
                    authorId={authorData.authorId}
                    authorName={authorData.authorName}
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
