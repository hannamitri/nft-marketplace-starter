import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const { authorId } = useParams()

  const [author, setAuthor] = useState([])
  const [followed, setFollowed] = useState(false)
  const [followerNum, setFollowerNum] = useState(0)
  
  const getAuthor = async () => {
    await axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((response) => {
        setAuthor(response.data)
        setFollowerNum(response.data.followers)
      })
  }

  const follow = () => {
    setFollowerNum(followNum => followNum+=1)
    setFollowed(follow => follow = true)
  }

  const loading = author.length === 0

  useEffect(() => {
    getAuthor()
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
              <div className="col-md-12">
                {
                  loading ? 
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={"150px"} height={"150px"} borderRadius={"50%"} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={"200px"} />
                            <span className="profile_username">
                              <Skeleton width={"100px"} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={"250px"} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={"150px"} height={"40px"} />
                        </div>
                      </div>
                    </div>
                  </div>
                  : <div className="d_profile de-flex">
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
                        <div className="profile_follower">{followerNum}</div>
                        {
                          !followed ?  <Link to="#" className="btn-main" onClick={follow}>Follow</Link>
                          : <Link to="#" className="btn-main">Followed</Link>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                    key={author.id}
                    nftCollection={author.nftCollection}
                    authorImage={author.authorImage}
                    authorId={author.authorId}
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
