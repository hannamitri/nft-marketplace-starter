import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

const Author = () => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  async function fetchAuthor() {
    setLoading(true);

    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
    );

    const data = await response.json();

    setTimeout(() => {
      setAuthor(data);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-12">Loading...</div>
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
                        <div className="profile_follower">
                          {following ? author.followers + 1 : author.followers} followers
                        </div>
                        <button
                        className="btn-main"
                        onClick={() => setFollowing(!following)}
                        >
                        {following ? "Unfollow" : "Follow"}
</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems />
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
