import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      )
      .then((response) => {
        const foundAuthor = response.data.find(
          (item) => String(item.authorId) === authorId,
        );

        console.log(authorId);
        console.log(foundAuthor);

        setAuthor(foundAuthor);
      });
  }, [authorId]);

  if (!author) {
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
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />

                        <div style={{ marginTop: "20px" }}>
                          <Skeleton width="220px" height="30px" />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="180px" height="20px" />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="200px" height="20px" />
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="120px" height="20px" />

                        <div style={{ marginTop: "20px" }}>
                          <Skeleton width="120px" height="45px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "20px",
                      marginTop: "40px",
                    }}
                  >
                    {new Array(4).fill(0).map((_, index) => (
                      <div key={index}>
                        <Skeleton width="100%" height="300px" />

                        <div style={{ marginTop: "15px" }}>
                          <Skeleton width="80%" height="20px" />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <Skeleton width="60%" height="20px" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

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
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName || "Creator"}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName || "Unknown Creator"}

                          <span className="profile_username">
                            @
                            {(author.authorName || "creator")
                              .toLowerCase()
                              .replace(/\s/g, "")}
                          </span>

                          <span id="wallet" className="profile_wallet">
                            Creator ID: {author.authorId}
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
                      <div className="profile_follower">100 followers</div>

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
      </div>
    </div>
  );
};

export default Author;
