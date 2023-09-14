import React, { useEffect, useState } from 'react';
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012');
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, []);

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
                      {authorData && (
                        <>
                          <img src={authorData.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">@{authorData.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {authorData ? (
                        <>
                          <div className="profile_follower">{authorData.followers} followers</div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">Loading followers...</div>
                          <div className="btn-main">Loading...</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                {authorData && (
                  <div className="de_tab tab_simple">
                    <AuthorItems authorId={authorData.id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
