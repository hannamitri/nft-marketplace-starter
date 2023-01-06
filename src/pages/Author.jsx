import React, { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const Author = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { authorId } = location.state;

  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const [following, setFollowing] = useState(false);

  async function getAuthor() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setLoading(false);
  }

  function changeFollowing(following) {
    setFollowing(!following);
  }

  useEffect(() => {
    getAuthor();
  }, []);

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

        {loading === true ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          height={140}
                          width={145}
                        ></Skeleton>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              animation="wave"
                              width={200}
                              height={30}
                            />
                            <span className="profile_username">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={100}
                                height={20}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={200}
                                height={25}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton animation="wave" width={150} height={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {new Array(8).fill(0).map((_, index) => (
                            <div
                              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              key={index}
                            >
                              <Skeleton
                                animation="wave"
                                width={260}
                                height={550}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
                        {following === false ? (
                          <>
                            <div className="profile_follower">
                              {author.followers} followers
                            </div>
                            <button
                              className="btn-main"
                              onClick={() => changeFollowing(false)}
                            >
                              follow
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="profile_follower">
                              {author.followers + 1} followers
                            </div>
                            <button
                              className="btn-main"
                              onClick={() => changeFollowing(true)}
                            >
                              Unfollow
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={author.nftCollection}
                      authorId={author.authorId}
                      authorImage={author.authorImage}
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
