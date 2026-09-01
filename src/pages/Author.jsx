import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);
const [followers, setFollowers] = useState(0);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchAuthor = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );

      console.log("AUTHOR DATA:", response.data);

      setAuthor(response.data);
    setFollowers(response.data.followers);
    } catch (error) {
      console.error("Error fetching author:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAuthor();
}, [id]);

if (loading) {
    return <div>Loading...</div>
  }

  if (!author) {
    return <div>Author not found</div>;
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
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} 
                           alt={author.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
  {author.address}
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
                      <div className="profile_followers">
  {followers} followers
</div>

<button
  className="btn-main"
  onClick={() => {
  setFollowers(isFollowing ? followers - 1 : followers + 1);
  setIsFollowing(!isFollowing);
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
                  <AuthorItems author={author} />
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
