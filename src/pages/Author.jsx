import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author='


const Author = () => {
  const {id} = useParams()
  const [authorCards, setAuthorCards] = useState([])
  const [authorInfo, setAuthorInfo] = useState({})
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get(`${API_URL}${id}`)
      setAuthorCards(data.nftCollection)
      setAuthorInfo(data)
      setLoading(false)
    }
    fetchData()
  },[id])

  function handleFollow() {
    if (following) {
    setAuthorInfo(prev => ({...prev, followers: prev.followers - 1 }))
    setFollowing(false)
    }
    else {
    setAuthorInfo(prev => ({...prev, followers: prev.followers + 1}))
    setFollowing(true)
    }
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

            {loading ? (
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar ">
                      <div className="skeleton skeleton_author"/>
                       <i className="fa fa-check"></i>
                       <div className="profile_name "> 
                        <div className=" skeleton skeleton_username"/>
                        <div className=" skeleton skeleton_wallet"/>    
                       </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className=" skeleton skeleton_follower"/>
                        <div className="skeleton skeleton_btn"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (

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
                      <div className="profile_follower">{authorInfo.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollow}>
                        {following ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorCards={authorCards} authorImage={authorInfo.authorImage}/>
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
