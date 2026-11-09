import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import "./Author.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const COLUMN_CLASS = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12";

const SkeletonCard = () => (
  <div className={COLUMN_CLASS} style={{ display: "block" }}>
    <div className="nft__item au-skeleton">
      <div className="au-skeleton__img" />
      <span className="au-skeleton__line" />
      <span className="au-skeleton__line au-skeleton__line--short" />
    </div>
  </div>
);

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load the author again whenever the id in the URL changes.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setFollowing(false);

    fetch(`${API_URL}?author=${authorId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    window.scrollTo(0, 0);
    return () => controller.abort();
  }, [authorId]);

  const handleCopy = () => {
    if (!author) return;
    navigator.clipboard
      .writeText(author.address)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  // Follow only changes the number on screen; the API has no follow endpoint.
  const followers = author ? author.followers + (following ? 1 : 0) : 0;

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
            {error && (
              <p className="text-center au-error">
                This author couldn’t be loaded. Check the link or{" "}
                <Link to="/explore">browse all items</Link>.
              </p>
            )}

            {!error && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex" data-aos="fade-up">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        {loading ? (
                          <div className="au-skeleton__avatar" />
                        ) : (
                          <>
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
                                <span id="wallet" className="profile_wallet">
                                  {author.address}
                                </span>
                                <button
                                  id="btn_copy"
                                  type="button"
                                  title="Copy Text"
                                  onClick={handleCopy}
                                >
                                  {copied ? "Copied" : "Copy"}
                                </button>
                              </h4>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {!loading && (
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <button
                            type="button"
                            className="btn-main"
                            onClick={() => setFollowing((f) => !f)}
                          >
                            {following ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {loading &&
                            Array.from({ length: 8 }, (_, i) => (
                              <SkeletonCard key={i} />
                            ))}

                          {!loading &&
                            author.nftCollection.map((item, index) => (
                              <div
                                key={item.id}
                                className={COLUMN_CLASS}
                                style={{
                                  display: "block",
                                  backgroundSize: "cover",
                                }}
                              >
                                <div
                                  className="nft__item"
                                  data-aos="fade-up"
                                  data-aos-delay={(index % 4) * 100}
                                >
                                  <div className="author_list_pp">
                                    <Link to={`/author/${author.authorId}`}>
                                      <img
                                        className="lazy"
                                        src={author.authorImage}
                                        alt={author.authorName}
                                        loading="lazy"
                                      />
                                      <i className="fa fa-check"></i>
                                    </Link>
                                  </div>

                                  <div className="nft__item_wrap">
                                    <Link to={`/item-details/${item.nftId}`}>
                                      <img
                                        src={item.nftImage}
                                        className="lazy nft__item_preview"
                                        alt={item.title}
                                        loading="lazy"
                                      />
                                    </Link>
                                  </div>

                                  <div className="nft__item_info">
                                    <Link to={`/item-details/${item.nftId}`}>
                                      <h4>{item.title}</h4>
                                    </Link>
                                    <div className="nft__item_price">
                                      {item.price} ETH
                                    </div>
                                    <div className="nft__item_like">
                                      <i className="fa fa-heart"></i>
                                      <span>{item.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
