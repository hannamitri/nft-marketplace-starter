import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorInfo, setAuthorInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(true);

  async function fetchAuthor() {
    try {
      const authorRoute = authorId ? `?author=${authorId}` : "";
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors${authorRoute}`
      );
      setAuthorInfo(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error finding ths author: ", error);
      setIsLoading(false);
    }
  }

  const followToggle = () => {
    setIsFollowing((prevFollowing) => {
      const newFollowingState = !prevFollowing;
      const newfollowerCount = newFollowingState
        ? authorInfo.followers - 1
        : authorInfo.followers + 1;

      setAuthorInfo((prevAuthor) => ({
        ...prevAuthor,
        followers: newfollowerCount,
      }));

      return newFollowingState;
    });
  };

  useEffect(() => {
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
        {isLoading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"50%"}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width={"200px"}
                              height={"30px"}
                              borderRadius={"12px"}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={"100px"}
                                height={"20px"}
                                borderRadius={"8px"}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width={"200px"}
                                height={"15px"}
                                borderRadius={"6px"}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton
                            width={"104px"}
                            height={"26px"}
                            borderRadius={"8px"}
                          />
                        </div>
                        <Skeleton
                          width={"122px"}
                          height={"42px"}
                          borderRadius={"8px"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {new Array(8).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width={"50px"}
                          height={"50px"}
                          borderRadius={"50%"}
                        />
                      </div>
                      <div className="nft__item_wrap">
                        <Skeleton
                          width={"100%"}
                          height={"225px"}
                          borderRadius={"8px"}
                        />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton
                          width={"100px"}
                          height={"20px"}
                          borderRadius={"8px"}
                        />
                        <div className="nft__item_price">
                          <Skeleton
                            width={"50px"}
                            height={"20px"}
                            borderRadius={"8px"}
                          />
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>
                            <Skeleton
                              width={"15px"}
                              height={"15px"}
                              borderRadius={"4px"}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                        <img src={authorInfo.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorInfo.authorName}
                            <span className="profile_username">
                              @{authorInfo.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorInfo.address}
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
                          {authorInfo.followers}
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={followToggle}
                        >
                          {isFollowing ? "Follow" : "Unfollow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      authorInfo={authorInfo}
                      setAuthorInfo={setAuthorInfo}
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
