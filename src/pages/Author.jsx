import React, { useState, useEffect } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AuthorBanner from "../images/author_banner.jpg";


const Author = () => {
  const { id } = useParams();
  const [author, getAuthorData] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const [following, setFollowing] = useState(false);

  async function getAuthor() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    getAuthorData(data);
    setLoading(false);
  }

  useEffect(() => {
    getAuthor();
  });

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
          <>
            <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={150} height={150} borderRadius={999} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width={200}
                              height={30}
                              borderRadius={0}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={100}
                                height={20}
                                borderRadius={0}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width={200}
                                height={25}
                                borderRadius={0}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={150} height={40} borderRadius={0} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} loading={loading}/>
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {new Array(8).fill(0).map((_, index) => (
                            <div
                              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              key={index}
                            >
                              <Skeleton
                                width={260}
                                height={400}
                                borderRadius={0}
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
          </>
        ) : (
          <>
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
                          <div className="profile_follower">
                            {author.followers + (following ? 1 : "")} followers
                            </div>
                            {!following ? (
                          <Link
                            to=""
                            onClick={() => setFollowing(true)}
                            className="btn-main"
                          >
                            Follow
                          </Link>
                        ) : (
                          <Link
                            to=""
                            onClick={() => setFollowing(false)}
                            className="btn-main"
                          >
                            Unfollow
                          </Link>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                      author={author}
                      loading={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
