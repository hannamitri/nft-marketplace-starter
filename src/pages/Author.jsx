import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton.jsx";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [authorInfo, setAuthorInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const resultData = response.data;
        if (Array.isArray(resultData) && resultData.length > 0) {
          setAuthorInfo(resultData[0]);
        } else if (!Array.isArray(resultData)) {
          setAuthorInfo(resultData);
        } else {
          setError("Error: No valid data returned.");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authorId]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(authorInfo.address)
      .then(() => {
        console.log("Address copied to clipboard!");
        alert("Address copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying address:", error);
      });
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner})` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div
                    className="flex align-items-center"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="profile_avatar">
                      <Skeleton
                        width="150px"
                        height="150px"
                        borderRadius="100%"
                        style={{ marginRight: "20px" }}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div
                      className="flex flex-column gap-2"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "68%",
                      }}
                    >
                      <Skeleton
                        width="25%"
                        height="28px"
                        borderRadius="5px"
                        style={{ marginBottom: "8px" }}
                      />
                      <Skeleton
                        width="15%"
                        height="18px"
                        borderRadius="5px"
                        style={{ marginBottom: "4px" }}
                      />
                      <Skeleton
                        width="35%"
                        height="20px"
                        borderRadius="5px"
                      />
                    </div>
                    <Skeleton width="12%" height="42px" borderRadius="5px" />
                  </div>
                ) : error ? (
                  <p>{error}</p>
                ) : authorInfo.authorName ? (
                  <div className="d_profile de-flex" key={authorInfo.authorId}>
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorInfo.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorInfo.authorName}
                            <span className="profile_username">
                              @{authorInfo.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorInfo.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {isFollowing
                            ? authorInfo.followers + 1
                            : authorInfo.followers}{" "}
                          Followers
                        </div>
                        <button className="btn-main" onClick={toggleFollow}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No author data available.</p>
                )}
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorInfo={authorInfo} />
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
