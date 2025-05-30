import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import api from "../components/UI/Api";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false);
  const profileId = window.location.pathname.slice(8);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await api.get(`/authors?author=${profileId}`);
        setUserData(data);
      } catch (err) {
        setError(err.message || "Failed to load Author");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [profileId]);


  const followButton = () => {
    if (following) {
      setFollowing(false);
    } else {
      setFollowing(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
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
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"100px"}
                        />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width={"200px"}
                              height={"30px"}
                              borderRadius={"10px"}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width={"200px"}
                                height={"20px"}
                                borderRadius={"10px"}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width={"200px"}
                                height={"25px"}
                                borderRadius={"10px"}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton
                          width={"250px"}
                          height={"100px"}
                          borderRadius={"10px"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple row">
                    {new Array(8).fill(null).map((_, index) => (
                      <div
                        key={index}
                        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        style={{ display: "block", backgroundSize: "cover" }}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="100px"
                            />
                          </div>
                          <div className="de_countdown-skeleton">
                            <Skeleton
                              width="112.86px"
                              height="32px"
                              borderRadius="10px"
                            />
                          </div>
                          <div className="nft__item_wrap">
                            <Skeleton
                              width="264px"
                              height="264px"
                              borderRadius="10px"
                            />
                          </div>
                          <div className="nft__item_info">
                            <Skeleton
                              width="264px"
                              height="49px"
                              borderRadius="5px"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
                        <img src={userData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {userData.authorName}
                            <span className="profile_username">
                              @{userData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {userData.address}
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
                        <div className="profile_follower">{`${following ? userData.followers + 1 : userData.followers} Followers`}</div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={followButton}
                        >
                          {`${!following ? "Follow" : "Unfollow"}`}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems userData={userData} />
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
