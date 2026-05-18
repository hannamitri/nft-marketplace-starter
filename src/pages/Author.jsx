import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import { buildAuthorsUrl, MIN_SKELETON_MS } from "../constants/api";

const AuthorProfileSkeleton = () => (
  <section aria-label="section">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="d_profile de-flex">
            <div className="de-flex-col">
              <div className="profile_avatar">
                <span className="nft-skeleton__shimmer d-inline-block author-skeleton__avatar" />
                <div className="profile_name mt-3">
                  <span className="nft-skeleton__shimmer d-block author-skeleton__title" />
                  <span className="nft-skeleton__shimmer d-block author-skeleton__sub mt-2" />
                  <span className="nft-skeleton__shimmer d-block author-skeleton__wallet mt-3" />
                </div>
              </div>
            </div>
            <div className="profile_follow de-flex">
              <div className="de-flex-col">
                <span className="nft-skeleton__shimmer d-block author-skeleton__followers mb-2" />
                <span className="nft-skeleton__shimmer d-inline-block author-skeleton__btn" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="row">
            {Array.from({ length: 4 }, (_, i) => (
              <div className="col-lg-3 col-md-6 mb-4" key={`author-grid-skel-${i}`}>
                <span className="nft-skeleton__shimmer d-block author-skeleton__card" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(Boolean(authorId));
  const [error, setError] = useState("");
  const [followSessionDelta, setFollowSessionDelta] = useState(0);

  useEffect(() => {
    if (!authorId) {
      setAuthor(null);
      setLoading(false);
      setError("");
      setFollowSessionDelta(0);
      return undefined;
    }

    const controller = new AbortController();
    const minDisplayPromise = new Promise((resolve) => {
      setTimeout(resolve, MIN_SKELETON_MS);
    });

    const loadAuthor = async () => {
      try {
        setLoading(true);
        setError("");
        setAuthor(null);
        setFollowSessionDelta(0);

        const response = await fetch(buildAuthorsUrl(authorId), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Author request failed with status ${response.status}`);
        }
        const payload = await response.json();
        if (!payload || typeof payload !== "object") {
          throw new Error("Invalid author response.");
        }
        setAuthor({
          ...payload,
          authorId: payload.authorId ?? authorId,
        });
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Unable to load this author. Please try again later.");
          setAuthor(null);
        }
      } finally {
        await minDisplayPromise;
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadAuthor();

    return () => controller.abort();
  }, [authorId]);

  const handleCopyWallet = () => {
    if (author?.address && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(author.address);
    }
  };

  const handleFollowClick = () => {
    setFollowSessionDelta((count) => count + 1);
  };

  const showProfileShell = authorId && !loading && !error && author;

  const baseFollowers = Number.isFinite(Number(author?.followers))
    ? Number(author.followers)
    : 0;
  const displayedFollowers = Math.max(0, baseFollowers + followSessionDelta);
  const stateAuthorImage =
    typeof location.state?.authorImage === "string"
      ? location.state.authorImage
      : "";
  const profileImage = author?.authorImage || stateAuthorImage || AuthorImage;

  const handleProfileImageError = (event) => {
    if (event.currentTarget.src !== AuthorImage) {
      event.currentTarget.src = AuthorImage;
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

        {!authorId && (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center py-5">
                  <p>No author selected.</p>
                  <Link to="/explore" className="btn-main">
                    Browse Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {authorId && loading && <AuthorProfileSkeleton />}

        {authorId && !loading && error && (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center py-5">
                  <p>{error}</p>
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {showProfileShell && (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img
                          src={profileImage}
                          alt={author.authorName || "Author"}
                          onError={handleProfileImageError}
                        />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName || "Unknown author"}
                            <span className="profile_username">
                              @{author.tag || "creator"}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address || ""}
                            </span>
                            <button
                              id="btn_copy"
                              type="button"
                              title="Copy wallet address"
                              onClick={handleCopyWallet}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {displayedFollowers} followers
                        </div>
                        <button
                          type="button"
                          className="btn-main"
                          aria-label="Follow author"
                          onClick={handleFollowClick}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Author;
