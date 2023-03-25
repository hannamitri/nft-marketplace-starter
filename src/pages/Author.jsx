import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import AuthorLoading from "../components/author/AuthorLoading";

const Author = () => {
  const [author, setAuthor] = useState({});
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [followButton, setFollowButton] = useState("Follow");
  const { authorId } = useParams();

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setFollowers(data.followers);
    setLoading(false);
  }

  function follow() {
    if (followButton === "Follow") {
      setFollowers((prev) => prev + 1);
      setFollowButton("Unfollow");
    } else {
      setFollowers((prev) => prev - 1);
      setFollowButton("Follow");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

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

        <section aria-label="section">
          <div className="container">
            {!loading && (
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
                              {author.tag}
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
                          {followers} followers
                        </div>
                        <Link to="#" className="btn-main" onClick={follow}>
                          {followButton}
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
            )}
            {loading && <AuthorLoading />}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
