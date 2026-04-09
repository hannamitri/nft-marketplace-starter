import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setTimeout(() => {
          setAuthor(data || null);
          setFollowers(data?.followers || 0);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setAuthor(null);
      });
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }

    setIsFollowing(!isFollowing);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        {/* BANNER */}
        <section
          id="profile_banner"
          className="text-light"
          style={{
            background: `url(${author?.bannerImage || AuthorBanner}) top`,
          }}
          data-aos="fade-up"
        ></section>

        <section data-aos="fade-up">
          <div className="container">
            <div className="row">

              {/* PROFILE */}
              <div className="col-md-12" data-aos="fade-up">
                <div className="d_profile de-flex">

                  {/* LEFT SIDE */}
                  <div className="de-flex-col" data-aos="fade-right">
                    <div className="profile_avatar">
                      {author ? (
                        <img src={author.authorImage || AuthorImage} alt="" />
                      ) : (
                        <div className="skeleton-circle"></div>
                      )}

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author ? (
                            author.authorName
                          ) : (
                            <div className="skeleton-text"></div>
                          )}

                          <span className="profile_username">
                            {author ? (
                              `@${author.tag}`
                            ) : (
                              <div className="skeleton-text small"></div>
                            )}
                          </span>

                          <span className="profile_wallet">
                            {author ? (
                              author.address
                            ) : (
                              <div className="skeleton-text small"></div>
                            )}
                          </span>

                          <button id="btn_copy">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="profile_follow de-flex" data-aos="fade-left">
                    <div className="de-flex-col">

                      <div className="profile_follower">
                        {author ? (
                          `${followers} followers`
                        ) : (
                          <div className="skeleton-text small"></div>
                        )}
                      </div>

                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>

                    </div>
                  </div>

                </div>
              </div>

              {/* ITEMS */}
              <div className="col-md-12" data-aos="fade-up">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection}
                    loading={!author}
                    authorImage={author?.authorImage}
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