import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { fetchTopSellers } from "../services/topSellers";

const Author = () => {
  const { authorId } = useParams();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(Boolean(authorId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authorId) {
      return;
    }

    let isMounted = true;

    fetchTopSellers()
      .then((sellers) => {
        const matchingSeller = sellers.find(
          (item) => String(item.authorId) === authorId
        );

        if (isMounted) {
          setSeller(matchingSeller || null);
          setError(
            matchingSeller ? "" : "This seller profile could not be found."
          );
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Unable to load seller profile:", fetchError);
        if (isMounted) {
          setError(
            "This seller profile could not be loaded. Please try again later."
          );
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const showDefaultProfile = !authorId;
  const profileName = seller ? seller.authorName : "Monica Lucas";
  const profileImage = seller ? seller.authorImage : AuthorImage;

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
                {loading && <p role="status">Loading seller profile...</p>}
                {error && <p role="alert">{error}</p>}
                {(showDefaultProfile || seller) && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={profileImage} alt={profileName} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {profileName}
                            <span className="profile_username">
                              {seller ? `@${seller.authorId}` : "@monicaaaa"}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {seller
                                ? `Seller ID: ${seller.authorId}`
                                : "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7"}
                            </span>
                            {showDefaultProfile && (
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                    {showDefaultProfile && (
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">573 followers</div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {(showDefaultProfile || seller) && (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
