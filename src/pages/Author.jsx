import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [collection, setCollection] = useState([]);
  const [itsFollowing, setItsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function main() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(data);
      setCollection(data.nftCollection);
      setLoading(false);
    }
    setTimeout(() => {
      main();
    }, 2000);
  }, []);

  function followBtn() {
    setItsFollowing(true);
  }

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
        {!loading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

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
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {!itsFollowing ? (
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                        ) : (
                          <div className="profile_follower">
                            {author.followers + 1} followers
                          </div>
                        )}
                        <Link
                          onClick={followBtn}
                          to="#"
                          className="btn-main btn-follow"
                        >
                          {!itsFollowing ? "Follow" : "Followed"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} collection={collection} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            height: "150px",
                            borderRadius: "100%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <div
                              style={{
                                width: "150px",
                                borderRadius: "4px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                height: "15px",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "100px",
                                borderRadius: "4px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                marginTop: "10px",
                                height: "15px",
                              }}
                              className="profile_username"
                            ></div>
                            <span
                              style={{
                                width: "140px",
                                borderRadius: "4px",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                marginTop: "10px",
                                height: "15px",
                              }}
                              id="wallet"
                              className="profile_wallet"
                            ></span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div
                          style={{
                            width: "120px",
                            borderRadius: "4px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            height: "15px",
                          }}
                          className="profile_follower"
                        ></div>
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            color: "rgba(0, 0, 0, 0)",
                            height: "40px",
                            width: "120px",
                            boxShadow: "none",
                            cursor: "default",
                          }}
                          className="btn-main btn-follow"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      author={author}
                      collection={collection}
                      loading={loading}
                    />
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
