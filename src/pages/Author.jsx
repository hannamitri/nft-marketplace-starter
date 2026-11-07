import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  if (error) return <p>Error: {error}</p>;

  const skeletonItems = Array.from({ length: 4 });

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {isLoading ? (
          skeletonItems.map((_, index) => (
            <div className="col-md-12" key={index}>
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <Skeleton width="100%" height="180px" borderRadius="12px" />
                </div>
                <div className="profile_avatar">
                  <Skeleton width="60px" height="60px" borderRadius="50%" />
                </div>
                <div className="profile_name">
                  <Skeleton width="70%" height="20px" borderRadius="6px" />
                  <Skeleton width="40%" height="16px" borderRadius="6px" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{
                backgroundImage: `url(${AuthorBanner})`,
                backgroundPosition: "top",
              }}
            ></section>
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorData.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">{authorData.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
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
                          <div className="profile_follower">{authorData.followers} Followers</div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={(event) => {
                              event.preventDefault();
                              setIsFollowing((following) => !following);
                            }}
                          >
                            {isFollowing ? "UnFollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        authorData={authorData.nftCollection}
                        authorImage={authorData.authorImage}
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
