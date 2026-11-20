import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // FETCH DYNAMIC AUTHOR DATA
  useEffect(() => {
    window.scrollTo(0, 0);

    const controller = new AbortController();

    const fetchAuthor = async () => {
      setLoading(true);
      setError(null);
      setAuthor(null);
      setIsFollowing(false);

      try {
        const response = await axios.get(API_URL, {
          params: { author: id },
          signal: controller.signal,
        });

        const data = response.data;

        const selectedAuthor = Array.isArray(data)
          ? data.find(
              (item) =>
                String(item.authorId ?? item.id) === String(id)
            )
          : data?.data && !Array.isArray(data.data)
          ? data.data
          : data;

        if (
          !selectedAuthor ||
          typeof selectedAuthor !== "object" ||
          Array.isArray(selectedAuthor)
        ) {
          throw new Error("Author not found");
        }

        if (!controller.signal.aborted) {
          setAuthor(selectedAuthor);
        }
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          err.name === "CanceledError" ||
          controller.signal.aborted
        ) {
          return;
        }

        console.error("Error loading author:", err);

        setError("Unable to load author information.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchAuthor();
    } else {
      setError("Invalid author ID.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  // FOLLOW / UNFOLLOW
  const handleFollow = () => {
    setIsFollowing((previous) => !previous);
  };

  // AUTHOR INFORMATION
  const authorName =
    author?.authorName || author?.name || "Unknown Author";

  const authorTag =
    author?.authorTag ||
    author?.tag ||
    authorName.replace(/\s+/g, "").toLowerCase();

  const authorWallet =
    author?.walletAddress ||
    author?.address ||
    author?.wallet ||
    "Wallet unavailable";

  const authorImage =
    author?.authorImage || author?.image || AuthorImage;

  const followers = Number(author?.followers) || 0;

  const displayedFollowers =
    followers + (isFollowing ? 1 : 0);

  // NFT COLLECTION
  const nftCollection =
    author?.nftCollection ||
    author?.nfts ||
    author?.collection ||
    [];

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* AUTHOR BANNER */}
        <section
          id="profile_banner"
          aria-label="Author banner"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top center / cover`,
          }}
        ></section>

        <section aria-label="Author profile">
          <div className="container">

            {/* SKELETON LOADING */}
            {loading && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            backgroundColor: "#e5e5e5",
                          }}
                        ></div>

                        <div className="profile_name">
                          <div
                            style={{
                              width: "180px",
                              height: "22px",
                              backgroundColor: "#e5e5e5",
                              borderRadius: "5px",
                              marginBottom: "12px",
                            }}
                          ></div>

                          <div
                            style={{
                              width: "130px",
                              height: "16px",
                              backgroundColor: "#e5e5e5",
                              borderRadius: "5px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NFT SKELETONS */}
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6"
                    key={index}
                  >
                    <div
                      className="nft__item"
                      style={{ minHeight: "330px" }}
                    >
                      <div
                        style={{
                          height: "210px",
                          backgroundColor: "#e5e5e5",
                          borderRadius: "8px",
                          marginBottom: "20px",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "80%",
                          height: "18px",
                          backgroundColor: "#e5e5e5",
                          borderRadius: "5px",
                          marginBottom: "12px",
                        }}
                      ></div>

                      <div
                        style={{
                          width: "40%",
                          height: "15px",
                          backgroundColor: "#e5e5e5",
                          borderRadius: "5px",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {!loading && error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}

            {/* DYNAMIC AUTHOR PROFILE */}
            {!loading && !error && author && (
              <div className="row">

                {/* AUTHOR PROFILE - FADE IN */}
                <div
                  className="col-md-12"
                  data-aos="fade-in"
                  data-aos-duration="800"
                >
                  <div className="d_profile de-flex">

                    <div className="de-flex-col">
                      <div className="profile_avatar">

                        {/* AUTHOR IMAGE */}
                        <img
                          src={authorImage}
                          alt={authorName}
                        />

                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {authorName}

                            {/* AUTHOR USERNAME */}
                            <span className="profile_username">
                              @{String(authorTag).replace(/^@/, "")}
                            </span>

                            {/* BLOCKCHAIN WALLET */}
                            <span
                              id="wallet"
                              className="profile_wallet"
                            >
                              {authorWallet}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* FOLLOW SECTION - FADE LEFT */}
                    <div
                      className="profile_follow de-flex"
                      data-aos="fade-left"
                      data-aos-duration="900"
                    >
                      <div className="de-flex-col">

                        <div
                          style={{
                            marginBottom: "10px",
                            textAlign: "center",
                          }}
                        >
                          <strong>{displayedFollowers}</strong>{" "}
                          followers
                        </div>

                        <button
                          type="button"
                          className="btn-main"
                          onClick={handleFollow}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>

                      </div>
                    </div>

                  </div>
                </div>

                {/* DYNAMIC NFT COLLECTION - FADE UP */}
                <div
                  className="col-md-12"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={
                        Array.isArray(nftCollection)
                          ? nftCollection
                          : []
                      }
                      author={author}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;