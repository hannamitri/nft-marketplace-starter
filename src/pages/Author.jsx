import React, { useEffect, useRef } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoadingPlaceHolder from '../components/home/LoadingPlaceHolder'


const Author = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { authorId } = location.state;

  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const [following, setFollowing] = useState(false);

  async function getAuthor() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setLoading(false);
  }

  function changeFollowing(following) {
    setFollowing(!following);
  }

  useEffect(() => {
    getAuthor();
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
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                      <LoadingPlaceHolder extraStyles={{height:'170px', width:'170px', borderRadius:'50%'}}/>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <LoadingPlaceHolder extraStyles={{height:'20px', width:'150px', marginTop: '20px'}}/>
                            <span className="profile_username">
                            <LoadingPlaceHolder extraStyles={{height:'20px', width:'150px', marginTop: '20px'}}/>
                            </span>
                            <span id="wallet" className="profile_wallet">
                            <LoadingPlaceHolder extraStyles={{height:'20px', width:'150px', marginTop: '20px'}}/>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <LoadingPlaceHolder extraStyles={{height:'40px', width:'120px', marginTop: '20px'}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {new Array(8).fill(0).map((_, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                               <LoadingPlaceHolder extraStyles={{height:'400px', marginBottom: '10px'}}/>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </section>
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
                        {following === false ? (
                          <>
                            <div className="profile_follower">
                              {author.followers} followers
                            </div>
                            <button
                              className="btn-main"
                              onClick={() => changeFollowing(false)}
                            >
                              Follow
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="profile_follower">
                              {author.followers + 1} followers
                            </div>
                            <button
                              className="btn-main"
                              onClick={() => changeFollowing(true)}
                            >
                              Unfollow
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={author.nftCollection}
                      authorId={author.authorId}
                      authorImage={author.authorImage}
                    />
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
