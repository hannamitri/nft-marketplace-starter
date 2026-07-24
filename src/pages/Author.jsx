import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import './Author.css'
import { Link, useParams } from "react-router-dom";

const Author = () => {

  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [followClick, setFollowClick] = useState(false);

  function follow(){
    if(followClick){
      setAuthor({...author, followers: author.followers - 1});  
      setFollowClick(false);
    }
    else{
      setAuthor({...author, followers: author.followers + 1});
      setFollowClick(true);
    }
    
  }

  

  useEffect(() => {
    getAuthor();

    async function getAuthor(){
    let authorRequest = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
    let authorRequestJSON = await authorRequest.json();
    console.log(authorRequestJSON);
    setAuthor(authorRequestJSON);
    }

  }, [id])

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
          {
            Object.keys(author).length > 0?
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
                        <div className="profile_follower">{author.followers}</div>
                        <Link to="#" className="btn-main" onClick={() => {follow();}}>
                          {followClick?
                            <>
                              Unfollow
                            </>
                            
                            :
                            <>Follow</>
                          }
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} />
                  </div>
                </div>
              </div>
              :
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="author__skeleton--image skeleton-box"></div>
                        <i className="fa fa-check"></i>
                        <div className="author__skeleton--nameContainer">
                          <div>
                            <div className="author__skeleton--name skeleton-box"></div>
                            <span className="profile_username author__skeleton--username skeleton-box"></span>
                            <span id="wallet" className="profile_wallet author__skeleton--wallet skeleton-box"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col author__skeleton--followers skeleton-box">
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems nfts={[]} />
                  </div>
                </div> 
            </div>
          }
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
