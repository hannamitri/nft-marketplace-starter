import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }

        const data = await response.json();

        setAuthor(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, []);

  const handleFollow = () => {
    if (isFollowing) {
      return;
    }

    setAuthor((previousAuthor) => ({
      ...previousAuthor,
      followers: Number(previousAuthor.followers) + 1,
    }));

    setIsFollowing(true);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(author.address);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  if (loading) {
    return <AuthorSkeleton />;
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3>Unable to load author</h3>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
            backgroundSize: "cover",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="d_profile de-flex"
                  data-aos="fade-up"
                  data-aos-duration="650"
                  data-aos-once="true"
                >
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            type="button"
                            title="Copy wallet address"
                            onClick={copyAddress}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author.nftCollection}
                    authorImage={author.authorImage}
                    authorName={author.authorName}
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

const AuthorSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <div
          className="skeleton"
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "0",
          }}
        ></div>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "30px",
                    marginBottom: "50px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div
                      className="skeleton"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    ></div>

                    <div>
                      <div
                        className="skeleton"
                        style={{
                          width: "180px",
                          height: "28px",
                          marginBottom: "12px",
                        }}
                      ></div>

                      <div
                        className="skeleton"
                        style={{
                          width: "120px",
                          height: "16px",
                          marginBottom: "12px",
                        }}
                      ></div>

                      <div
                        className="skeleton"
                        style={{
                          width: "280px",
                          height: "18px",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="skeleton"
                      style={{
                        width: "110px",
                        height: "18px",
                        marginBottom: "15px",
                      }}
                    ></div>

                    <div
                      className="skeleton"
                      style={{
                        width: "100px",
                        height: "42px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div
                      className="skeleton"
                      style={{
                        width: "100%",
                        height: "250px",
                        marginBottom: "20px",
                      }}
                    ></div>

                    <div
                      className="skeleton"
                      style={{
                        width: "70%",
                        height: "20px",
                        marginBottom: "10px",
                      }}
                    ></div>

                    <div
                      className="skeleton"
                      style={{
                        width: "40%",
                        height: "16px",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
