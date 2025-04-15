import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Skeleton from "../components/UI/Skeleton";


const Author = () => {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [collection, setCollection] = useState([]);
  const { authorId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchAuthors() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setLoading(false);
    setCollection(response.data.nftCollection);
    setAuthor(response.data);
  }

  useEffect(() => {
    fetchAuthors();
  }, []);

  function followBtn() {
    setIsFollowing((prev) => !prev);
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

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <Skeleton width={70} height={70} borderRadius={50} />
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton width={160} height={44} borderRadius={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      {loading ? (
                        
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill(0).map((_, index) => (
                              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                                <div className="nft__item">
                                  <div className="author_list_pp">
                                    <Skeleton width={50} height={50} borderRadius={50} />
                                  </div>
                                  <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                      <div className="nft__item_buttons">
                                        <button>Buy Now</button>
                                        <div className="nft__item_share">
                                          <h4>Share</h4>
                                          <a href="" target="_blank" rel="noreferrer">
                                            <i className="fa fa-facebook fa-lg"></i>
                                          </a>
                                          <a href="" target="_blank" rel="noreferrer">
                                            <i className="fa fa-twitter fa-lg"></i>
                                          </a>
                                          <a href="">
                                            <i className="fa fa-envelope fa-lg"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <Skeleton width="100%" height="100%" borderRadius={8} />
                                  </div>
                                  <div className="nft__item_info">
                                    <Link to="/item-details">
                                      <h4>
                                        <Skeleton width={30} height={16} borderRadius={4} />
                                      </h4>
                                    </Link>
                                    <div className="nft__item_price">
                                      <Skeleton width={24} height={16} borderRadius={4} />
                                    </div>
                                    <div className="nft__item_like">
                                      <span>
                                        <Skeleton width={30} height={16} borderRadius={4} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      ) : (
                        <AuthorItems author={author} collection={collection} />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                                {author.tag}
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
                          <div className="profile_follower">
                            {isFollowing
                              ? author.followers + 1
                              : author.followers}{" "}
                            followers
                          </div>
                          <button
                            onClick={followBtn}
                            to="#"
                            className="btn-main"
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems author={author} collection={collection} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
