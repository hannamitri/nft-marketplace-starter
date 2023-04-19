import React, { useEffect, useState, useLayoutEffect } from "react";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_banner.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [getAuthor, setGetAuthor] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [following, setFollowing] = useState();

  async function authorItems() {
    setLoadingSkeleton(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setGetAuthor(data);
    setLoadingSkeleton(false);
  }

  const followers = () => {
    setFollowing(!following);
  };

  useLayoutEffect(() => {
    setLoadingSkeleton(false);
  }, []);

  useEffect(() => {
    authorItems();
  }, []);

  return (
    <div id="wrapper">
      <div key={getAuthor.id} className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loadingSkeleton ? (
          <Skeleton width={"100%"} height={"360px"} />
        ) : (
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorImage}) top` }}
          ></section>
        )}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loadingSkeleton ? (
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"100%"}
                        />
                      ) : (
                        <img src={getAuthor.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loadingSkeleton ? (
                          <h4>
                            <Skeleton
                              width={"100%"}
                              maxWidth={"100px"}
                              height={"20px"}
                              display={"flex"}
                            />
                            <Skeleton
                              width={"100%"}
                              maxWidth={"70px"}
                              height={"20px"}
                              margin={"12px 0 0 0"}
                            >
                              <span className="profile_username">
                                {getAuthor.tag}
                              </span>
                            </Skeleton>
                            <span
                              id="wallet"
                              className="profile_wallet"
                              style={{ visibility: "hidden" }}
                            >
                              {getAuthor.address}
                            </span>
                            <Skeleton
                              width={"100%"}
                              maxWidth={"100px"}
                              display={"flex"}
                            >
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </Skeleton>
                          </h4>
                        ) : (
                          <h4>
                            {getAuthor.authorName}
                            <span className="profile_username">
                              {getAuthor.tag}
                            </span>
                            {loadingSkeleton ? (
                              <Skeleton
                                width={"100%"}
                                maxWidth={"100px"}
                                height={"20px"}
                              />
                            ) : (
                              <span id="wallet" className="profile_wallet">
                                {getAuthor.address}
                              </span>
                            )}
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  {loadingSkeleton ? (
                    <>
                      <Skeleton />
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "40px",
                          maxWidth: "180px",
                          marginTop: "50px",
                        }}
                      ></div>
                    </>
                  ) : (
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {following
                            ? getAuthor.followers + 1
                            : getAuthor.followers}
                        </div>
                        <Link
                          to=""
                          className="btn-main"
                          onClick={() => followers()}
                        >
                          {following ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems getAuthor={getAuthor} />
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
