import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/skeleton/Skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Author = ({ data }) => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [authorItems, setAuthorItems] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    AOS.refresh();
    if (!authorId) return;

    async function fetchAuthorData() {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (response.data && Object.keys(response.data).length > 0) {
          setAuthor(response.data);
          setAuthorItems(response.data.nftCollection || []);
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoadingAuthor(false);
        setLoadingItems(false);
      }
    }

    fetchAuthorData();
  }, [authorId, data]);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setAuthor((prev) => ({
      ...prev,
      followers: prev.followers + (isFollowing ? -1 : 1),
    }));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* BANNER */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
          data-aos="fadeInDown"
          data-aos-duration="1000"
        >
          {loadingAuthor && (
            <div style={{ padding: "120px 0" }}>
              <Skeleton height={200} />
            </div>
          )}
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              {/* AUTHOR HEADER */}
              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      {/* Avatar */}
                      {loadingAuthor ? (
                        <Skeleton circle width={120} height={120} />
                      ) : (
                        <>
                          <img
                            src={author.authorImage}
                            alt={author.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </>
                      )}

                      {/* Name + Username + Wallet */}
                      <div className="profile_name">
                        <h4>
                          {loadingAuthor ? (
                            <>
                              <Skeleton width={200} height={24} />
                              <Skeleton width={150} height={20} />
                              <Skeleton width={250} height={20} />
                            </>
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
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

                  {/* FOLLOW BUTTON */}
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">

                      {/* Followers */}
                      {loadingAuthor ? (
                        <Skeleton width={120} height={20} />
                      ) : (
                        <div className="profile_follower">
                          {author.followers} followers
                        </div>
                      )}

                      {/* Follow Button */}
                      {loadingAuthor ? (
                        <Skeleton width={100} height={40} />
                      ) : (
                        <button
                          className={`btn-main ${isFollowing ? "btn-following" : ""}`}
                          onClick={toggleFollow}
                          style={{
                            transition: "0.3s",
                            background: isFollowing ? "#aaa" : "",
                          }}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      )}

                    </div>
                  </div>

                </div>
              </div>

              {/* AUTHOR ITEMS */}
              <div className="col-md-12 mt-4" data-aos="fadeInUp" data-aos-duration="800">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorItems}
                    author={author}
                    loadingItems={loadingItems}
                  />
                </div>
              </div>

              {/* MORE FROM THIS CREATOR */}
              {!loadingItems && authorItems.length > 0 && (
                <div className="col-md-12 mt-5" data-aos="fadeInUp" data-aos-delay="200">
                  <h3 className="mb-3">More from this creator</h3>

                  <div className="row">
                    {authorItems.slice(0, 3).map((item, index) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={index} data-aos="fadeInUp" data-aos-delay={index * 100}>
                        <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                          <img
                            src={item.nftImage}
                            alt={item.title}
                            className="img-fluid rounded"
                          />
                        </Link>
                        <h5 className="mt-2">{item.title}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skeleton for More From This Creator */}
              {loadingItems && (
                <div className="col-md-12 mt-5">
                  <Skeleton width={250} height={30} />
                  <div className="row mt-3">
                    {[1, 2, 3].map((i) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={i}>
                        <Skeleton height={200} />
                        <Skeleton width={150} height={20} className="mt-2" />
                      </div>
                    ))}
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