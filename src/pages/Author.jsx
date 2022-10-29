import React, { useEffect, useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor ] = useState()
  const [followed, setFollowed] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    async function getData() {
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494`)
      setAuthor()
      console.log(data)
    }
    getData()
  }, [])


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
              {author ? (
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
                        {followed ? author.followers + 1 : author.followers} followers
                        </div>
                        <button
                              onClick={() => setFollowed(!followed)}
                              className="btn-main"
                            >
                              {followed ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author}/>
                </div>
              </div>
                </>
              ) : (
                <>
                    <div className="col-md-12">
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <Skeleton 
                              width="150px"
                              height="150px"
                              borderRadius="50%"
                            />
      
                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4>
                                <Skeleton width="200px" />
                                <span className="profile_username">
                                  <Skeleton width="100px" />
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  <Skeleton width="250px" />
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="profile_follower">
                              <Skeleton 
                                width="150px"
                                height="40px"
                              />
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
                              {
                                new Array(8).fill(0).map((_, index) => (
                                  <div
                                    key={index}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <Skeleton
                                      width="100%"
                                      height="400px"
                                    />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
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
