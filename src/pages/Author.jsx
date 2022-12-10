import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const { id } = useParams();
  async function getAuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(data);
    setLoading(false);
  }
  useEffect(() => {
    getAuthorData();
  }, []);

  function isFollowed() {
    setFollowed(!followed);
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

        {loading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={150} height={150} borderRadius={200} />
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width={150}
                              height={25}
                              borderRadius={1}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={1}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width={200}
                                height={20}
                                borderRadius={1}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={120} height={25} borderRadius={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="tab-1">
                      <div className="row">
                        {new Array(8).fill(0).map((_, index) => (
                          <div
                            key={index}
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            <Skeleton width="100%" height="400px" />
                          </div>
                        ))}
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
                        <img src={authorData.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              @{authorData.tag}
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
                        {followed ? (
                          <>
                            <div className="profile_follower">
                              {authorData.followers + 1} followers
                            </div>
                            <button className="btn-main" onClick={isFollowed}>
                              Unfollow
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="profile_follower">
                              {authorData.followers} followers
                            </div>
                            <button className="btn-main" onClick={isFollowed}>
                              Follow
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
                      items={authorData.nftCollection}
                      authorId={authorData.authorId}
                      authorImage={authorData.authorImage}
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
