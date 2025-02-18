import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const param = useParams();
  const [author, setAuthor] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);


  async function fetchAuthor(param) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${param.id}`
    );
    setAuthor(data);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchAuthor(param);
  }, []);

  function addFollower() {
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers + 1,
    }));
    setIsFollowed(true);
  }

  function unfollow() {
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers - 1,
    }));
    setIsFollowed(false);
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
                <div className="d_profile de-flex">
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
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>
                      {isFollowed ? (
                        <button className="btn-main" onClick={unfollow}>
                          Unfollow
                        </button>
                      ) : (
                        <button className="btn-main" onClick={addFollower}>
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems item={author} isLoaded={isLoaded} />
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
