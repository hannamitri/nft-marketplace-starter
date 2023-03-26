import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // set initial value to false

  const [isFollowing, setIsFollowing] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((res) => {
        setAuthor(res.data);
        setIsLoading(false); // set to false after getting data
      });
  }, [isLoading]);

  function follow() {
    setIsFollowing(!isFollowing);
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isLoading ? (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {isLoading ? (
                            <>
                              <div
                                className="skeleton-box"
                                style={{ width: "200px" }}
                              ></div>
                              <br />
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "100px",
                                  height: "16px",
                                  marginTop: "5px",
                                }}
                              ></div>
                              <br />
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "250px",
                                  height: "16px",
                                  marginTop: "5px",
                                }}
                              ></div>
                            </>
                          ) : (
                            <>
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
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {isLoading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: "150px", height: "40px" }}
                        ></div>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {isFollowing
                              ? author.followers + 1
                              : author.followers}{" "}
                            followers
                          </div>
                          <div className="following" onClick={follow}>
                            <Link to="#" className="btn-main">
                              {isFollowing ? <>Unfollow</> : <>Follow</>}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} isLoading={isLoading} />
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
