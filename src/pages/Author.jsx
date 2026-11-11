import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const AUTHORS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const MIN_LOADING_MS = 800;

const SkeletonStyles = () => (
  <style>{`
    .au-sk-shimmer {
      background: linear-gradient(
        90deg,
        #e2e2e7 25%,
        #f5f5f8 50%,
        #e2e2e7 75%
      );
      background-size: 200% 100%;
      animation: au-sk-shine 1.5s ease-in-out infinite;
    }

    .au-sk-profile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    .au-sk-details {
      display: flex;
      align-items: center;
      gap: 20px;
      min-width: 0;
      flex: 1;
    }

    .au-sk-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .au-sk-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 320px;
      max-width: 100%;
      min-width: 0;
    }

    .au-sk-name {
      width: 65%;
      height: 26px;
      border-radius: 4px;
    }

    .au-sk-tag {
      width: 45%;
      height: 16px;
      border-radius: 4px;
    }

    .au-sk-wallet {
      width: 100%;
      height: 14px;
      border-radius: 4px;
    }

    .au-sk-button {
      width: 100px;
      height: 38px;
      border-radius: 6px;
    }

    .au-sk-follow {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .au-sk-followers {
      width: 100px;
      height: 16px;
      border-radius: 4px;
    }

    .au-wallet {
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .au-copy-status {
      margin-top: 8px;
      font-size: 13px;
    }

    @keyframes au-sk-shine {
      from {
        background-position: -200% 0;
      }
      to {
        background-position: 200% 0;
      }
    }

    @media (max-width: 576px) {
      .au-sk-avatar {
        width: 90px;
        height: 90px;
      }

      .au-sk-details {
        gap: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .au-sk-shimmer {
        animation: none;
      }
    }
  `}</style>
);

const SkeletonProfile = () => (
  <div className="d_profile au-sk-profile" aria-hidden="true">
    <div className="au-sk-details">
      <div className="au-sk-avatar au-sk-shimmer" />

      <div className="au-sk-info">
        <div className="au-sk-name au-sk-shimmer" />
        <div className="au-sk-tag au-sk-shimmer" />
        <div className="au-sk-wallet au-sk-shimmer" />
        <div className="au-sk-button au-sk-shimmer" />
      </div>
    </div>

    <div className="au-sk-follow">
      <div className="au-sk-followers au-sk-shimmer" />
      <div className="au-sk-button au-sk-shimmer" />
    </div>
  </div>
);

const AuthorContent = ({ authorId }) => {
  const [author, setAuthor] = useState(null);
  const [status, setStatus] = useState("loading");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");
      setAuthor(null);
      setCopyStatus("");

      if (
        !authorId ||
        authorId === "undefined" ||
        authorId === "null"
      ) {
        setStatus("error");
        return;
      }

      try {
        const minDelay = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS)
        );

        const [{ data }] = await Promise.all([
          axios.get(AUTHORS_URL, {
            params: {
              author: authorId,
            },
          }),
          minDelay,
        ]);

        if (cancelled) return;

        if (
          !data ||
          typeof data !== "object" ||
          Array.isArray(data) ||
          !data.authorName ||
          String(data.authorId) !== String(authorId)
        ) {
          throw new Error(
            "The API did not return the requested author."
          );
        }

        setAuthor(data);
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load author:", err);
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [authorId]);

  const copyWallet = async () => {
    if (!author?.address) return;

    try {
      await navigator.clipboard.writeText(author.address);
      setCopyStatus("Copied!");
    } catch (err) {
      console.error("Failed to copy wallet address:", err);
      setCopyStatus(
        "Unable to copy. Please copy the address manually."
      );
    }
  };

  const username = author?.tag
    ? `@${String(author.tag).replace(/^@/, "")}`
    : "";

  return (
    <>
      <div
        className="col-md-12"
        aria-busy={status === "loading"}
      >
        {status === "loading" && <SkeletonProfile />}

        {status === "error" && (
          <p className="text-center" role="alert">
            Couldn't load this author. Please check the author
            link or try refreshing the page.
          </p>
        )}

        {status === "ready" && author && (
          <div className="d_profile de-flex">
            <div className="de-flex-col">
              <div className="profile_avatar">
                <img
                  src={author.authorImage || AuthorImage}
                  alt={author.authorName}
                />

                <i className="fa fa-check"></i>

                <div className="profile_name">
                  <h4>
                    {author.authorName}

                    {username && (
                      <span className="profile_username">
                        {username}
                      </span>
                    )}

                    {author.address && (
                      <>
                        <span
                          id="wallet"
                          className="profile_wallet au-wallet"
                        >
                          {author.address}
                        </span>

                        <button
                          id="btn_copy"
                          type="button"
                          title="Copy wallet address"
                          onClick={copyWallet}
                        >
                          Copy
                        </button>
                      </>
                    )}
                  </h4>

                  <div
                    className="au-copy-status"
                    role="status"
                    aria-live="polite"
                  >
                    {copyStatus}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile_follow de-flex">
              <div className="de-flex-col">
                <div className="profile_follower">
                  {author.followers ?? 0} followers
                </div>

                <Link to="#" className="btn-main">
                  Follow
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {status !== "error" && (
        <div className="col-md-12">
          <div className="de_tab tab_simple">
            <AuthorItems
              loading={status === "loading"}
              items={author?.nftCollection ?? []}
              authorId={authorId}
              authorImage={author?.authorImage}
              authorName={author?.authorName}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Author = () => {
  const { id } = useParams();

  return (
    <div id="wrapper">
      <SkeletonStyles />

      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="Author banner"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="Author profile">
          <div className="container">
            <div className="row">
              <AuthorContent key={id} authorId={id} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;