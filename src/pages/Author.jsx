import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const params = useParams();
  const authorId = params.authorId || params.id;

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!authorId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching author details:", err);
        setLoading(false);
      });
  }, [authorId]);

  const toggleFollow = () => {
    if (following) {
      setAuthor((prev) => ({ ...prev, followers: prev.followers - 1 }));
      setFollowing(false);
    } else {
      setAuthor((prev) => ({ ...prev, followers: prev.followers + 1 }));
      setFollowing(true);
    }
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "120px 0" }}>
        <h3>Loading author details...</h3>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container text-center" style={{ padding: "120px 0" }}>
        <h3>Author not found</h3>
      </div>
    );
  }

  const authorName = author.authorName || author.name || "Unknown Author";
  const username =
    author.tag ||
    author.username ||
    (author.authorName ? author.authorName.toLowerCase().replace(/\s+/g, "") : "author");

  const collection = author.nftCollection || author.items || [];

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        {/* BANNER SECTION */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${author.authorBanner || "/images/author_banner.jpg"}) center`,
            backgroundSize: "cover",
            minHeight: "250px",
          }}
        ></section>

        {/* AUTHOR PROFILE HEADER */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage || "/images/author_thumbnail.jpg"}
                        alt={authorName}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">@{username}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex-col">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTHOR ITEMS / COLLECTION GRID */}
              <div className="col-md-12 mt-5">
                <div className="row">
                  {collection.length > 0 ? (
                    collection.map((item) => {
                      const itemId = item.nftId || item.id;
                      const itemImg = item.nftImage || item.image;

                      return (
                        <div
                          key={itemId}
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                        >
                          <div className="nft__item">
                            <div className="author_list_pp">
                              <Link to={`/author/${authorId}`}>
                                <img
                                  className="lazy"
                                  src={author.authorImage}
                                  alt={authorName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <div className="nft__item_wrap">
                              <Link to={`/item-details/${itemId}`}>
                                <img
                                  src={itemImg}
                                  className="lazy nft__item_preview"
                                  alt={item.title || "NFT"}
                                />
                              </Link>
                            </div>

                            <div className="nft__item_info">
                              <Link to={`/item-details/${itemId}`}>
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
                      );
                    })
                  ) : (
                    <div className="col-12 text-center my-4">
                      <p>No items found for this author.</p>
                    </div>
                  )}
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





