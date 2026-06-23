import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId = "73855012" } = useParams();
  const [authorProfile, setAuthorProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    async function getAuthorProfile() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        setAuthorProfile(response.data);
        setFollowerCount(response.data?.followers ?? 0);
      } catch (error) {
        console.error("Failed to load author profile:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getAuthorProfile();
  }, [authorId]);

  const handleFollowToggle = () => {
    setIsFollowing((currentIsFollowing) => {
      setFollowerCount((currentFollowerCount) =>
        currentIsFollowing ? currentFollowerCount - 1 : currentFollowerCount + 1,
      );

      return !currentIsFollowing;
    });
  };

  const displayName = authorProfile?.authorName || "Lori Hart";
  const displayTag = authorProfile?.tag ? `@${authorProfile.tag}` : "@harttttt";
  const displayWallet =
    authorProfile?.address || "Author wallet unavailable";
  const displayImage = authorProfile?.authorImage || AuthorImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-aos="fade-up"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex" data-aos="fade-up">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isLoading ? (
                        <Skeleton width="150px" height="150px" borderRadius="75px" />
                      ) : (
                        <>
                          <img src={displayImage} alt={displayName} />
                          <i className="fa fa-check"></i>
                        </>
                      )}
                      <div className="profile_name">
                        <h4>
                          {isLoading ? (
                            <>
                              <Skeleton
                                width="220px"
                                height="32px"
                                borderRadius="4px"
                              />
                              <div style={{ marginTop: "8px" }}>
                                <Skeleton
                                  width="120px"
                                  height="20px"
                                  borderRadius="4px"
                                />
                              </div>
                              <div style={{ marginTop: "8px" }}>
                                <Skeleton
                                  width="340px"
                                  height="18px"
                                  borderRadius="4px"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              {displayName}
                              <span className="profile_username">{displayTag}</span>
                              <span id="wallet" className="profile_wallet">
                                {displayWallet}
                              </span>
                            </>
                          )}
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
                        {isLoading ? (
                          <Skeleton
                            width="140px"
                            height="20px"
                            borderRadius="4px"
                          />
                        ) : (
                          `${followerCount} followers`
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollowToggle}
                        disabled={isLoading}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple" data-aos="fade-up">
                  <AuthorItems />
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
