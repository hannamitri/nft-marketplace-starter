import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import SkeletonPP from "../../src/images/hot-collection-skeleton--pp.png"

const Author = () => {
  const [authorData, setAuthorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollwed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState();
  const {id} = useParams()
  const followButton = document.getElementById('follow-btn');

  async function getAuthor() {
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setAuthorData(response.data)
    setFollowers(response.data.followers)
    console.log(response.data)
    setIsLoading(false)
    
  }

  function follow() {
    if (isFollwed === false) {
      setFollowers(followers + 1)
      followButton.innerHTML = 'Followed';
      setIsFollowed(true)
      
    } 
  }

  useEffect(() => {
    getAuthor()
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
              {!isLoading ? 
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">@{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
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
                      <div className="profile_follower">{followers} followers</div>
                   
                      <button to="#" className="btn-main" onClick={() => follow()}>
                        <span id='follow-btn'>Follow</span>
                      </button>
                   
                    </div>
                  </div>
                </div>
              </div> :
              <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={SkeletonPP} alt="" />

                    <i className="fa fa-check"></i>
                    <div className="profile_name_container-skel">
                      <div className="profile_name-skel-1"></div>
                      <div className="profile_name-skel-2"></div>
                      <div className="profile_name-skel-3"></div>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="author_follow-skele"></div>
                  </div>
                </div>
              </div>
            </div>
              }

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData}/>
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
