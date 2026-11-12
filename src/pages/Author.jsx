import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import "../components/home/TopSellers.css";

const AUTHORS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAuthor(null);
    setLoading(true);
    setFollowing(false);
    const controller = new AbortController();
    const started = Date.now();

    async function loadAuthor() {
      try {
        if (authorId) {
          const res = await axios.get(AUTHORS_URL, {
            params: { author: authorId },
            signal: controller.signal,
          });
          if (!controller.signal.aborted) setAuthor(res.data?.data ?? res.data);
        }
      } catch (error) {
        if (!controller.signal.aborted)
          console.error("Unable to load author", error);
      } finally {
        const remaining = Math.max(0, 2000 - (Date.now() - started));
        await new Promise((resolve) => setTimeout(resolve, remaining));
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadAuthor();
    return () => controller.abort();
  }, [authorId]);

  const name = author?.authorName ?? "Monica Lucas";
  const instagramId = author?.tag ?? "monicaaaa";
  const username = instagramId.startsWith("@")
    ? instagramId
    : `@${instagramId}`;
  const wallet =
    author?.address ?? "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7";
  const followers = author?.followers ?? 573;
  const displayedFollowers = followers + (following ? 1 : 0);
  const avatar = author?.authorImage ?? AuthorImage;

  return (
    <div id="wrapper" className="author-page">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {loading ? (
          <section
            className="ap-skeleton"
            aria-label="Loading author profile"
            role="status"
          >
            <div className="ap-shimmer ap-skeleton-banner" aria-hidden="true" />
            <div className="container">
              <div className="ap-skeleton-head">
                <div className="ap-shimmer ap-skeleton-avatar" />
                <div className="ap-skeleton-text">
                  <div className="ap-shimmer ap-skeleton-line" />
                  <div className="ap-shimmer ap-skeleton-line short" />
                </div>
              </div>
              <div className="ap-skeleton-grid">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="ap-shimmer ap-skeleton-tile" key={index} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
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
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={avatar} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {name}
                              <span className="profile_username">
                                {username}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {wallet}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {displayedFollowers} followers
                          </div>
                          <button
                            type="button"
                            className="btn-main"
                            aria-pressed={following}
                            onClick={() => setFollowing((current) => !current)}
                          >
                            {following ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        items={author?.nftCollection}
                        authorId={authorId}
                        authorImage={avatar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
