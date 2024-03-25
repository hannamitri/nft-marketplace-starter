import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data: ", error);
      }
    };

    fetchAuthorData();
  }, [authorId]);

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
          <>
            <section
              className="authorheader-skeleton"
            >
              <div className="avatar-skeleton">
                <img
                  className="loading-animation"
                  style={{
                    height: "150px",
                    width: "150px",
                    borderRadius: "75px",
                    position: "relative",
                    marginRight: "15px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "100px",
                  }}
                >
                  <div
                    className="loading-animation"
                    style={{ width: "180px", height: "20px" }}
                  ></div>
                  <div
                    className="loading-animation"
                    style={{ width: "90px", height: "15px" }}
                  ></div>
                  <div
                    className="loading-animation"
                    style={{ width: "180px", height: "15px" }}
                  ></div>
                </div>
              </div>
              <div
                className="loading-animation"
                style={{ width: "150px", height: "40px" }}
              ></div>
            </section>
            <div
              className="author-skeleton"
              style={{ flexWrap: "wrap", maxWidth: "1350px", margin: "0 auto" }}
            >
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
              <div className="authoritem-skeleton loading-animation"></div>
            </div>
          </>
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
                        <Link to="#" className="btn-main">
                          Follow
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
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Author;
