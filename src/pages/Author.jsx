import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { getAuthor } from "../api/nft";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore the follow state that handleFollow persists. Previously this was
  // written to localStorage but never read back, so it reset on every visit.
  useEffect(() => {
    setFollowing(localStorage.getItem(`following-${authorId}`) === "true");
  }, [authorId]);

  useEffect(() => {
    let cancelled = false;

    const fetchAuthor = async () => {
      setLoading(true);

      try {
        const data = await getAuthor(authorId);
        if (!cancelled) setAuthor(data);
      } catch (error) {
        console.error("Error fetching author:", error);
        if (!cancelled) setAuthor(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAuthor();

    return () => {
      cancelled = true;
    };
  }, [authorId]);

  const handleFollow = () => {
    setFollowing((previous) => {
      const next = !previous;
      localStorage.setItem(`following-${authorId}`, String(next));
      return next;
    });
  };

  const handleCopy = async () => {
    const address = author?.address || authorId;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Could not copy address:", error);
    }
  };

  const followerCount = (author?.followers || 0) + (following ? 1 : 0);
  const username =
    author?.tag ||
    author?.authorName?.replace(/\s+/g, "").toLowerCase() ||
    authorId;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="skeleton skeleton-profile-avatar"></div>
                      ) : (
                        <img
                          src={author?.authorImage || AuthorImage}
                          alt={author?.authorName || "Author"}
                        />
                      )}

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {loading
                            ? "Loading..."
                            : author?.authorName || `Author ${authorId}`}

                          <span className="profile_username">@{username}</span>

                          <span id="wallet" className="profile_wallet">
                            {author?.address || authorId}
                          </span>

                          <button
                            type="button"
                            id="btn_copy"
                            title="Copy wallet address"
                            onClick={handleCopy}
                          >
                            {copied ? "Copied" : "Copy"}
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

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorId={author?.authorId || authorId}
                    authorName={author?.authorName}
                    authorImage={author?.authorImage}
                    items={author?.nftCollection || []}
                    loading={loading}
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
