import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [items, setItems] = useState([]);
  const [clicked, setClicked] = useState(false);
  

  const { authorId } = useParams();
  async function fetchAuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setItems(data);
  }

  useEffect(() => {
    fetchAuthorData();
  }, []);

  if (!items) {
    return null;
  }

  const { address, authorImage, authorName, followers,  tag } = items;


  const handleOnClick = () => {
    setClicked(!clicked);
  };

  console.log(items);

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
                      <img src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">@{tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col" onClick={handleOnClick}>
                      {clicked ? (
                        <div className="profile_follower">
                          {followers + 1} followers
                        </div>
                      ) : (
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                      )}
                      {clicked ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleOnClick}
                        >
                          Unfollow
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleOnClick}
                        >
                          Follow
                        </Link>
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
