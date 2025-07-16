import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const changeFollowButton = () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed == false) {
      setAuthorInfo({ ...authorInfo, followers: authorInfo.followers + 1 });
    } else {
      setAuthorInfo({ ...authorInfo, followers: authorInfo.followers - 1 });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorInfo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authorId]);

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
          {authorInfo ? (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorInfo?.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorInfo?.authorName}
                            <span className="profile_username">{`@${authorInfo?.tag}`}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorInfo?.address}
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
                        <div className="profile_follower">{`${authorInfo?.followers} followers`}</div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={changeFollowButton}
                        >
                          {isSubscribed ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorInfo={authorInfo} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"100%"}
                        ></Skeleton>

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={"160px"} height={"20px"} />

                            <span className="profile_username">
                              {" "}
                              <Skeleton width={"80px"} height={"20px"} />
                            </span>
                            <span className="profile_wallet">
                              <Skeleton width={"200px"} height={"20px"} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width={"220px"} height={"42px"} />
                      </div>
                    </div>
                  </div>
                </div>

                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ display: "block", backgroundSize: "cover" }}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"25px"}
                        />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={"100%"} height={"100%"} />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton
                          width={"160px"}
                          height={"20px"}
                          marginTop={"4px"}
                        />
                        <div className="nft__item_price">
                          <Skeleton width={"90px"} height={"20px"} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={"28px"} height={"20px"} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Author;