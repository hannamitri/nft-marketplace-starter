import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Author.css"

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState([]);
  const { authorId } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    .then((response) => {
      setTimeout(() => {
      setAuthor([response.data])
      setLoading(false);
      }, 1000)
    })
    .catch((error) => {
      console.error("No item found:", error);
    });
  }, [authorId]);

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
          {loading ?
          <div className="skeleton__container">
            <div className="skeleton__row">
              <div className = "skeleton__authorInfo">
                <div className= "skeleton__authorImage--authorInfo"></div>
                <div className= "skeleton__author">
                  <div className= "skeleton__authorName--authorInfo"></div>
                  <div className= "skeleton__authorTag--authorInfo"></div>
                  <div className= "skeleton__authorAddress--authorInfo"></div>
                </div>
              </div>
              <div className= "skeleton__followAuthor"></div>
            </div>
            <AuthorItems />
          </div>
          :
          author.map((authorInfo, index) => (
          <div key={index} className="container">
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
                          <span className="profile_username">{authorInfo.tag}</span>
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
                      <div className="profile_follower">{authorInfo.followers + followerCount} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollowClick}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Link>
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
          ))}
        </section>
      </div>
    </div>
  );
};

export default Author;
