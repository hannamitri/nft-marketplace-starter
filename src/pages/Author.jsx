import React, { useEffect, useState } from 'react';
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import ExploreItems from '../components/explore/ExploreItems';


const Author = () => {
  const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  let params = useParams();
  const [id, setid ] = useState(0);

  console.log(params);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const author_id = params.id
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${author_id}`);
        const data = await response.json();
        setAuthorData(data);
        setid (data.authorId)
        setFollowerCount(data.followers);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };


    fetchAuthorData();
  }, []);

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowerCount((prevCount) => prevCount - 1);
    } else {
      setFollowerCount((prevCount) => prevCount + 1);
    }
    setIsFollowing(!isFollowing);
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData && authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {authorData ? (
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
                        ) : (
                          <h4>Loading...</h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {authorData ? (
                        <>
                          <div className="profile_follower">{followerCount} followers</div>
                          <button className="btn-main" onClick={toggleFollow}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">Loading followers...</div>
                          <div className="btn-main">Loading...</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
                
          </div>
          
        </section>
        


      </div>
    </div>
  );
};

export default Author;


