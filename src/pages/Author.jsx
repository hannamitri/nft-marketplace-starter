import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import AOS from "aos";

const ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`follow:${authorId}`);
    setIsFollowing(stored === "1");
  }, [authorId]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${ENDPOINT}?author=${encodeURIComponent(authorId ?? "")}`)
      .then((res) => {
        if (!mounted) return;
        const data = res?.data ?? null;
        setAuthor(data);
        const baseFollowers = data?.followers ?? 0;
        const stored = localStorage.getItem(`follow:${authorId}`);
        setFollowersCount(baseFollowers + (stored === "1" ? 1 : 0));
      })
      .catch(() => {
        if (!mounted) return;
        setAuthor(null);
        setFollowersCount(0);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [authorId]);

  useEffect(() => {
    AOS.refresh();
  }, [loading, author]);

  const displayName = author?.author || author?.authorName || "Unknown";
  const rawTag =
    author?.tag ?? author?.username ?? author?.authorTag ?? "unknown";
  const username = rawTag.startsWith("@") ? rawTag : `@${rawTag}`;
  const avatar = author?.authorImage || AuthorImage;
  const banner = author?.authorBanner || AuthorBanner;
  const wallet = author?.address || author?.wallet || "—";

  const onCopy = () => {
    navigator.clipboard.writeText(wallet).catch(() => {});
  };

  const onToggleFollow = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      setFollowersCount((c) => Math.max(0, c + (next ? 1 : -1)));
      if (next) {
        localStorage.setItem(`follow:${authorId}`, "1");
      } else {
        localStorage.removeItem(`follow:${authorId}`);
      }
      return next;
    });
  };

  return (
    <div id="wrapper">
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .skeleton{
          background:linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%);
          background-size:200% 100%;
          animation:shimmer 1.2s linear infinite;
          border-radius:8px;
        }
      `}</style>

      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${banner}) top` }}
          data-aos="fade-down"
          data-aos-delay="0"
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row" data-aos="fade-up" data-aos-delay="50">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div
                          className="skeleton"
                          style={{ width: 90, height: 90, borderRadius: "50%" }}
                        />
                      ) : (
                        <img src={avatar} alt={displayName} />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {loading ? (
                          <h4>
                            <div
                              className="skeleton"
                              style={{
                                width: 160,
                                height: 20,
                                marginBottom: 8,
                              }}
                            />
                            <div
                              className="skeleton"
                              style={{
                                width: 120,
                                height: 16,
                                marginBottom: 8,
                              }}
                            />
                            <div
                              className="skeleton"
                              style={{
                                width: 280,
                                height: 14,
                                display: "inline-block",
                              }}
                            />
                          </h4>
                        ) : (
                          <h4>
                            {displayName}
                            <span className="profile_username">{username}</span>
                            <span id="wallet" className="profile_wallet">
                              {wallet}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={onCopy}
                            >
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="profile_follow de-flex"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <span
                            className="skeleton"
                            style={{
                              width: 120,
                              height: 16,
                              display: "inline-block",
                            }}
                          />
                        ) : (
                          `${followersCount} followers`
                        )}
                      </div>
                      {loading ? (
                        <div
                          className="skeleton"
                          style={{
                            width: 120,
                            height: 44,
                            borderRadius: 24,
                            marginTop: 8,
                          }}
                        />
                      ) : (
                        <button
                          className="btn-main"
                          onClick={onToggleFollow}
                          disabled={loading}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-12"
                data-aos="fade-up"
                data-aos-delay="150"
              >
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
