import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";


const Author = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
    );
    setAuthor(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();
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

        {loading ? (
           <div className="col-md-12">
           <div className="d_profile de-flex">
             <div className="de-flex-col">
               <div className="profile_avatar">
                 <Skeleton width={110} height={110} borderRadius={999} />
                 <div className="profile_name">
                   <h4>
                     <Skeleton
                       width={150}
                       height={20}
                       borderRadius={1}
                     />
                     <span className="profile_username">
                       <Skeleton
                         width={70}
                         height={15}
                         borderRadius={1}
                       />
                     </span>
                     <span id="wallet" className="profile_wallet">
                       <Skeleton
                         height={13}
                         width={150}
                         borderRadius={1}
                       />
                     </span>
                   </h4>
                 </div>
               </div>
             </div>
             <div className="profile_follow de-flex">
               <div className="de-flex-col">
                 <Skeleton width={90} height={25} borderRadius={1} />
               </div>
             </div>
           </div>
         </div>
        ) : (
          
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
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
                            {author.followers} followers
                          </div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems author={author}/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          
        )}
      </div>
    </div>
  );
};

export default Author;
