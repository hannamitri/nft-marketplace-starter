import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import SkeletonCard from "../components/UI/SkeletonCard";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(res.data);
        setFollowerCount(res.data.followers);
      } catch (err) {
        console.error("Error fetching author:", err);
      }
    };
    fetchAuthor();
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount((prev) => Math.max(prev - 1, 0));
    } else {
      setFollowerCount((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

  if (!author) {
    return (
      <div className="container mt-5">
        <div className="row">
          {new Array(8).fill(0).map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${author.authorBanner}) top`}
          style={{ backgroundImage: `url(${author.authorBanner})`, backgroundPosition: "top" }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img className="lazy" src={author.authorImage} alt={author.name} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.name}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} follower{followerCount === 1 ? "" : "s"}
                      </div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
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
