import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProfileCard({ isLoading, data }) {
  if( isLoading ) {
    return (
    <div className="card">
      <Skeleton circle width={50} height={50} />
      <h2><Skeleton width={150} /></h2>
      <p><Skeleton count={3} /></p>
    </div>
    );
  }

return (
  <div className="card">
  <img src={data.avatar} alt={data.name} style={{ width: 50, height: 50, borderRadius: '50%'}} />
  <h2>{data.name}</h2>
  <p>{data.bio}</p>
  </div> 
);
}

const Author = () => { 
const [author, setAuthor] = useState([]);
const [isFollowing, setIsFollowing] = useState(false);
const [isLoading, setIsLoading] = useState(true);

  function handleFollow() {
  setIsFollowing(!isFollowing);
}

useEffect(() => {

const fetchAuthor = async () => {

const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012");

const data = await response.json();
setAuthor(data);
setIsLoading(false);

console.log(data); 

};

fetchAuthor();

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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Monica Lucas
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
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
                         {573 + (isFollowing ? 1 : 0)} followers
                      </div>
                      <button onClick={handleFollow}>
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
      </div>
    </div>
  );
};

export default Author;
