import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchAuthor();
  }, [authorId]);

  const renderSkeleton = () => (
    <div className="row">
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <Skeleton width="150px" height="150px" borderRadius="50%" />
              <div className="profile_name">
                <h4>
                  <Skeleton width="200px" height="30px" />
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
            >
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ backgroundImage: `url(${author?.bannerImage})` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {loading || !author ? (
              renderSkeleton()
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author?.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author?.authorName}
                            <span className="profile_username">@{author?.tag}</span>
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
                          {author?.followers + (follow ? 1 : 0)} followers
                        </div>
                        <button
                          className="btn-main"
                          onClick={() => setFollow(!follow)}
                        >
                          {follow ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="row">
                        {/* THIS IS THE BULLETPROOF FIX */}
                        {author?.nftCollection?.map((nft) => (
                          <div
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            key={nft.id}
                          >
                            <AuthorItems {...nft} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;