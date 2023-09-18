import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";



const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setloadingAuthor] = useState(null);
  const [authorItems, setAuthorItems] = useState([]);
  const [followed, setFollowed] = useState(false);

  const fetchAuthor = async () => {
    setloadingAuthor(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setAuthorItems(
      data?.nftCollection.map((item) => ({
        ...item,
        authorImage: data?.authorImage,
        authorId: data?.authorId,
      }))
    );
    setloadingAuthor(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
  }, []);

  function followButton() {
    if (followed) {
      setAuthor({ ...author, followers: author.followers - 1 });
    } else {
      setAuthor({ ...author, followers: author.followers + 1 });
    }
    setFollowed(!followed);
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  {loadingAuthor ? (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={100}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width={200} height={24} />
                              <br />
                              <Skeleton width={100} height={16} />
                              <br />
                              <Skeleton width={250} height={16} />
                              <br />
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton width={150} height={40} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author?.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author?.authorName}
                              <span className="profile_username">
                                @{author?.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
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
                            {author?.followers} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => followButton()}
                          >
                            {followed ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorItems={authorItems}
                    loadingAuthor={loadingAuthor}
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
