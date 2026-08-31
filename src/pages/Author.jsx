import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/author/AuthorItems";
import SkeletonCard from "../components/UI/SkeletonCard";
import SkeletonProfile from "../components/UI/SkeletonProfile";



const AUTHORS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchAuthor() {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(AUTHORS_API, {
          params: {
            author: authorId,
          },
        });

        if (isMounted) {
          const authorData = response.data || null;

          setAuthor(authorData);

          setFollowerCount(
            Number(authorData?.followers) || 0
          );

          setIsFollowing(false);
        }
      } catch (fetchError) {
        console.error(
          "Unable to load author information:",
          fetchError
        );

        if (isMounted) {
          setAuthor(null);
          setError(
            "Author information could not be loaded."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAuthor();

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  async function handleCopyAddress() {
  if (!author?.address) return;

  try {
    await navigator.clipboard.writeText(
      author.address
    );

    setCopyLabel("Copied!");

    window.setTimeout(() => {
      setCopyLabel("Copy");
    }, 1500);
  } catch (copyError) {
    console.error(
      "Unable to copy address:",
      copyError
    );
  }
}

function handleFollowToggle() {
  if (isFollowing) {
    setFollowerCount((currentCount) =>
      Math.max(currentCount - 1, 0)
    );
  } else {
    setFollowerCount(
      (currentCount) => currentCount + 1
    );
  }

  setIsFollowing(!isFollowing);
}

  if (isLoading) {
  return (
    <main
      id="wrapper"
      aria-busy="true"
      aria-label="Loading author profile"
    >
      <SkeletonProfile />

      <section className="author-skeleton-items">
        <div className="author-nft-skeleton-grid">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      </section>
    </main>
  );
}

  if (error || !author) {
    return (
      <main id="wrapper">
        <section
          className="container text-center"
          style={{ padding: "180px 20px" }}
        >
          <h2>Author unavailable</h2>
          <p>{error || "Author information was not found."}</p>

          <Link to="/" className="btn-main">
            Return Home
          </Link>
        </section>
      </main>
    );
  }

  const authorName =
    author.authorName || "Unknown Author";

  const authorImage =
    author.authorImage || AuthorImage;

  const authorTag =
    author.tag || "author";

  const authorAddress =
    author.address || "Address unavailable";

  return (
    <div id="wrapper">
      <div
        className="no-bottom no-top"
        id="content"
      >
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label={`${authorName} profile banner`}
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top / cover`,
          }}
        ></section>

        <section aria-label="Author profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorImage}
                        alt={`${authorName} profile`}
                      />

                      <i
                        className="fa fa-check"
                        aria-hidden="true"
                      ></i>

                      <div className="profile_name">
                        <h4>
                          {authorName}

                          <span className="profile_username">
                            @{authorTag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {authorAddress}
                          </span>

                          <button
                            id="btn_copy"
                            type="button"
                            title="Copy wallet address"
                            onClick={handleCopyAddress}
                          >
                            {copyLabel}
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

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollowToggle}
                      >
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
                    items={
                      Array.isArray(
                        author.nftCollection
                      )
                        ? author.nftCollection
                        : []
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