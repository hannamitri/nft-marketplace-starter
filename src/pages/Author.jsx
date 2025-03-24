import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import {  useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  async function getData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    const itemsWithAuthorImage = response.data.nftCollection.map((item) => ({
      ...item,
      authorImage: response.data.authorImage,
    }));

    setItems({ ...response.data, nftCollection: itemsWithAuthorImage });
    setFollowers(response.data.followers);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (authorId) {
      getData();
    }

  setTimeout(() => {
    setLoading(false);
  }, 500);
}, [authorId]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers((prev) => Math.max(0, prev - 1));
    } else {
      setFollowers((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

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
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={items.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton
                              width="150px"
                              height="20px"
                              borderRadius="4px"
                            />
                          ) : (
                            items.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton
                                width="100px"
                                height="15px"
                                borderRadius="4px"
                              />
                            ) : (
                              `@${items.tag}`
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton
                                width="200px"
                                height="15px"
                                borderRadius="4px"
                              />
                            ) : (
                              items.address
                            )}
                          </span>
                          <button
                            className="ml-1"
                            id="btn_copy"
                            title="Copy Text"
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                      )}
                      <button className="btn-main m-2" onClick={handleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={items.nftCollection || []}
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
