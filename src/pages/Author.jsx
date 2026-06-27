import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import useMinimumLoading from "../components/UI/useMinimumLoading";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const displayLoading = useMinimumLoading(loading, 700);

  const followStorageKey = `follow-author-${authorId}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchAuthor() {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      const data = await response.json();
      let savedFollowState = false;

      try {
        savedFollowState = localStorage.getItem(followStorageKey) === "true";
      } catch (error) {
        savedFollowState = false;
      }

      setAuthor(data);
      setIsFollowing(savedFollowState);
      setFollowerCount(data.followers + (savedFollowState ? 1 : 0));
      setLoading(false);
    }

    fetchAuthor();
  }, [authorId, followStorageKey]);

  const handleFollowToggle = () => {
    if (!author) {
      return;
    }

    const nextFollowState = !isFollowing;
    setIsFollowing(nextFollowState);
    setFollowerCount(Number(author.followers) + (nextFollowState ? 1 : 0));

    try {
      localStorage.setItem(followStorageKey, String(nextFollowState));
    } catch (error) {
      // Ignore storage write issues and keep local UI responsive.
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
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {displayLoading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {displayLoading ? (
                            <Skeleton width="150px" height="24px" borderRadius="4px" />
                          ) : (
                            author.authorName
                          )}
                          <span className="profile_username">
                            @{displayLoading ? "..." : author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {displayLoading ? "..." : author.address}
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
                        {displayLoading ? "..." : followerCount} followers
                      </div>
                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollowToggle}
                        disabled={displayLoading}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={displayLoading ? [] : author.nftCollection}
                    loading={displayLoading}
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
