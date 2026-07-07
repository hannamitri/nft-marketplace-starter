import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import useAuthor from "../hooks/useAuthor";

const Author = () => {
  const { authorId } = useParams();
  const { data: author, loading } = useAuthor(authorId);

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
                        <div className="skeleton" style={{ width: "80px", height: "80px", borderRadius: "50%" }}></div>
                      ) : (
                        <img src={author.authorImage} alt={author.authorName} />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <div className="skeleton" style={{ width: "150px", height: "20px", marginBottom: "8px" }}></div>
                              <div className="skeleton" style={{ width: "100px", height: "16px", marginBottom: "8px" }}></div>
                              <div className="skeleton" style={{ width: "200px", height: "16px" }}></div>
                            </>
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">@{author.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div className="skeleton" style={{ width: "100px", height: "20px", marginBottom: "8px" }}></div>
                      ) : (
                        <div className="profile_follower">{author.followers} followers</div>
                      )}
                      <Link to="#" className="btn-main">Follow</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={loading ? [] : author.nftCollection} loading={loading} />
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