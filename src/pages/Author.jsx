import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeliton from "../components/home/Skeliton.jsx";
import "./Author.css";

const Author = () => {

  const {id} = useParams();

  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function fetchUserData()
    {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
      setUser(response.data);
      setItems(response.data.nftCollection || []);
      setLoading(false);
      setFollowersCount(response.data.followers || 0);
    }
    fetchUserData();
  }, [id]);

  const handleFollow = () => {
    setFollowersCount((prevCount) => prevCount + 1);
  };

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
            
            {
              loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <div className="skeliton_pic"></div>

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <div className="skeleton_name"></div>
                              <div className="skeleton_tag"></div>
                              <span id="wallet" className="profile_wallet">
                                <div className="skeleton_address"></div>
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="skeleton_followers"></div>
                          <div className="skeleton_btn"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple organize_flex">
                      {
                        new Array(8).fill(0).map((_, index) => {
                          return <Skeliton key={index}/>
                        })
                      }
                      
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={user.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {user.authorName}
                              <span className="profile_username">@{user.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {user.address}
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
                          <div className="profile_follower">{followersCount} followers</div>
                          <Link to="#" className="btn-main" onClick={handleFollow}>
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple organize_flex">
                      {  
                        <AuthorItems items={items} userImg={user.authorImage}/>
                      }
                      
                    </div>
                  </div>
                </>
              )
            }

            



              

              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
