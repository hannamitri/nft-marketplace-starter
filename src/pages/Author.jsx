import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Author.css'

const Author = () => {
  
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect (() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        
        setAuthor(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }


    };

    fetchAuthor();
  }, [authorId]);

  const toggleFollow = () => {
    setAuthor(prev => {
    const currentFollowers = Number(prev.followers);

    return {
      ...prev,
      followers: isFollowing
        ? currentFollowers - 1
        : currentFollowers + 1
    };
  });

  setIsFollowing(prev => !prev);
};


  if (loading) {
  return (
    <div id="wrapper">
      <div className="container">
        <div className="skeleton-author-wrapper skeleton">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="skeleton-author-avatar" />
            <div className="skeleton-author-info">
              <div className="skeleton-author-name" />
              <div className="skeleton-author-tag" />
              <div className="skeleton-author-address" />
            </div>
          </div>
          <div>
            <div className="skeleton-followers" />
            <div className="skeleton-follow-btn" />
          </div>
        </div>
        <div className="row">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={i}>
              <div className="skeleton-nft-card skeleton">
                <div className="skeleton-nft-image" />
                <div className="skeleton-nft-title" />
                <div className="skeleton-nft-price" />
                <div className="skeleton-nft-like" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
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
                      <div className="profile_follower">{author.followers} Followers</div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
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
