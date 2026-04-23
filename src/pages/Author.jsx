import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const FOLLOW_STORAGE_KEY = "followed-authors";

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author details.");
        }

        const data = await response.json();
        setAuthor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthor();
      window.scrollTo(0, 0);
    }
  }, [authorId]);

  const handleCopy = async () => {
    if (!author?.address) {
      return;
    }

    try {
      await navigator.clipboard.writeText(author.address);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!authorId) {
      return;
    }

    const followedAuthors = JSON.parse(localStorage.getItem(FOLLOW_STORAGE_KEY) || "{}");
    setIsFollowing(Boolean(followedAuthors[authorId]));
  }, [authorId]);

  const handleFollowToggle = () => {
    if (!authorId) {
      return;
    }

    const followedAuthors = JSON.parse(localStorage.getItem(FOLLOW_STORAGE_KEY) || "{}");
    const nextFollowingState = !isFollowing;

    if (nextFollowingState) {
      followedAuthors[authorId] = true;
    } else {
      delete followedAuthors[authorId];
    }

    localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(followedAuthors));
    setIsFollowing(nextFollowingState);
  };

  const bannerImage =
    author?.nftCollection?.[0]?.nftImage ||
    author?.authorImage ||
    AuthorBanner;

  const displayedFollowers = author
    ? author.followers + (isFollowing ? 1 : 0)
    : 0;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-aos="zoom-out"
          data-bgimage={`url(${bannerImage}) top`}
          style={{ background: `url(${bannerImage}) center / cover no-repeat` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="150px" height="150px" borderRadius="75px" />
                        <div className="profile_name mt-3">
                          <Skeleton width="180px" height="28px" borderRadius="4px" />
                          <div className="mt-2">
                            <Skeleton width="120px" height="18px" borderRadius="4px" />
                          </div>
                          <div className="mt-2">
                            <Skeleton width="320px" height="18px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!loading && error && <div className="text-danger">{error}</div>}
                {!loading && !error && author && (
                <div className="d_profile de-flex" data-aos="fade-up" data-aos-delay="120">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName?.trim() || "Author"} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName?.trim()}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{displayedFollowers} followers</div>
                      <button type="button" className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <div className="col-md-12" data-aos="fade-up" data-aos-delay="200">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />
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
