import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Service from "../service/service";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState();
  const [follow, setFollow] = useState(true);

  const getAuthor = async () => {
    try {
      const data = await Service.fetchAuthor(authorId);
      setLoading(false);
      setAuthor(data);
    } catch (error) {
      console.error("Error getting author detail", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthor();
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
              {!loading && author != null ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              {author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
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
                          {follow ? author.followers : author.followers + 1}
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollow(!follow)}
                        >
                          {follow ? "Follow" : "UnFollow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width={150}
                          height={150}
                          borderRadius={9999}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width="100%"
                              height={25}
                              borderRadius={5}
                            />
                            <span className="profile_username">
                              <Skeleton
                                width="40%"
                                height={25}
                                borderRadius={5}
                              />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width="160px"
                                height={25}
                                borderRadius={5}
                              />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={60} height={25} borderRadius={5} />
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollow(!follow)}
                        >
                          {follow ? "Follow" : "UnFollow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />
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
