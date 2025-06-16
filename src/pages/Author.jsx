import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Author = () => {
 const { authorId  } = useParams();
  const [author, setAuthor] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

   useEffect(() => {
    async function fetchAuthor() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(data);
        setTimeout(() => {  
        setLoading(false);        
        }, 500);      
      } catch (err) {
        console.error("Failed to load author", err);
      } finally {
      }
      }    

    fetchAuthor();
  }, [authorId]);
  
 if (!author) return <div>Author not found.</div>;

 const toggleFollow = () => {
  setIsFollowing((prev) => !prev);
  setAuthor((prevAuthor) => ({
    ...prevAuthor, 
    followers: prevAuthor.followers + (isFollowing ? -1 : 1)
  }));
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
    {Loading ? (
<>
      <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                     <Skeleton width={150} height={150} borderRadius={99} />
                     <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <Skeleton width={200} height={30} /> 
                          <span className="profile_username"><Skeleton width={100} height={22} />
                          </span>
                          <span id="wallet" className="profile_wallet">
                           <Skeleton width={200} height={22} />
                          </span>                          
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        </div>
                      <Skeleton width={175} height={50} />
                      </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
</>
    ):(
         
      <>

      <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                     
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
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
                      <div className="profile_follower">
                        {author.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
      </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
