import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();

  const [authorDetails, setAuthorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorDetails(authorId);
  }, [authorId]);

  async function fetchAuthorDetails(authorId) {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorDetails(data);
    } catch (error) {
      console.error("There was an error fetching the author items", error);
    } finally {
      setLoading(false);
    }
  }

  function incrementFollowers() {
    setAuthorDetails((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers + 1,
    }));
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
              <div className="col-md-12">{loading? ( <div className="d_profile de-flex" data-aos="fade-in" data-aos-delay="100" data-aos-duration="1000">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div className="author__img--skeleton skeleton" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4 className="">
                          <div className="author__title--skeleton skeleton"/>
                          <div className="author__tag--skeleton skeleton"/>
                          <div id="wallet" className="author__wallet--skeleton skeleton"/>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="author__followers--skeleton skeleton"/>
                      <div className="author__follow--skeleton skeleton"/>

                    </div>
                  </div>
                </div>
                ) : (               
                <div className="d_profile de-flex" >
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorDetails.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorDetails.authorName}
                          <span className="profile_username">
                            {authorDetails.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorDetails.address}
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
                        {authorDetails.followers} followers
                      </div>
                      <button className="btn-main" onClick={incrementFollowers}>
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
