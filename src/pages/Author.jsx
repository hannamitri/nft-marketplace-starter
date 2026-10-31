import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();

  const [parentAuthor, setParentAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setParentAuthor(null);

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
        {
          params: { author: authorId }
        }
      )
      .then(({ data }) => {
        if (active) {
          setParentAuthor(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch author:", error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [authorId]);

  console.log(parentAuthor);

  const followAuthor = () => {
    setIsFollowed(prevIsFollowed => !prevIsFollowed);
    //Code to update backend server goes here
  };

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
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">

                          {/* Avatar */}
                          <div className="skeleton skeleton-avatar" />

                          {/* Verification badge */}
                          <i className="fa fa-check"></i>

                          <div className="profile_name">
                            <h4>
                              {/* Author name */}
                              <span className="skeleton skeleton-title" />

                              {/* Username */}
                              <span className="profile_username skeleton skeleton-subtitle" />

                              {/* Wallet address */}
                              <span id="wallet" className="profile_wallet">
                                <span className="skeleton skeleton-text" />
                              </span>

                              {/* Copy button */}
                              <button
                                id="btn_copy"
                                type="button"
                                title="Loading"
                                className="skeleton skeleton-button"
                                disabled
                                aria-label="Loading wallet copy button"
                              />
                            </h4>
                          </div>

                        </div>
                      </div>

                      {/* Followers and Follow button */}
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">

                          {/* Follower count */}
                          <div className="profile_follower">
                            <span className="skeleton skeleton-text" />
                          </div>

                          {/* Follow button */}
                          <span
                            className="btn-main skeleton skeleton-button"
                            aria-hidden="true"
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={parentAuthor?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {parentAuthor?.authorName}
                          <span className="profile_username">@{parentAuthor?.authorName}</span>
                          <span id="wallet" className="profile_wallet">
                            {parentAuthor?.address}
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
                      <div className="profile_follower">{parentAuthor?.followers + (isFollowed ? 1 : 0)} followers</div>
                      {isFollowed ? (
                        <Link to="#" className="btn-main" onClick={() => followAuthor()}>
                          Unfollow
                        </Link>
                      ) : (
                        <Link to="#" className="btn-main" onClick={() => followAuthor()}>
                          Follow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>

              )}
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems authors={parentAuthor} />
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
