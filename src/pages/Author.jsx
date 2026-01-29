import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import UserImagePlaceholder from "../components/UI/UserImagePlaceholder";

const Author = () => {
  const { authorID } = useParams();
  const [author, setAuthor] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [follow, setFollow] = useState(false);

  function handleFollow() {
    setFollow(!follow);
  }

  function renderAuthor() {
    return <div data-aos="fade-in" data-aos-delay="100" className="d_profile de-flex">
    <div className="de-flex-col">
      <div 
        className="profile_avatar">
        {author.authorImage ? (
          <img src={author.authorImage} alt="" />
        ) : (
          <UserImagePlaceholder authorName={author.authorName} width="150px" height="150px" />
        )}
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
          <div
            className="profile_follower">
            {follow ? (
              author.followers + 1
            ) : (
              author.followers
            ) } 
            <span> followers</span>
            </div>
        <Link 
          to="#" 
          className="btn-main" 
          onClick={handleFollow}>
          {follow ? (
            <span>Unfollow</span>
          ) : (
            <span>Follow</span>
          )}
        </Link>
      </div>
    </div>
  </div>
  };

  function renderSkeletonAuthor() {
    return <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <Skeleton width="150px" height="150px" borderRadius="50%" />
          <i className="fa fa-check"></i>
          <div className="profile_name">
              <h4>
              <Skeleton width="100%" height="36px" />
              <div>
                <Skeleton width="100px" height="24px" />
              </div>
              <div>
                <Skeleton width="200px" height="24px" />
              </div>
              </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <Skeleton width="160px" height="42px" />
        </div>
      </div>
    </div>
  }

  useEffect(() => {
    async function fetchAuthorDetails() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorID}`);
      setAuthor(data || {});
    }
    fetchAuthorDetails();
  }, [authorID]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowWidth(window.innerWidth);
  }, [])

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
                {author.authorId ? (
                  renderAuthor()
                ) : (
                  renderSkeletonAuthor()
                )}
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                  collection={author.nftCollection} 
                  image={author.authorImage}
                  authorID={author.authorId}
                  windowWidth={windowWidth}
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
