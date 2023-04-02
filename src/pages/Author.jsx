import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [follow, setFollow] = useState(false);
  const [followNum, setFollowNum] = useState(author.followers);
  // const [unfollow, setUnfollow] = useState(author.followers);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setAuthor(response.data);
    console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    console.log(author);
  }, []);

  function followAuthor() {
    setFollow(true);
    setFollowNum(author.followers + 1);
  }

  function unfollowAuthor() {
    setFollow(false);
    setFollowNum(author.followers - 1);
  }

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
                {loading ? (
                  <div className="author__profile--loading">
                    <div className="profile__loading--wrapper">
                      <div className="profile__loading">
                        <div className="profile__img--wrapper">
                          <div className="profile__img"></div>
                        </div>
                        <div className="profile__img--text-wrapper">
                          <div className="profile__img--text-name"></div>
                          <div className="profile__img--text-at"></div>
                          <div className="profile__img--text-copy"></div>
                        </div>
                      </div>
                    </div>
                    <div className="follow__loading--wrapper">
                      <div className="follow__loading"></div>
                    </div>
                  </div>
                ) : (
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
                        {follow ? (
                          <div className="profile_follower">
                            {followNum} followers
                          </div>
                        ) : (
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                        )}
                        {follow ? (
                          <Link to="#">
                            <button
                              className="btn-main"
                              onClick={unfollowAuthor}
                            >
                              Unfollow
                            </button>{" "}
                          </Link>
                        ) : (
                          <Link to="#">
                            <button className="btn-main" onClick={followAuthor}>
                              Follow
                            </button>{" "}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
