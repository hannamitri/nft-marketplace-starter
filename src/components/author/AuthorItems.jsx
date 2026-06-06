import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthor = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        const data = await response.json();
        const authorData = Array.isArray(data) ? data[0] : data;

        setAuthor(authorData || null);
        setFollowers(authorData?.followers || 0);
      } catch (error) {
        console.log("AUTHOR ERROR:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const toggleFollow = () => {
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div id="content" className="no-bottom no-top">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background: "#eee",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {new Array(8).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft__item">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "#eee",
                          marginBottom: "12px",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "8px",
                          background: "#eee",
                          marginBottom: "12px",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "70%",
                          height: "22px",
                          borderRadius: "4px",
                          background: "#eee",
                          marginBottom: "8px",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "40%",
                          height: "18px",
                          borderRadius: "4px",
                          background: "#eee",
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
  }

  if (!author) {
    return <div className="container pt-5 mt-5">Author not found.</div>;
  }

  const authorNfts = author.nftCollection || [];

  return (
    <div id="wrapper">
      <div id="content" className="no-bottom no-top">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
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
                            title="Copy Text"
                            onClick={() =>
                              navigator.clipboard.writeText(author.address)
                            }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follower">
                    {followers} followers
                  </div>

                  <div className="de-flex-col">
                    <div className="profile_follow">
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {authorNfts.map((nft) => (
                <div
                  key={nft.nftId || nft.id}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${id}`}>
                        <img
                          className="lazy pp-author"
                          src={author.authorImage}
                          alt={author.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/hot/${nft.nftId || nft.id}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt={nft.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/hot/${nft.nftId || nft.id}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
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