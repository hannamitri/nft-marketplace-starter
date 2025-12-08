import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState([]);

  const { id } = useParams();

  async function fetchAuthorCollection() {
    try {
      const res = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorCollection();
  }, []);



  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {author.length === 0 ? (
          <Skeleton data-aos="fade" height={"360px"} width={"100%"} />
        ) : (
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            data-aos="fade"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
        )}

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {author.length === 0 ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div data-aos="fade-right" className="profile_avatar">
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"100%"}
                        />
                        <div className="profile_name">
                          <div>
                            <Skeleton width={"150px"} height={"24px"} />
                            <span className="profile_username">
                              <Skeleton width={"75px"} height={"24px"} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={"200px"} height={"24px"} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div data-aos="fade-left" className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={"50px"} height={"24px"} />
                        </div>
                        <Skeleton
                          width={"100px"}
                          height={"40px"}
                          borderRadius={"10px"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div data-aos="fade-right" className="profile_avatar">
                        <img src={author?.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">{`@${author?.tag}`}</span>
                            <span id="wallet" className="profile_wallet">
                              {`${author?.address}`}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div data-aos="fade-left" className="de-flex-col">
                        <div className="profile_follower">{`${author?.followers}`}</div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorCollection={author} />
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
