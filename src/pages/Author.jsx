import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AuthorBanner from "../images/author_banner.jpg"
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let canceled = false;

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        setError(null);
        setAuthor(null);
        setFollowing(false);
        setCopied(false);

        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);

        if(!canceled) {
          setAuthor(response.data);
          setFollowers(response.data.followers || 0);
        }
      } catch(error) {
        console.error("Error fetching author:", error);
        if(!canceled) {
          setError("Unable to load author information.");
        }
      } finally {
        if(!canceled) {
          setLoading(false);
        }
      }
    };

    fetchAuthor();

    return () => {
      canceled = true;
    };
  }, [authorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authorId]);

  const handleFollow = () => {
    setFollowing((previous) => !previous);
    setFollowers((count) => count + (following ? -1 : 1));
  };

  const handleCopy = async () => {
    if (!author?.address) return;

    try {
      await navigator.clipboard.writeText(author.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch(error) {
      console.error("Unable to copy wallet address:", error);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="profile_banner" aria-label="section" className="text-light" data-bgimage="url(images/author_banner.jpg) top" style={{ background: `url(${AuthorBanner}) top` }}></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="120px" height="120px" borderRadius="50%" />

                        <div className="profile_name">
                          <h4>
                            <Skeleton width="150px" height="22px" />
                            <br />
                            <Skeleton width="100px" height="15px" />
                            <br />
                            <Skeleton width="220px" height="15px" />
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="100px" height="18px" />
                        <Skeleton width="100px" height="40px" />
                      </div>
                    </div>
                  </div>
                )}

                {!loading && error && (
                  <div className="text-center">
                    <p>{error}</p>
                  </div>
                )}

                {!loading && author && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt={author.authorName} />
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">@{author.tag}</span>

                            <span id="wallet" className="profile_wallet">
                              {`${author.address.slice(0, 25)}...`}
                            </span>

                            <button id="btn_copy" title="Copy Wallet Address" type="button" onClick={handleCopy}>
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

                        <button type="button" className="btn-main" onClick={handleFollow}>
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {!loading && author && (
                    <AuthorItems items={author.nftCollection || []} authorImage={author.authorImage} authorId={author.authorId} />
                  )}

                  {loading && (
                    <AuthorItems loading />
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