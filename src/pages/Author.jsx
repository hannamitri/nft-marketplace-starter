import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import AuthorBanner from "../images/author_banner.jpg";

const DEFAULT_AUTHOR_ID = "73855012";

const Author = () => {
  const { authorId } = useParams();
  const activeAuthorId = authorId || DEFAULT_AUTHOR_ID;
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchAuthor() {
      setLoading(true);
      setError("");
      setCopyStatus("idle");
      setFollowing(false);

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          { params: { author: activeAuthorId } }
        );

        if (!cancelled) {
          setAuthor(data?.authorId ? data : null);

          if (!data?.authorId) {
            setError("Author not found.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);

        if (!cancelled) {
          setAuthor(null);
          setError("Unable to load this author right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    window.scrollTo(0, 0);
    fetchAuthor();

    return () => {
      cancelled = true;
    };
  }, [activeAuthorId]);

  function copyAddress() {
    if (!author?.address) {
      return;
    }

    const selectWalletAddress = () => {
      const wallet = document.getElementById("wallet");
      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(wallet);
      selection.removeAllRanges();
      selection.addRange(range);

      return selection;
    };

    let copySucceeded = false;
    const selection = selectWalletAddress();

    try {
      copySucceeded = document.execCommand("copy");
    } finally {
      selection.removeAllRanges();
    }

    if (copySucceeded) {
      setCopyStatus("copied");
      return;
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = author.address;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);
      copySucceeded = document.execCommand("copy");
      document.body.removeChild(textArea);
    } catch (error) {
      console.warn("Synchronous copy fallback unavailable:", error);
    }

    if (copySucceeded) {
      setCopyStatus("copied");
      return;
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(author.address)
        .then(() => setCopyStatus("copied"))
        .catch((error) => {
          console.warn("Automatic wallet copy unavailable:", error);
          selectWalletAddress();
          setCopyStatus("selected");
        });
      return;
    }

    selectWalletAddress();
    setCopyStatus("selected");
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error ? (
                  <p className="text-center">{error}</p>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        {loading ? (
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />
                        ) : (
                          <img src={author.authorImage} alt={author.authorName} />
                        )}

                        {!loading && <i className="fa fa-check"></i>}
                        <div className="profile_name">
                          {loading ? (
                            <>
                              <Skeleton width="180px" height="28px" />
                              <Skeleton width="280px" height="18px" />
                            </>
                          ) : (
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button
                                type="button"
                                id="btn_copy"
                                title={
                                  copyStatus === "selected"
                                    ? "Wallet selected; press Command+C to copy"
                                    : "Copy wallet address"
                                }
                                onClick={copyAddress}
                              >
                                {copyStatus === "copied"
                                  ? "Copied"
                                  : copyStatus === "selected"
                                  ? "Selected"
                                  : "Copy"}
                              </button>
                            </h4>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {loading ? (
                          <Skeleton width="110px" height="18px" />
                        ) : (
                          <div className="profile_follower">
                            {author.followers + (following ? 1 : 0)} followers
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn-main"
                          aria-pressed={following}
                          onClick={() => setFollowing((value) => !value)}
                          disabled={loading}
                        >
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!error && (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} loading={loading} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
