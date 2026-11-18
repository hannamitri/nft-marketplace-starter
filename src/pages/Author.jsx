
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    setAuthor(null);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
        setError("Unable to load author information.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authorId]);

  if (isLoading) {
    return (
      <div className="container mt-5 mb-5">
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#e5e5e5",
              marginRight: "20px",
            }}
          ></div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                width: "180px",
                height: "22px",
                backgroundColor: "#e5e5e5",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            ></div>

            <div
              style={{
                width: "120px",
                height: "15px",
                backgroundColor: "#e5e5e5",
                borderRadius: "4px",
              }}
            ></div>
          </div>
        </div>

        <div className="row mt-5">
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              key={index}
            >
              <div
                style={{
                  height: "250px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="container text-center mt-5">
        <h3>{error || "Author not found."}</h3>

        <Link to="/" className="btn-main">
          Back to Home
        </Link>
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
                      <img
                        src={author.authorImage || AuthorImage}
                        alt={author.authorName || "Author"}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
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
                  <AuthorItems
                    nftCollection={author.nftCollection}
                    authorImage={author.authorImage}
                    authorId={author.authorId}
                  />
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

