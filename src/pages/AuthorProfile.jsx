import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AuthorWorks from "../components/author/AuthorWorks";
import { fetchAuthor } from "../components/author/authorApi";
import AuthorBanner from "../images/author_banner.jpg";

const AuthorActions = ({ authorId, followers, address }) => {
  const storageKey = `ultraverse:follow:v1:${authorId}`;
  const [following, setFollowing] = useState(false);
  const [followError, setFollowError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [followLoaded, setFollowLoaded] = useState(false);
  const followerCount = typeof followers === "number" ? followers + (following ? 1 : 0) : null;

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
      } finally {
        setFollowLoaded(true);
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

  const copyValue = async (value, label) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }
      await navigator.clipboard.writeText(String(value));
      setCopyMessage(`${label} copied.`);
    } catch (error) {
      console.error(`Failed to copy ${label.toLowerCase()}:`, error);
      setCopyMessage(`Could not copy ${label === "Author ID" ? label : label.toLowerCase()}. Please copy it manually.`);
    }
  };

  return (
    <div className="author-profile__actions">
      <div className="author-profile__id">
        <span className="profile_username">Author ID: {authorId}</span>
        <button type="button" onClick={() => copyValue(authorId, "Author ID")}>Copy ID</button>
      </div>
      {address && (
        <div className="author-profile__id">
          <span className="author-profile__address">Address: {address}</span>
          <button type="button" onClick={() => copyValue(address, "Address")}>Copy address</button>
        </div>
      )}
      {copyMessage && <div role="status">{copyMessage}</div>}
      {followLoaded ? (
        <div className="author-profile__follow">
          {followerCount !== null && (
            <span>{followerCount} {followerCount === 1 ? "follower" : "followers"}</span>
          )}
          <button type="button" className="btn-main" aria-pressed={following} onClick={toggleFollow}>
            {following ? "Unfollow" : "Follow"}
          </button>
          <span>Follow and count adjustment are saved in this browser only.</span>
        </div>
      ) : (
        <div className="author-profile__follow" role="status">
          <span className="visually-hidden">Loading follow preference...</span>
          <div className="author-profile__follow-skeleton" aria-hidden="true">
            <Skeleton width="100px" height="20px" borderRadius="4px" />
            <Skeleton width="90px" height="40px" borderRadius="4px" />
          </div>
        </div>
      )}
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
        const author = await fetchAuthor(id, controller.signal);
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
                    <div className="author-profile__follow-skeleton">
                      <Skeleton width="100px" height="20px" borderRadius="4px" />
                      <Skeleton width="90px" height="40px" borderRadius="4px" />
                    </div>
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
              <div className="author-profile__layout">
                <div className="author-profile__avatar">
                  <img src={result.author.authorImage} alt={result.author.authorName} />
                  <i className="fa fa-check author-profile__badge" aria-hidden="true"></i>
                </div>
                <div className="author-profile__info">
                  <h4>{result.author.authorName}</h4>
                  {result.author.tag && <div>@{result.author.tag}</div>}
                  <AuthorActions key={id} authorId={result.author.authorId} followers={result.author.followers} address={result.author.address} />
                  {result.author.id != null && (
                    <div>Author record ID: {result.author.id}</div>
                  )}
                </div>
              </div>
            )}
            {(status === "loading" || status === "success") && (
              <AuthorWorks
                key={id}
                authorId={id}
                authorImage={status === "success" ? result.author.authorImage : undefined}
                authorName={status === "success" ? result.author.authorName : undefined}
                items={status === "success" ? result.author.nftCollection : []}
                loading={status === "loading"}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorProfile;
