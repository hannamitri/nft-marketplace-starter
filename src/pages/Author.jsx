import React from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [followerCount, setFollowerCount] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((response) => {
        console.log(response.data);

        setAuthor(response.data);
        setFollowerCount(response.data.followers);
      })
      .catch((error) => {
        console.error("Unable to fetch author:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authorId]);

    const handleFollow = () => {
  setFollowerCount((previousCount) =>
    isFollowing ? previousCount - 1 : previousCount + 1
  );

  setIsFollowing((previousFollowing) => !previousFollowing);
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

        <section aria-label="section" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                      src={author?.authorImage}
                      alt={author?.authorName || "Author"}
                  />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Author"}
                          <span className="profile_username">
                            @{author?.tag || "username"}
                            </span>
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
                        {followerCount} followers
                          </div>
                      <button className="btn-main" onClick={handleFollow}>
                      {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    author={author}
                    items={author?.nftCollection || []}
                    loading={loading}
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
