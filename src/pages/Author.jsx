import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useAuthor } from "../hooks/useAuthor";


const Author = () => {
  const { authorId } = useParams();
  const { author, loading, error } = useAuthor(authorId);


  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (author) {
      setFollowers(author.followers);
    }
  }, [author]);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };


  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  if (loading) {
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
                        {/* Skeleton avatar */}
                        <div
                          className="skeleton-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                          }}
                        ></div>
                        <div className="profile_name">
                          <h4>
                            {/* Skeleton name */}
                            <div
                              style={{
                                width: "160px",
                                height: "20px",
                                borderRadius: "4px",
                                marginBottom: "8px",
                                background:
                                  "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite",
                              }}
                            ></div>
                            {/* Skeleton username */}
                            <div
                              style={{
                                width: "120px",
                                height: "14px",
                                borderRadius: "4px",
                                marginBottom: "8px",
                                background:
                                  "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite",
                              }}
                            ></div>
                            {/* Skeleton wallet */}
                            <div
                              style={{
                                width: "280px",
                                height: "14px",
                                borderRadius: "4px",
                                background:
                                  "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite",
                              }}
                            ></div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {/* Skeleton followers */}
                        <div
                          style={{
                            width: "100px",
                            height: "16px",
                            borderRadius: "4px",
                            marginBottom: "12px",
                            background:
                              "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center" style={{ padding: "80px 0" }}>
                  <p>Error: {error}</p>
                  <button
                    className="btn-main"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  if (!author) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center" style={{ padding: "80px 0" }}>
                  <p>Author not found.</p>
                  <Link to="/" className="btn-main">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


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
                  <div className="de-flex-col" data-aos="fade-right">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
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
                  <div className="profile_follow de-flex" data-aos="fade-left">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followers} followers
                      </div>
                      <button className="btn-main" onClick={handleFollow}>
                        {isFollowing ? "Following" : "Follow"}
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
      </div>

      {/* Toast notification — renders on copy, auto-dismisses after 2s */}
      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#333",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease",
          }}
        >
          ✓ Wallet address copied!
        </div>
      )}
    </div>
  );
};

export default Author;