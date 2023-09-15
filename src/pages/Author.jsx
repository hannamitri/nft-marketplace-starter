import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

import { getAuthor } from "../api/author";

const Author = () => {
  const { id } = useParams();
  const idNumber = parseInt(id, 10);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const items = await getAuthor(idNumber);
      setLoading(true);
      setItems(items);
    }
    setTimeout(() => {
      setLoading(false);
    }, 350);
    fetchData();
  }, [idNumber]);

  const addFollower = () => {
    setFollowers((prevFollowers) => !prevFollowers);
  };

  useEffect(() => {
    const followerButton = document.getElementById("follower");
    if (followerButton) {
      followerButton.addEventListener("click", addFollower);
    }

    return () => {
      if (followerButton) {
        followerButton.removeEventListener("click", addFollower);
      }
    };
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
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={items.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {items.authorName}
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            {items.address}
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
                      {followers ? (
                        <div>
                          <div className="profile_follower">
                            {items.followers} followers
                          </div>
                          <Link to="#" id="follower" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <div className="profile_follower">
                            {items.followers + 1} followers
                          </div>
                          <Link to="#" id="follower" className="btn-main">
                            UnFollow
                          </Link>
                        </div>
                      )}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
