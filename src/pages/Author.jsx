import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const authorId = id || "73855012";

    const getAuthor = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }

        const data = await response.json();

        console.log("Author API:", data);

        setAuthor(data);
        setFollowers(data.followers || 0);
        setFollowing(false);
      } catch (error) {
        console.error("Author API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getAuthor();
  }, [id]);

  const handleFollow = () => {
    if (following) {
      setFollowing(false);

      setFollowers((currentFollowers) =>
        Math.max(0, currentFollowers - 1)
      );
    } else {
      setFollowing(true);

      setFollowers((currentFollowers) =>
        currentFollowers + 1
      );
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Author Banner */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-aos="fade-in"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              {/* Profile */}
              <div className="col-md-12">
                <div
                  className="d_profile de-flex"
                  data-aos="fade-up"
                >
                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      <img
                        src={
                          author?.authorImage ||
                          AuthorImage
                        }
                        alt={
                          author?.authorName ||
                          "Author"
                        }
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {loading
                            ? "Loading..."
                            : author?.authorName ||
                              "Author"}

                          <span className="profile_username">
                            {author?.tag
                              ? `@${author.tag}`
                              : ""}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author?.address || ""}
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

                  {/* Follow */}
                  <div
                    className="profile_follow de-flex"
                    data-aos="fade-left"
                  >
                    <div className="de-flex-col">

                      <div className="profile_follower">
                        {followers} followers
                      </div>

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following
                          ? "Unfollow"
                          : "Follow"}
                      </button>

                    </div>
                  </div>
                </div>
              </div>

              {/* NFT Collection */}
              <div className="col-md-12">
                <div
                  className="de_tab tab_simple"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  <AuthorItems
                    items={
                      Array.isArray(
                        author?.nftCollection
                      )
                        ? author.nftCollection
                        : []
                    }
                    loading={loading}
                    authorImage={
                      author?.authorImage ||
                      AuthorImage
                    }
                    authorId={
                      author?.authorId
                    }
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