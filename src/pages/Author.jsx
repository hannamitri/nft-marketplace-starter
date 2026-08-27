import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
const [followerCount, setFollowerCount] = useState(0);

  const { authorId } = useParams();

  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const authorData = await response.json();
 setAuthor(authorData);
      setFollowerCount(authorData.followers);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [authorId]);

  function toggleFollow() {
  if (isFollowing) {
    setFollowerCount((prevCount) => prevCount - 1);
    setIsFollowing(false);
  } else {
    setFollowerCount((prevCount) => prevCount + 1);
    setIsFollowing(true);
  }
}

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
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
                        {followerCount} followers
                      </div>

                      <button className="btn-main" onClick={toggleFollow}>
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