import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers((previousFollowers) => previousFollowers - 1);
    } else {
      setFollowers((previousFollowers) => previousFollowers + 1);
    }
    setIsFollowing((previousValue) => !previousValue);
  };

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(author.address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy wallet:", error);
    }
  };

  useEffect(() => {
    async function getItems() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          {
            params: {
              author: authorId,
            },
          },
        );
        console.log(response.data);
        setAuthor(response.data);
        setFollowers(response.data.followers);
      } catch (error) {
        console.error("Unable to load:", error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, [authorId]);

  const authorProfileSkeleton = (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <Skeleton width="150px" height="150px" borderRadius="50%" />

          <div className="profile_name">
            <h4>
              <Skeleton width="160px" height="24px" borderRadius="4px" />

              <div style={{ marginTop: "8px" }}>
                <Skeleton width="100px" height="16px" borderRadius="4px" />
              </div>

              <div style={{ marginTop: "8px" }}>
                <Skeleton width="300px" height="16px" borderRadius="4px" />
              </div>

              <div style={{ marginTop: "8px" }}>
                <Skeleton width="55px" height="28px" borderRadius="4px" />
              </div>
            </h4>
          </div>
        </div>
      </div>

      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <Skeleton width="100px" height="18px" borderRadius="4px" />

          <div style={{ marginTop: "10px" }}>
            <Skeleton width="85px" height="38px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );

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
                {loading ? (
                  authorProfileSkeleton
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

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
                              type="button"
                              id="btn_copy"
                              title="Copy wallet address"
                              onClick={handleCopyWallet}
                            >
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <button
                          type="button"
                          className="btn-main"
                          onClick={handleFollow}
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
                  {!loading && author && (
                    <AuthorItems authorId={authorId} author={author} />
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
