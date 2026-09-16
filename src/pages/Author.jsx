import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import { API_URLS, fetchApiObject } from "../api/nftApi";
import { AuthorProfileSkeleton } from "../components/UI/LoadingSkeletons";

const DEFAULT_AUTHOR_ID = 83937449;

const Author = () => {
  const { authorId } = useParams();
  const selectedAuthorId = authorId || String(DEFAULT_AUTHOR_ID);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    setAuthor(null);
    setLoading(true);
    setError("");
    setCopied(false);
    setIsFollowing(false);

    async function loadAuthor() {
      try {
        const data = await fetchApiObject(
          `${API_URLS.authors}?author=${encodeURIComponent(selectedAuthorId)}`,
          controller.signal
        );
        if (!controller.signal.aborted) setAuthor(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this author. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadAuthor();
    return () => controller.abort();
  }, [selectedAuthorId]);

  const copyAddress = async () => {
    if (!author?.address) return;
    await navigator.clipboard.writeText(author.address);
    setCopied(true);
  };

  const followerCount = Number(author?.followers || 0) + (isFollowing ? 1 : 0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="Author banner"
          className="text-light author-profile-banner"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="Author profile">
          <div className="container">
            {loading && <AuthorProfileSkeleton />}
            {!loading && error && (
              <p role="alert">{error} <Link to="/">View Top Sellers</Link></p>
            )}
            {!loading && !error && author && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt={author.authorName} />
                        <i className="fa fa-check" aria-hidden="true"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">@{author.tag}</span>
                            <span id="wallet" className="profile_wallet" title={author.address}>
                              {author.address}
                            </span>
                            <button id="btn_copy" type="button" onClick={copyAddress}>
                              {copied ? "Copied" : "Copy address"}
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower" aria-live="polite">
                          {followerCount} followers
                        </div>
                        <button
                          type="button"
                          className="btn-main author-follow-button"
                          aria-pressed={isFollowing}
                          onClick={() => setIsFollowing((following) => !following)}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="text-center">
                    <h2>{author.authorName}&apos;s NFTs</h2>
                    <div className="small-border bg-color-2"></div>
                  </div>
                  {!author.nftCollection?.length ? (
                    <p className="text-center">No NFTs are available for this author.</p>
                  ) : (
                    <div className="row">
                      {author.nftCollection.map((nft) => (
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.nftId}>
                          <article className="nft_coll author-nft-card">
                            <div className="nft_wrap">
                              <img src={nft.nftImage} className="img-fluid" alt={nft.title} />
                            </div>
                            <div className="nft_coll_info">
                              <h4>{nft.title}</h4>
                              <span>NFT #{nft.nftId}</span>
                              <div>{Number(nft.price).toFixed(2)} ETH</div>
                              <div className="author-nft-likes">
                                <i className="fa fa-heart" aria-hidden="true"></i> {nft.likes} likes
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  )}
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
