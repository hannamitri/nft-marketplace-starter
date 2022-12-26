import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const {id} = useParams()

  const [authorData, setAuthorData] = useState({})
  const [following, setFollowing] = useState(false)

  async function fetchData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setAuthorData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function follow() {
    setFollowing(true)
    const followersCount = authorData.followers
    setAuthorData({...authorData, followers: followersCount + 1})
  }

  function unfollow() {
    setFollowing(false)
    const followersCount = authorData.followers
    setAuthorData({...authorData, followers: followersCount - 1})
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
        {
          authorData
          ?
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">{`@${authorData.tag}`}</span>
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
                        <div className="profile_follower">{`${authorData.followers} followers`}</div>
                        {following
                        ?
                        <Link to="#" className="btn-main" onClick={() => unfollow()}>
                          Unfollow
                        </Link>
                        :
                        <Link to="#" className="btn-main" onClick={() => follow()}>
                          Follow
                        </Link>
                        }                 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems data={authorData}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          :
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={"150px"} height={"150px"} borderRadius={"50%"}/>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                          <Skeleton width={"200px"} height={"30px"} borderRadius={"16px"}/>
                            <span className="profile_username"><Skeleton width={"100px"} height={"20px"} borderRadius={"8px"}/></span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={"200px"} height={"15px"} borderRadius={"6px"}/>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower"><Skeleton width={"150px"} height={"20px"} borderRadius={"8px"}/></div>
                        <Skeleton width={"122px"} height={"42px"} borderRadius={"8px"}/>                
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems data={{}}/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
        
      </div>
    </div>
  );
};

export default Author;
