import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingState from "../components/LoadingState";

const Author = () => {
  const { Id } = useParams();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAuthorInfo() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${Id}`
      );
        setAuthorInfo(data);
        setLoading(false);
    }

    getAuthorInfo();
  }, [Id]);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
    setAuthorInfo((prev) => ({
      ...prev,
      followers: prev.followers + (isFollowing ? -1 : 1),
    }));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <LoadingState loading={loading} showTitle={false} showAuthor={true}>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{
              background: `url(${authorInfo?.nftCollection?.[0]?.nftImage}) top`,
            }}
          ></section>
          {authorInfo && (
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
                                {authorInfo.tag}
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
                            {authorInfo.followers} followers
                          </div>
                          <button onClick={handleFollow} className="btn-main">
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </LoadingState>
      </div>
    </div>
  );
};

export default Author;
