import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [authorData, setAuthorData] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followed, setFollowed] = useState(false);
  const [nftList, setNftList] = useState([]);

  async function loadData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id.replace(
        ":",
        ""
      )}`
    );
    setAuthorData(data);
    setFollowerCount(data.followers);
    setNftList(data.nftCollection);
    setLoading(false);
  }

  function increaseFollow() {
    setFollowerCount(followerCount + 1);
    setFollowed(true);
  }

  function decreaseFollow() {
    setFollowerCount(followerCount - 1);
    setFollowed(false);
  }

  function changeFollowerCount() {
    followed ? decreaseFollow() : increaseFollow();
  }

  useEffect(() => {
    loadData();
  }, []);

  console.log(id);

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
                      {loading ? (
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={150}
                          height={150}
                        ></Skeleton>
                      ) : (
                        <img src={authorData.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton animation="wave" width={100}></Skeleton>
                          ) : (
                            authorData.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton animation="wave" width={100}></Skeleton>
                            ) : (
                              `@${authorData.tag}`
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton animation="wave" width={150}></Skeleton>
                            ) : (
                              authorData.address
                            )}
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
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          width={100}
                          style={{ marginRight: "10px" }}
                        ></Skeleton>
                      ) : (
                        <div className="profile_follower">{`${followerCount} followers`}</div>
                      )}
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={changeFollowerCount}
                      >
                        {followed ? `Unfollow` : `Follow`}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    AuthorImage={authorData.authorImage}
                    nftCollection={nftList}
                    loading={loading}
                  />
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
