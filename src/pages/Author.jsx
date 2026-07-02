import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
        setFollowers(data.followers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author:", error);
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? followers - 1 : followers + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(author.address);
    alert("Wallet address copied to clipboard!");
  };

  if (loading) return <div className="text-center" style={{ padding: "100px" }}>Loading...</div>;

  return (
    <div id="wrapper">
      <section id="profile_banner" style={{ background: `url(${AuthorBanner}) center` }}></section>
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={author.authorImage} alt={author.authorName} />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>{author.authorName} <span className="profile_username">@{author.tag}</span>
                        <span id="wallet" className="profile_wallet">{author.address}</span>
                        <button id="btn_copy" onClick={handleCopy} title="Copy Address">Copy</button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow">
                  <div className="profile_follower">{followers} followers</div>
                  <button className="btn-main" onClick={handleFollow}>
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems authorId={id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Author;
