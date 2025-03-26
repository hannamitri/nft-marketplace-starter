
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const {authorId} = useParams();
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    async function fetchData(){
      
      const{data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
      setAuthor(data);
      setFollowers(data.followers);
      setTimeout(() => {
        setLoading(false)
      }, 3000);
  } fetchData(); }, [authorId]);

  const handleFollow = () => {
    setFollowers(isFollowing ? followers - 1 : followers + 1);
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
                      {loading ?
                      (
                        <div className="col-md-12">
                        <div className="d_profile de-flex">
                          <div className="de-flex-col">
                            <div className="profile_avatar">
                              <Skeleton width="150px" height="150px" borderRadius="50%" />
                              <div className="profile_name">
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Skeleton width="200px" height="30px" borderRadius="5px" />
                            <Skeleton width="100px" height="30px" borderRadius="5px" />
                            <Skeleton width="250px" height="30px" borderRadius="5px" />
                          </div>
                              </div>
                            </div>
                          </div>
                          <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div style={{ marginRight: "10px" }}>
                          <Skeleton width="100px" height="30px" borderRadius="5px" />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <Skeleton width="100px" height="30px" borderRadius="5px" />
                        </div>
                      </div>
                    </div>
                        </div>
                      </div>
          
                      )
                      :
                      (
                        <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                     {author && <img src={author.authorImage} alt="" />}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                         {author.authorName}
                          <span className="profile_username">{author.tag}</span>
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

                      <div className="profile_follower">{followers} followers</div>
                      <button to="#" className="btn-main" onClick={handleFollow}>
                      {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                      )
                    }
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