import React, { useEffect, useMemo, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import {
  buildAuthorsUrl,
  MIN_SKELETON_MS,
} from "../constants/api";

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followSessionDelta, setFollowSessionDelta] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFollowSessionDelta(0);
  }, [authorId]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchAuthor = async () => {
      const minimumDelay = new Promise((resolve) =>
        setTimeout(resolve, MIN_SKELETON_MS)
      );
      try {
        setLoading(true);
        setError("");
        setAuthor(null);

        if (!authorId) {
          await minimumDelay;
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        const response = await fetch(buildAuthorsUrl(authorId), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Author request failed: ${response.status}`);
        }
        const payload = await response.json();
        await minimumDelay;

        if (mounted) {
          setAuthor(payload ? { ...payload, authorId: payload.authorId || authorId } : null);
          setLoading(false);
        }
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }
        await minimumDelay;
        if (mounted) {
          setError("Unable to load author details right now.");
          setLoading(false);
        }
      }
    };

    fetchAuthor();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [authorId]);

  const profileImage = useMemo(() => {
    return (
      author?.authorImage ||
      location.state?.authorImage ||
      AuthorImage
    );
  }, [author, location.state]);

  const displayedFollowers =
    Number(author?.followers || 0) + followSessionDelta;

  const handleFollowClick = () => {
    setFollowSessionDelta((current) => current + 1);
  };

  const handleCopyWallet = async () => {
    const value = author?.address || "";
    if (!value) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {
      setCopied(false);
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
                      {loading ? (
                        <div className="skeleton-circle skeleton-shimmer"></div>
                      ) : (
                        <img
                          src={profileImage}
                          alt={author?.authorName || "Author"}
                          onError={(event) => {
                            event.currentTarget.src = AuthorImage;
                          }}
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <span className="skeleton-title skeleton-shimmer d-inline-block"></span>
                          ) : (
                            author?.authorName || "Unknown Author"
                          )}
                          <span className="profile_username">
                            {loading ? "" : author?.tag || ""}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? "" : author?.address || ""}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            type="button"
                            onClick={handleCopyWallet}
                            disabled={loading || !author?.address}
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
                        {loading ? "Loading followers..." : `${displayedFollowers} followers`}
                      </div>
                      <button
                        className="btn-main"
                        type="button"
                        onClick={handleFollowClick}
                        disabled={loading || !author}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {error && <p>{error}</p>}
                  {!loading && !error && !author && (
                    <p>Select an author to view profile details.</p>
                  )}
                  {(loading || author) && <AuthorItems author={author} loading={loading} />}
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
