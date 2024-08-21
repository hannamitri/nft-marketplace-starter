import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`;

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState("Copy");

  const handleFollowToggle = () => {
    setFollowerCount((prevCount) => prevCount + (isFollowing ? -1 : 1));
    setIsFollowing(!isFollowing);
  };

  const handleCopyToClipboard = () => {
    if (author && author.address) {
      navigator.clipboard.writeText(author.address).then(
        () => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess("Copy"), 2000);
        },
        () => {
          setCopySuccess("Copy");
        }
      );
    }
  };

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const response = await axios.get(apiUrl);
        const { data } = response;

        setAuthor(data);
        setFollowerCount(data.followers);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAuthor();
  }, [apiUrl]);

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
                {isLoading ? (
                  <div className="d_profile de-flex skeleton-wrapper__author">
                    <div className="skeleton-profile__author">
                      <div className="skeleton-avatar__author"></div>
                      <div className="skeleton-desc__author">
                        <div className="skeleton-title__author"></div>
                        <div className="skeleton-tag__author"></div>
                        <div className="skeleton-title__author"></div>
                      </div>
                    </div>
                    <div className="skeleton-followers__author"></div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage || AuthorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={handleCopyToClipboard}
                            >
                              {copySuccess}
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>
                        <button
                          onClick={handleFollowToggle}
                          className="btn-main"
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {!isLoading && (
                    <AuthorItems
                      nftCollection={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  )}
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
