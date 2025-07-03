import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState("Follow");
  const { authorId } = useParams();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      setTimeout(async () => {
        try {
          const { data } = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
          );
          setAuthorData(data);
        } catch (error) {
          console.error("Error fetching author data", error);
        } finally {
          setLoading(false);
        }
      }, 5000); // Adjust delay as needed
    };

    fetchData();
  }, [authorId]);

  const handleFollowToggle = () => {
    if (!authorData) return;

    const updatedFollowers =
      follow === "Follow"
        ? authorData.followers + 1
        : authorData.followers - 1;

    setAuthorData({ ...authorData, followers: updatedFollowers });
    setFollow(follow === "Follow" ? "Unfollow" : "Follow");
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* Profile Header */}
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton circle height={100} width={100} />
                      ) : (
                        <img src={authorData.authorImage} alt="author" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width={200} />
                          ) : (
                            <>
                              {authorData.authorName}
                              <span className="profile_username">
                                {authorData.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Address"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    authorData.address
                                  )
                                }
                              >
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
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width={80} />
                        ) : (
                          `${authorData.followers} followers`
                        )}
                      </div>
                      {loading ? (
                        <Skeleton width={90} height={40} />
                      ) : (
                        <Link to="#" className="btn-main" onClick={handleFollowToggle}>
                          {follow}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* NFT Items */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData?.nftCollection || []}
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