import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios"
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams()
  const [author, setAuthor] = useState([])
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchAuthor() {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setAuthor(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAuthor()
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
            {loading ? (
              <div className="row">
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
                            <Skeleton width="60%" height="30px" />
                            <span className="profile_username">
                              <Skeleton width="40%" height="25px" />
                            </span>
                            <Skeleton width="300px" height="30px" />
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width="100px" height="30px" />
                        </div>
                        <Skeleton width="140px" height="40px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} loading={loading} />
                  </div>
                </div>
              </div>
            ) : (
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
                        <div className="profile_follower">{author.followers + (following ? 1 : "")} followers</div>
                        {!following ? (
                          <Link to="" onClick={() => setFollowing(true)} className="btn-main">Follow</Link>) :
                          (<Link to="" onClick={() => setFollowing(false)} className="btn-main">Unfollow</Link>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} loading={loading} />
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
