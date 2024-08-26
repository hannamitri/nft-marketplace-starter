import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonAuthor from "../components/home/home-components/Skeletons/author page/SkeletonAuthor";
import SkeletonCatalog from "../components/home/home-components/Skeletons/author page/SkeletonAuthorItems";

const Author = () => {
  const {id} = useParams()
  const [nfts, setNfts] = useState([])
  const [authorInfo, setAuthorInfo] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followCount, setFollowCount] = useState(0)
  const [profileImg, setProfileImg] = useState()  

  function toggleFollow(){
    if(!isFollowing){
      setFollowCount(followCount+1)
      setIsFollowing(true)
    }
    else {
      setFollowCount(followCount-1)
      setIsFollowing(false)
    }
  }

  async function getInfo(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    const {data: {nftCollection}} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setProfileImg(data.authorImage)
    setAuthorInfo(data)
    setNfts(nftCollection)
    if(!isLoaded){
      setFollowCount(authorInfo.followers)
    }
    setIsLoaded(true)
  }

  useEffect(() => {
    getInfo()
  },[isLoaded,followCount])

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
          
          {
            isLoaded ? (
              <div className="container">
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
                              <span className="profile_username">@{authorInfo.tag}</span>
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
                          {
                            !isFollowing ? (
                              <>
                                <div className="profile_follower">{followCount}</div>
                                <Link to="#" className="btn-main" onClick={toggleFollow}>
                                  Follow
                                </Link>
                              </>
                            ) : (
                              <>
                              <div className="profile_follower">{followCount}</div>
                                <Link to="#" className="btn-main" onClick={toggleFollow}>
                                  Unfollow
                                </Link>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                        <AuthorItems nfts = {nfts} profile = {profileImg}/>
                    </div>
                  </div>
                </div>
              </div>

            ) : (
              <>
                <SkeletonAuthor />
                <SkeletonCatalog />
              </>
            )
          }
        </section>
      </div>
    </div>
  );
};

export default Author;
