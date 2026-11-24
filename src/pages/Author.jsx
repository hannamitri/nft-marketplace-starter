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

  const [author, setAuthor] = useState(null);
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authorId) {
      setLoading(false);
      return;
    }
    let active = true;

    async function fetchAuthor() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        if (!response.ok) {
          throw new Error("Failed to fetch author details");
        }
        const data = await response.json();
        
        const selectedAuthor = data.find((item) => String(item.authorId) === String(authorId));
        
        if (!selectedAuthor) {
          throw new Error("Author not found");
        }
        if (active) {
          setAuthor(selectedAuthor);
        }
      } catch (error) {
        if (active) {
          setError(error.message);
      setSelectedAuthor(null);

      try {
        const baseUrl =
          "https://us-central1-nft-cloud-functions.cloudfunctions.net";

        const sellersResponse = await fetch(
          `${baseUrl}/topSellers`
        );

        if (!sellersResponse.ok) {
          throw new Error("Failed to fetch sellers");
        }

        const sellers = await sellersResponse.json();

        let author = sellers.find(
          (seller) =>
            String(seller.authorId) === String(authorId)
        );

        if (!author) {
          const itemsResponse = await fetch(
            `${baseUrl}/newItems`
          );

          if (!itemsResponse.ok) {
            throw new Error("Failed to fetch creators");
          }

          const items = await itemsResponse.json();

          const item = items.find(
            (item) =>
              String(item.authorId) === String(authorId)
          );

          if (item) {
            author = {
              authorId: item.authorId,
              authorImage: item.authorImage,
              authorName: `Creator #${item.authorId}`,
            };
          }
        }

        if (active) {
          setSelectedAuthor(author || null);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchAuthor();

    return () => {
      active = false;
    };
  }, [authorId]);

  if (loading) return <div className="container mt-5">Loading author...</div>;
  if (error) return <div className="container mt-5">{error}</div>;
  if (!authorId) {
    return (
      <div className="container mt-5">
        <h2>Select an author to view their profile</h2>
      </div>
    );
  if (loading) {
    return <div className="container mt-5">Loading author...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  if (!selectedAuthor) {
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
                    </div>
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={selectedAuthor.authorImage}
                        alt={selectedAuthor.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Loading..."}
                          <span className="profile_username">@{author?.tag || ""}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address || ""}
                          {selectedAuthor.authorName}

                          <span className="profile_username">
                            Creator #{selectedAuthor.authorId}
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

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Link to="/explore" className="btn-main">
                        Explore NFTs
                      </Link>
                    </div>
                  </div>
                  </>
                )}
                </div>
                </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author?.nftCollection ?? []}
                    authorImage={author?.authorImage}
                    loading={loading}
                   />
                  <AuthorItems authorId={authorId} />
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