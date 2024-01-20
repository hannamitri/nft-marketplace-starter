import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "../components/UI/Skeleton";
const Author = ({ title }) => {
  const [authorDetails, setAuthorDetails] = useState('');
  const { id } = useParams();

  const getAuthor = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorDetails(data);
    console.log(data.nftCollection, "data");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      {
                        authorDetails ? <img src={authorDetails.authorImage} alt="" /> :
                          <Skeleton width="150px" height="150px" borderRadius="50%" />

                      }

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {
                          authorDetails ?
                            <h4>
                              {authorDetails.authorName}
                              <span className="profile_username">@{authorDetails.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorDetails.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4> :
                            <h4>
                              <Skeleton width="200px" />
                              <span className="profile_username">
                                <Skeleton width="100px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" />
                              </span>
                            </h4>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">

                      <div className="profile_follower">{authorDetails.followers} followers</div>
                      {
                        authorDetails ?
                          (
                            <Link to="#" className="btn-main">
                              Follow
                            </Link>
                          ) : (
                            <div className="profile_follower">
                              <Skeleton width="150px" height="40px" />
                            </div>
                          )}

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorDetails={authorDetails} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
};

export default Author;
