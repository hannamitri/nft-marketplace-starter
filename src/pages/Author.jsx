import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = ({loading, setLoading}) => {
  
 const [authorItems, setAuthorItems] = useState({});
 const [addFollowers, setAddFollowers] = useState()
 const [follow, setFollow] = useState(false);

  const {id} = useParams();

  async function getAuthorItems(){
    setLoading(true)
    await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      .then(res =>{
        const response = res.data;
        setAuthorItems(response);
        setLoading(false);
      })
      .catch(err =>{
        console.log('error retrieving data', err)
      })
  }
  let followers = authorItems.followers;

  function handleAddFollower(){
     followers += 1;
     setAddFollowers(followers);
     setFollow(true);
  }

   function handleDeleteFollower(){
     followers -= 1;
     setAddFollowers(followers);
      setFollow(false);
  }



  useEffect(()=>{
    getAuthorItems();

  },[id])

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
                {loading ? (
                  <>
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton-box" style={{height: 150, width: 150, borderRadius:'50%'}}></div>

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                            <div className="skeleton-box" style={{height: 30, width: 167}}></div>
                            <div className="skeleton-box" style={{height: 30, width: 100}}></div>
                            <div className="skeleton-box" style={{height: 30, width: 200}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="skeleton-box" style={{height: 42, width: 125}}></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItems.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName}
                            <span className="profile_username">@{authorItems.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address}
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
                        <div className="profile_follower">{follow ? (<> {addFollowers} </>) : ( <>{authorItems.followers} </>) } followers</div>
                        {follow ? 
                        <button onClick={handleDeleteFollower} to="#" className="btn-main">
                          Unfollow
                        </button>
                        : 
                        <button onClick={handleAddFollower} to="#" className="btn-main">
                          Follow
                        </button>
                        }
                      </div>
                    </div>
                  </>
                )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems loading={loading} authorItems={authorItems} />
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
