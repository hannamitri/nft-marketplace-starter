import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorProfileSkeleton from "../components/AuthorProfileSkeleton";

const Author = () => {
  const { authorId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [followerCount, setFollowerCount] = useState(0); 
  const [isFollowing, setIsFollowing] = useState(false); 

  async function fetchProfile() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setProfile(data);
    setFollowerCount(data.followers); 
    setIsLoading(false);
  }

  function handleFollowClick() {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  }

  function renderProfile() {
    return (
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <img src={profile.authorImage} alt="" />

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  {profile.authorName}
                  <span className="profile_username">@{profile.tag}</span>
                  <span id="wallet" className="profile_wallet">
                    {profile.address}
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
                {followerCount} followers
              </div>
              <Link
                to="#"
                className="btn-main"
                onClick={handleFollowClick} 
              >
                {isFollowing ? "Unfollow" : "Follow"} 
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchProfile();
  }, []); 

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
              {isLoading ? <AuthorProfileSkeleton /> : renderProfile(profile)}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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

