import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const { authorId } = useParams();

  async function fetchAuthor() {
    const fetchAuthor = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
    const receiveAuthor = fetchAuthor.data;
    setAuthor(receiveAuthor);
    setFollowers(receiveAuthor.followers);
  }

  function buttonFollow() {
    isFollowing ? setFollowers((prevFollower) => prevFollower - 1) : setFollowers((prevFollower) => prevFollower + 1);
    setIsFollowing((prevState) => !prevState);
  }

  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);
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
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div data-aos="fade-up" className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      { author.authorImage ? <img src={author.authorImage} alt="" /> :
                      <div style={{height: '125px', width: '125px'}} className="skeleton skeleton-avator"></div>
                      }
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
                      <div className="profile_follower">{followers} followers</div>
                      <button onClick={buttonFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
