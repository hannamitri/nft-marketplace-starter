import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Author = () => {

  const [ authors, setAuthors ] = useState({});
  
    const [followers, setFollowers] = useState(0);

    const [ isFollowing, setIsFollowing ] = useState(false);

    const { authorId } = useParams();
  
    useEffect(function () {
      fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTimeout(function () {
          setAuthors(data);
        setFollowers(data.followers);
        
      }, 2000);
    });
    }, [authorId]);
  

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
                      <img src={authors.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authors.authorName}
                          <span className="profile_username">{authors.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authors.address}
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
                      <div className="profile_follower">{followers}</div>
                      <Link to="#" 
                      className="btn-main" 
                      onClick={() => {
                      setFollowers((previousFollowers) =>
                      isFollowing ? previousFollowers - 1 : previousFollowers + 1 );
                      setIsFollowing(!isFollowing);
                    }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
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
