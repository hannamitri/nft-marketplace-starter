import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [authorData, setAuthorData] = useState([]);
  const [follower, setFollower] = useState(false)
  const id = useParams().id
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const getAuthorData = async () => {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(response.data);
  };
  useEffect(() => {
    getAuthorData();
  }, [id]);

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
                      {authorData.id ? (
                        <img src={authorData.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.id ? (
                            authorData.authorName
                          ) : (
                            <Skeleton width="200px" height="24px" />
                          )}
                          <span className="profile_username">
                            {authorData.id ? (
                              authorData.tag
                            ) : (
                              <Skeleton width="100px" height="16px" />
                            )}
                          </span>
                          {authorData.id ? (
                            <>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          ) : (
                            <Skeleton width="200px" height="16px" />
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {authorData.id ? (
                        <>
                          <div className="profile_follower">
                            {follower ? authorData.followers + 1 : authorData.followers } followers
                          </div>
                          <Link onClick={() => setFollower(!follower)} to="#" className="btn-main">
                            {follower ? 'Unfollow' : 'Follow'}
                          </Link>
                        </>
                      ) : (
                        <Skeleton width="150px" height="40px" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    author={authorData}
                    item={authorData.nftCollection}
                  />
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
