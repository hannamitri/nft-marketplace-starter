import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import NftCardSkeleton from "../components/UI/NftCardSkeleton";
import Skeleton from "../components/UI/Skeleton";

const API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const AuthorPageSkeleton = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section className="author-skeleton-banner" aria-hidden="true">
        <Skeleton width="100%" height="100%" borderRadius="0" />
      </section>
      <section aria-label="Loading author" role="status" aria-live="polite">
        <span className="sr-only">Loading author...</span>
        <div className="container">
          <div className="author-skeleton-profile">
            <Skeleton width="150px" height="150px" borderRadius="50%" />
            <div className="author-skeleton-details">
              <Skeleton width="190px" height="24px" borderRadius="2px" />
              <Skeleton width="130px" height="16px" borderRadius="2px" />
              <Skeleton width="200px" height="16px" borderRadius="2px" />
            </div>
            <div className="author-skeleton-follow">
              <Skeleton width="95px" height="16px" borderRadius="2px" />
              <Skeleton width="90px" height="38px" borderRadius="3px" />
            </div>
          </div>
          <div className="row">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <NftCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!authorId) {
      setError("No author was selected.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const fetchAuthor = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/authors`, {
          params: { author: authorId },
        });

        if (!data || !data.authorId) {
          throw new Error("Author not found");
        }

        setAuthor(data);
        setIsFollowing(false);
        setCopyStatus("Copy");
        setItems(
          (data.nftCollection || []).map((item) => ({
            ...item,
            authorId: data.authorId,
            authorImage: data.authorImage,
            ownerName: data.authorName,
          }))
        );
      } catch (requestError) {
        console.error("Unable to fetch author:", requestError);
        setError("Unable to load this author. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleFollowToggle = () => {
    setIsFollowing((currentlyFollowing) => !currentlyFollowing);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(author.address);
      setCopyStatus("Copied");
    } catch (copyError) {
      console.error("Unable to copy wallet address:", copyError);
      setCopyStatus("Copy failed");
    }
  };

  if (loading) return <AuthorPageSkeleton />;

  if (error) {
    return (
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container text-center" role="alert">
          <h2>{error}</h2>
          <Link className="btn-main" to="/">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const followerCount = (Number(author.followers) || 0) + (isFollowing ? 1 : 0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top / cover` }}
          data-aos="fade-up"
        ></section>

        <section aria-label="section" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
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
                          <button
                            id="btn_copy"
                            type="button"
                            title="Copy wallet address"
                            className={copyStatus === "Copied" ? "clicked" : ""}
                            onClick={handleCopyAddress}
                          >
                            {copyStatus}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount.toLocaleString()}{" "}
                        {followerCount === 1 ? "follower" : "followers"}
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
                  <AuthorItems items={items} />
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
