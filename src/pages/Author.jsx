import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import './AuthorSkeleton.css';

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const { authorId } = useParams();
  const idToFetch = authorId || '73855012';

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${idToFetch}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        let authorData = null;

        if (Array.isArray(data) && data.length > 0) {
          authorData = data[0];
        } else if (data && typeof data === 'object' && !Array.isArray(data)) {
          authorData = data;
        }

        if (authorData) {
          setAuthor(authorData);
          setFollowersCount(authorData.followers || 0);
        } else {
          setAuthor(null);
          setError("Author not found.");
        }

      } catch (error) {
        console.error("Error fetching author data:", error);
        setError("Failed to load author data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
    window.scrollTo(0, 0);

  }, [idToFetch]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
  };

  const handleCopyClick = () => {
    if (author && author.address) {
      navigator.clipboard.writeText(author.address)
        .then(() => {
          alert("Wallet address copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy:", err);
          alert("Failed to copy wallet address. Please try again.");
        });
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${(author && author.authorBanner) || AuthorBanner}) top`}
          style={{ background: `url(${(author && author.authorBanner) || AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading && (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton-avatar"></div>
                        <div className="profile_name">
                          <h4>
                            <div className="skeleton-line short"></div>
                            <span className="profile_username"><div className="skeleton-line very-short"></div></span>
                            <span id="wallet" className="profile_wallet">
                              <div className="skeleton-line long"></div>
                            </span>
                            <div className="skeleton-button"></div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower"><div className="skeleton-line short"></div></div>
                        <div className="skeleton-button"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="col-md-12">
                  <div>Error: {error}</div>
                </div>
              )}

              {!loading && !error && !author && (
                 <div className="col-md-12">
                   <div>Author not found.</div>
                 </div>
              )}

              {!loading && !error && author && (
                 <div className="col-md-12">
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
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text" onClick={handleCopyClick}>
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{followersCount} followers</div>
                          <button className="btn-main" onClick={handleFollowClick}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                 </div>
              )}

              <div className="col-md-12">
                 <div className="de_tab tab_simple">
                    <AuthorItems nftCollection={author?.nftCollection} itemsLoading={loading} />
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