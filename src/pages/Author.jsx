import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const location = useLocation();
  const author = location.state?.author;

  const [authorInfo, setAuthorInfo] = useState(author);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        const matchingAuthor = response.data.find(
          (seller) => seller.authorId === author?.authorId
        );

        // Put your console.log statements here
        console.log("Collection author ID:", author?.authorId);
        console.log("Matching author:", matchingAuthor);

        if (matchingAuthor) {
          setAuthorInfo({ ...author, ...matchingAuthor });
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    }

    if (author?.authorId) {
      fetchAuthor();
    }
  }, [author?.authorId]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [author]);

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

                      {loading ? (
                        <div className="author-profile-skeleton-image"></div>
                      ) : (
                        <img
                          src={authorInfo?.authorImage || AuthorImage}
                          alt={authorInfo?.authorName || "Author"}
                        />
                      )}

                      {!loading && <i className="fa fa-check"></i>}

                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div className="author-profile-skeleton-name"></div>
                          ) : (
                            <>
                              {authorInfo?.authorName || "Author"}

                              <span className="profile_username">
                                {authorInfo?.authorId ? `@${authorInfo.authorId}` : ""}
                              </span>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={authorInfo} />
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