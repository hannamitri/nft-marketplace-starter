import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(response.data);
        setFollowers(response.data.followers);
      } catch (err) {
        console.error("Failed to fetch author data", err);
      }
    };
    fetchAuthor();
  }, [authorId]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  if (!authorData) return <p>Loading...</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ backgroundImage: `url(${authorData.banner})`, backgroundSize: "cover" }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="author" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">@{authorData.tag}</span>
                          <span className="profile_wallet">{authorData.address}</span>
                          <button id="btn_copy" title="Copy Text" onClick={() => navigator.clipboard.writeText(authorData.address)}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={authorData.nftCollection} imagecollect={authorData.authorImage} />
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