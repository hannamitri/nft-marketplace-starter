import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [loading, setLoading] = useState();
  const [authorData, setAuthorData] = useState([]);
  const [followerCount, setFollowerCount] = useState(false);

  const { authorId } = useParams();
  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthorData(data);
    setLoading(false);
  }

  function changeFollowing() {
    setFollowerCount((prev) => !prev);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
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
        {loading === false ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              {authorData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
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
                          {followerCount
                            ? `${authorData.followers + 1} followers`
                            : `${authorData.followers} followers`}
                        </div>
                        <button
                          to="#"
                          className="btn-main"
                          onClick={() => changeFollowing()}
                        >
                          {followerCount ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      data={authorData.nftCollection}
                      authorId={authorData.authorId}
                      authorImage={authorData.authorImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          new Array(1).fill(0).map(() => (
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={999}
                          />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton
                                width={120}
                                height={20}
                                borderRadius={40}
                              />
                              <span className="profile_username">
                                <Skeleton
                                  width={60}
                                  height={12}
                                  borderRadius={40}
                                />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton
                                  width={200}
                                  height={16}
                                  borderRadius={40}
                                />
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
                            <Skeleton
                              width={80}
                              height={16}
                              borderRadius={40}
                            />
                          </div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="row">
                        {new Array(8).fill(0).map((_, index) => (
                          <div
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            key={index}
                          >
                            <Skeleton
                              width={"100%"}
                              height={400}
                              borderRadius={16}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Author;
