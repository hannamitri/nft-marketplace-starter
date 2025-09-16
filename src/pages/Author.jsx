import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id: authorParam } = useParams();

  const [data, setData] = useState({
    authorId: "",
    authorName: "",
    authorImage: "",
    followers: 0,
    tag: "",
    address: "",
    nftCollection: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorParam}`;

    axios
      .get(url)
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authorParam]);

  useEffect(() => {
    if (data?.followers !== null) {
      setFollowerCount(data.followers);
    }
  }, [data]);

  if (loading) {
    return (
      <section>
        <div className="profile_avitar d-flex align-items-center mb-4">
          <Skeleton width="200px" height="28px" />
          <div className="ms-3">
            <Skeleton width="150px" height="16px" className="mt-2" />
            <Skeleton width="100px" height="16px" className="mt-1" />
            <Skeleton width="80px" height="32px" className="mt-3" />
          </div>
        </div>

        <div className="de_tab_content">
          <div className="tab-1">
            <div className="row">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <Skeleton width="100%" height="200px" borderRadius="12px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const {
    authorId,
    authorName,
    authorImage,
    followers,
    tag,
    address,
    nftCollection,
  } = data;

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
                      <img
                        src={authorImage}
                        alt={authorName}
                        style={{ width: 120, objectFit: "cover" }}
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">@{tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {address}
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
                        {followerCount} followers
                      </div>
                      <button
                        className="btn-main"
                        onClick={() => {
                          if (isFollowing) {
                            setFollowerCount(data.followers);
                            setIsFollowing(false);
                          } else {
                            setFollowerCount((c) => c + 1);
                            setIsFollowing(true);
                          }
                        }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={nftCollection}
                    authoerId={authorId}
                    authorName={authorName}
                    authorImage={authorImage}
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
