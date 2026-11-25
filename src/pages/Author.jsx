import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAuthor = async () => {
    setLoading(true);
    setError("");
    setAuthor(null);
    setIsFollowing(false);

    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${encodeURIComponent(authorId)}`,
        { signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch author data");
      }
      const data = await response.json();
      if (!controller.signal.aborted) {
        setAuthor(data);
        console.log("Fetched author data:", data);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error("Error fetching author data:", error);
        setError("Failed to fetch author data");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        }
      }
    };

    fetchAuthor();
    return () => controller.abort();
  }, [authorId]);

  if (!loading && error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  if (!loading && !author) {
    return <div className="container mt-5">Author not found.</div>;
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
                  {loading ? (
                    <>
                          <Skeleton width="150px" height="150px" borderRadius="50%" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                          justifyContent: "center",
                          flex: 1,
                          padding: "20px",
                        }}
                      >
                        <Skeleton width="180px" height="28px" borderRadius="5px" />
                        <Skeleton width="120px" height="18px" borderRadius="5px" />
                        <Skeleton width="250px" height="18px" borderRadius="5px" />
                        <Skeleton width="140px" height="20px" borderRadius="5px" />
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="de-flex-col">
                        <div className="profile_avatar">
                      <img src={author?.authorImage || AuthorImage} alt="" />
                       <i className="fa fa-check"></i>
                       </div>

                      <div className="profile_name">
                        <h4>
                          {author?.authorName}
                          <span className="profile_username">{author?.tag ? `@${author.tag}` : `Creator #${authorId}`}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address}
                          </span>
                        </h4>
                      </div>
                      </div>
                <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{(author?.followers ?? 0) + (isFollowing ? 1 : 0)} followers
                      </div>
                      <button className="btn-main" onClick={() => 
                        setIsFollowing((prev) => !prev)}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                  </>
                )}
                </div>
                </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId}
                    authorImage={author?.authorImage}
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