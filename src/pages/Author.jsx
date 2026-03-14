import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=";

const Author = () => {
  // Destructure the apiId parameter from the URL
  const { authId } = useParams();
  const [authorInfo, setAuthorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState();

  //Axios API call
  async function getAuthorInfo() {
    const response = await axios.get(BASE_URL + authId);
    setAuthorInfo(response.data);
    setFollowCount(response.data.followers);
    setLoading(false);
  }

  function followBtn() {
    setIsFollowing(!isFollowing);
    {
      !isFollowing
        ? setFollowCount(authorInfo.followers + 1)
        : setFollowCount(authorInfo.followers);
    }
  }

  useEffect(() => {
    getAuthorInfo();
  }, [authId]);

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
                          width="150px"
                          height="150px"
                          borderRadius="100%"
                        />
                      ) : (
                        <>
                          <img src={authorInfo.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </>
                      )}
                      <div className="profile_name">
                        {loading ? (
                          <>
                            <h4>
                              <Skeleton
                                width="200px"
                                height="32px"
                                borderRadius="8px"
                              />
                              <span className="profile_username">
                                <Skeleton
                                  width="200px"
                                  height="24px"
                                  borderRadius="8px"
                                />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton
                                  width="100px"
                                  height="24px"
                                  borderRadius="8px"
                                />
                              </span>
                            </h4>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <div className="profile_follower">
                            <Skeleton
                              width="100px"
                              height="24px"
                              borderRadius="8px"
                            />
                          </div>
                          <Skeleton
                            width="120px"
                            height="40px"
                            borderRadius="8px"
                          />
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followCount} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={followBtn}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    data={authorInfo.nftCollection}
                    authorImage={authorInfo.authorImage}
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
