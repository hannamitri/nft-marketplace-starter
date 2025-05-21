import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get("author");

  const [loading, setLoading] = useState("");
  const [authorDetails, setAuthorDetails] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const fetchAuthorDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Author Details", error);
      return null;
    }
  };

  useEffect(() => {
    const loadAuthorDetails = async () => {
      setLoading(true);
      const data = await fetchAuthorDetails(authorId);
      if (data) {
        setAuthorDetails(data);
        setFollowersCount(data.followers);
      }
      setLoading(false);
    };
    loadAuthorDetails();
  }, [authorId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(authorDetails.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
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
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorDetails.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorDetails.name}
                          <span className="profile_username">
                            {authorDetails.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorDetails.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followersCount} followers</div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
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
