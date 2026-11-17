import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AuthorWorks from "../components/author/AuthorWorks";
import { TOP_SELLERS_URL } from "../components/home/topSellersApi";
import { EXPLORE_URL } from "../components/home/marketplaceApi";
import AuthorBanner from "../images/author_banner.jpg";

const AuthorActions = ({ authorId }) => {
  const storageKey = `ultraverse:follow:v1:${authorId}`;
  const [following, setFollowing] = useState(false);
  const [followError, setFollowError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    const readFollowState = () => {
      try {
        const value = window.localStorage.getItem(storageKey);
        if (value !== null && value !== "1") {
          throw new Error("Invalid stored follow state");
        }
        setFollowing(value === "1");
        setFollowError("");
      } catch (error) {
        console.error("Failed to read follow state:", error);
        setFollowError("Follow state is unavailable in this browser.");
      }
    };

    const onStorage = (event) => {
      if (event.key === storageKey || event.key === null) {
        readFollowState();
      }
    };

    readFollowState();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const toggleFollow = () => {
    try {
      if (following) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, "1");
      }
      setFollowing(!following);
      setFollowError("");
    } catch (error) {
      console.error("Failed to update follow state:", error);
      setFollowError("Could not save your follow preference.");
    }
  };

  const copyAuthorId = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }
      await navigator.clipboard.writeText(String(authorId));
      setCopyMessage("Author ID copied.");
    } catch (error) {
      console.error("Failed to copy author ID:", error);
      setCopyMessage("Could not copy author ID. Please copy it manually.");
    }
  };

  return (
    <div className="author-profile__actions">
      <div className="author-profile__id">
        <span className="profile_username">Author ID: {authorId}</span>
        <button type="button" onClick={copyAuthorId}>Copy ID</button>
      </div>
      {copyMessage && <div role="status">{copyMessage}</div>}
      <div className="author-profile__follow">
        <span>{following ? 1 : 0} {following ? "follower" : "followers"} in this browser</span>
        <button type="button" className="btn-main" aria-pressed={following} onClick={toggleFollow}>
          {following ? "Following" : "Follow"}
        </button>
      </div>
      {followError && <div role="alert">{followError}</div>}
    </div>
  );
};

const AuthorProfile = () => {
  const { id } = useParams();
  const [result, setResult] = useState({ id, status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    window.scrollTo(0, 0);

    const loadAuthor = async () => {
      try {
        const response = await fetch(TOP_SELLERS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Top sellers request failed (${response.status})`);
        }

        const sellers = await response.json();
        if (!Array.isArray(sellers)) {
          throw new Error("Top sellers response was not a list");
        }

        let author = sellers.find((seller) => String(seller.authorId) === id);
        if (!author) {
          const exploreResponse = await fetch(EXPLORE_URL, { signal: controller.signal });
          if (!exploreResponse.ok) {
            throw new Error(`Explore request failed (${exploreResponse.status})`);
          }
          const items = await exploreResponse.json();
          if (!Array.isArray(items)) throw new Error("Explore response was not a list");
          const item = items.find((entry) => String(entry.authorId) === id);
          if (item) {
            author = {
              authorId: item.authorId,
              authorImage: item.authorImage,
              authorName: `Creator #${item.authorId}`,
            };
          }
        }
        if (!controller.signal.aborted) {
          setResult(
            author ? { id, status: "success", author } : { id, status: "not-found" }
          );
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load author:", error);
          setResult({ id, status: "error" });
        }
      }
    };

    loadAuthor();
    return () => controller.abort();
  }, [id]);

  const status = result.id === id ? result.status : "loading";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="Author banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="Author profile">
          <div className="container">
            {status === "loading" && (
              <div role="status">
                <span className="visually-hidden">Loading author profile...</span>
                <div className="author-profile__skeleton" aria-hidden="true">
                  <Skeleton width="120px" height="120px" borderRadius="50%" />
                  <div className="author-profile__skeleton-info">
                    <Skeleton width="200px" height="24px" borderRadius="4px" />
                    <Skeleton width="130px" height="16px" borderRadius="4px" />
                    <Skeleton width="90px" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            )}
            {status === "error" && (
              <div role="alert">Author profile could not be loaded.</div>
            )}
            {status === "not-found" && (
              <div role="alert">Author not found.</div>
            )}
            {status === "success" && (
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={result.author.authorImage} alt={result.author.authorName} />
                    <i className="fa fa-check"></i>
                    <div className="profile_name author-profile__info">
                      <h4>{result.author.authorName}</h4>
                      <AuthorActions key={id} authorId={result.author.authorId} />
                      {result.author.price != null && <span>{result.author.price} ETH</span>}
                      {result.author.id != null && (
                        <div>Seller record ID: {result.author.id}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(status === "loading" || status === "success") && (
              <AuthorWorks key={id} authorId={id} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorProfile;
