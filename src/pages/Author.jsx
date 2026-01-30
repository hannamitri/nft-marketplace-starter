import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
        );
        // Add a small delay to make loading state visible
        await new Promise(resolve => setTimeout(resolve, 500));
        setAuthor(response.data);
        setFollowersCount(response.data.followers || 0);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const copyToClipboard = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
      alert("Address copied to clipboard!");
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount((prev) => prev + 1);
      setIsFollowing(true);
    }
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

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex" data-aos="fade-down">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <>
                          <img
                            src={author?.authorImage}
                            alt={author?.authorName}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author?.authorName}
                              <span className="profile_username">
                                @
                                {author?.tag ||
                                  author?.authorName
                                    ?.toLowerCase()
                                    .replace(/\s+/g, "")}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={copyToClipboard}
                              >
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <Skeleton width="100px" height="20px" />
                          <Skeleton
                            width="80px"
                            height="40px"
                            style={{ marginTop: "10px" }}
                          />
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followersCount} followers
                          </div>
                          <button
                            onClick={handleFollow}
                            className="btn-main"
                            style={{
                              backgroundColor: isFollowing ? "#888" : "",
                            }}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple" data-aos="fade-up">
                  <AuthorItems authorId={id} authorImage={author?.authorImage} loading={loading} />
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