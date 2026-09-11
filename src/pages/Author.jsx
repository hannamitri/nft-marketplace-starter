import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorSkeleton from "./AuthorSkeleton";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState([]);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(() => {
    return localStorage.getItem(`following-${id}`) === "true";
  });

  function toggleFollow() {
    const newFollowingState = !isFollowing;

    setIsFollowing(!isFollowing);

    localStorage.setItem(`following-${id}`, newFollowingState);
  }

  useEffect(() => {
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <AuthorSkeleton />;
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
          style={{ background: `url(${author.authorImage}) top` }}
          data-aos="fade-down"
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col" data-aos="fade-right">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
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
                  <div className="profile_follow de-flex" data-aos="fade-left">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers + (isFollowing ? 1 : 0)} followers
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
