import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();
  const [following, setFollowing] = useState(false);

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
    );
    return data;
  }

  useEffect(() => {
    async function load() {
      const results = await getAuthor();
      setAuthor(results);
      setLoading(false);
    }
    load();
  }, []);

  function follow() {
    if (!following) {
      author.followers = author.followers + 1;
      setFollowing(true);
    } else {
      author.followers = author.followers - 1;
      setFollowing(false);
    }
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
        {loading ? (
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <Skeleton width="150px" height="150px" borderRadius="50%" />

                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      <Skeleton width="200px" height="50px"/>
                      <span className="profile_username">
                        <Skeleton width="110px" height="20px"/>
                      </span>
                      <span id="wallet" className="profile_wallet">
                        <Skeleton width="220px" height="30px"/>
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        <Skeleton width="45px" height="45px"/>
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">
                    <Skeleton width="70px" height="30px"/>
                  </div>
                  <Link to="" onClick={follow} className="btn-main">
                    <Skeleton width="50px" height="30px"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                          {author.followers} followers
                        </div>
                        <Link to="" onClick={follow} className="btn-main">
                          {following ? "Unfollow" : "Follow"}
                        </Link>
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
        )}
      </div>
    </div>
  );
};

export default Author;
