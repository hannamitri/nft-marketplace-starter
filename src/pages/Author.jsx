import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {

    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [followed, setFollowed] = useState(false);
  
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      setAuthor(data);
      setLoading(false);
    }

    function followAuthor() {
      setFollowed((prev) => !prev);
      setAuthor((prev) => ({
        ...prev,
        followers: followed ? prev.followers - 1 : prev.followers + 1,
      }));
    }

    useEffect(() => {
      fetchData();
    }, [id])

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
                      {loading ? (
                        <div
                          className="placeholder rounded-circle"
                          style={{ width: "150px", height: "150px" }}
                        />
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <span className="placeholder w-50" />
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? "" : `@${author?.tag}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? "" : author?.address}
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
                        {loading ? "" : `${author?.followers} followers`}
                      </div>
                      <Link to="#" className="btn-main" onClick={followAuthor}>
                        {followed ? "Unfollow" : "Follow"}
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
      </div>
    </div>
  );
};

export default Author;
