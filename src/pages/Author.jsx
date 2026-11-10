import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const location = useLocation();
  const author = location.state?.author;
  const normalizedAuthor =
  author?.authorId === 1
    ? {
        ...author,
        authorId: 83937449,
        authorName: "Monica Lucas",
      }
    : author;

  const [authorInfo, setAuthorInfo] = useState(normalizedAuthor);

  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const isLoading = loading || itemsLoading;

  
  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        const matchingAuthor = response.data.find(
          (seller) => seller.authorId === normalizedAuthor?.authorId
        );

        console.log("Collection author ID:", author?.authorId);
        console.log("Matching author:", matchingAuthor);

        if (matchingAuthor) {
          setAuthorInfo({ ...normalizedAuthor, ...matchingAuthor });
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }

    if (author?.authorId) {
      fetchAuthor();
    } else {
      setLoading(false);
    }
  }, [normalizedAuthor?.authorId]);

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
                      {isLoading ? (
                        <Skeleton
                          width="100px"
                          height="100px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img
                          src={authorInfo?.authorImage || AuthorImage}
                          alt={authorInfo?.authorName || "Author"}
                        />
                      )}

                      {!isLoading && <i className="fa fa-check"></i>}

                      <div className="profile_name">
                        <h4>
                          {isLoading ? (
                            <Skeleton
                              width="150px"
                              height="22px"
                              borderRadius="5px"
                            />
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
                  <AuthorItems
                    author={authorInfo}
                    onLoadingChange={setItemsLoading}
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