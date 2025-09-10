import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";


const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [authorCollection, setAthorCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
 
  useEffect(() => {
    if (!authorId) return;
    setLoading(true);
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setAthorCollection(data.nftCollection);
        // Initialize follower count with API data or random number
        setFollowerCount(data.followers || Math.floor(Math.random() * 1000) + 100);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authorId]);

  const handleFollowClick = () => {
    if (isFollowing) {
      // Unfollow: decrease count and set following to false
      setFollowerCount(prev => prev - 1);
      setIsFollowing(false);
    } else {
      // Follow: increase count and set following to true
      setFollowerCount(prev => prev + 1);
      setIsFollowing(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!author) return <div>No author data found.</div>;

  return (
    <div>
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
                        <img src={author.authorImage || author.image} alt={author.authorName} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag || author.authorName?.toLowerCase().replace(/\s/g, "")}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.wallet || "No wallet info"}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() => {
                                if (author.wallet) {
                                  navigator.clipboard.writeText(author.wallet);
                                }
                              }}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followerCount} followers</div>
                        <button 
                          onClick={handleFollowClick}
                          className="btn-main"
                          style={{
                            backgroundColor: isFollowing ? '#dc3545' : '#8364e2',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                          }}
                        >
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorCollections={authorCollection} author={author} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Author;