import React, { useCallback, useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [follow, setFollow] = useState(false);
  const { authorId } = useParams();

  const getAuthor = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setLoading(false);
  }, [authorId]);
  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

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
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={110} height={110} borderRadius={999} />
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width={150}
                              height={20}
                              borderRadius={1}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={70}
                                height={15}
                                borderRadius={1}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                height={13}
                                width={150}
                                borderRadius={1}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width={90} height={25} borderRadius={1} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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
                          {author.followers + (follow ? 1 : 0)} followers
                        </div>
                        {follow ? (
                          <Link
                            onClick={() => setFollow(!follow)}
                            to="#"
                            className="btn-main"
                          >
                            Unfollow
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => setFollow(!follow)}
                          >
                            Follow
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
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
