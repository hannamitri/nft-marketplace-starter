import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const authorData = res.data.data || res.data;

        setAuthor(authorData);
        setItems(authorData.nftCollection || []);

        const savedFollowers = localStorage.getItem(`followers_${authorId}`);
        const savedFollowing = localStorage.getItem(`following_${authorId}`);

        if (savedFollowers !== null) {
          setFollowers(Number(savedFollowers));
        } else {
          setFollowers(authorData.followers);
        }

        if (savedFollowing !== null) {
          setIsFollowing(savedFollowing === "true");
        }

      } catch (err) {
        console.error("Failed to fetch author", err);
      } finally {
        setLoading(false);
      }
    }

    if (authorId) fetchAuthor();
  }, [authorId]);

  function handleFollowToggle() {
    let newFollowers;

    if (isFollowing) {
      newFollowers = followers - 1;
    } else {
      newFollowers = followers + 1;
    }

    setFollowers(newFollowers);
    setIsFollowing(!isFollowing);

    localStorage.setItem(`followers_${authorId}`, newFollowers);
    localStorage.setItem(`following_${authorId}`, !isFollowing);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <AuthorSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        />
        <section>
          <div className="container">
            <div className="row">
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
                            @{author.tag}
                          </span>
                          <span className="profile_wallet">
                            {author.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followers} followers
                      </div>
                        <button
                          className="btn-main"
                          onClick={handleFollowToggle}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <AuthorItems
                  items={items}
                  authorImage={author.authorImage}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;
