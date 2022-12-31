import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SkeletonAuthorPage from "../components/UI/SkeletonAuthorPage";

const Author = () => {
  const { id } = useParams();
  const baseUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [followers, SetFollowers] = useState(post.followers);
  const [followerBtnText, SetFollowerBtnText] = useState('Follow')

  const getAuthorbyId = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    setPost(data);
  };

  const followAuthor = () => {
    if (followers === post.followers + 1) {
      SetFollowers(post.followers);
      SetFollowerBtnText('Follow')
    } else {
      SetFollowers(post.followers + 1);
      SetFollowerBtnText('Unfollow')
    }
  };
  useEffect(() => {
    setLoading(true);
    if (id) {
      getAuthorbyId();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);


  const { nftCollection } = post;
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
              {loading ? (
                <SkeletonAuthorPage />
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={post.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {post.authorName}
                            <span className="profile_username">
                              @{post.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {post.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      {loading ? (
                        ""
                      ) : (
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers ? followers : post.followers} followers
                          </div>

                          <Link
                            to="#"
                            className="btn-main"
                            onClick={followAuthor}
                          >
                            {followerBtnText}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    post={post}
                    nftCollection={nftCollection}
                    loading={loading}
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