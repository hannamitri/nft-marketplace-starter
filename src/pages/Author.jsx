import React, { useEffect, useMemo, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import { useTopSellers } from "../hooks/useTopSellers";
import { useAuthorNfts } from "../hooks/useAuthorNfts";
import ImageWithFallback from "../components/UI/ImageWithFallback";
import Skeleton from "../components/UI/Skeleton";
import {
  buildAuthorProfileFromNfts,
  formatAuthorHandle,
  formatPseudoWallet,
  normalizeEthereumAddress,
} from "../utils/authorDisplay";

const Author = () => {
  useScrollRestoration();
  const { authorId } = useParams();
  const [showRouteSkeleton, setShowRouteSkeleton] = useState(authorId != null);
  const { sellers, loading, error } = useTopSellers();
  const {
    items: nftItems,
    allItems: allExploreItems,
    loading: nftsLoading,
    error: nftsError,
  } =
    useAuthorNfts(authorId);
  const targetItemCount = 8;

  const seller =
    authorId != null
      ? sellers.find((s) => String(s.authorId) === String(authorId))
      : null;

  const fallbackAuthor =
    !seller &&
    authorId != null &&
    !nftsLoading &&
    !nftsError &&
    nftItems.length > 0
      ? buildAuthorProfileFromNfts(authorId, nftItems)
      : null;

  const resolvedAuthor = seller || fallbackAuthor;

  const showLoadingProfile =
    authorId != null &&
    !error &&
    (loading || (!seller && !loading && nftsLoading));

  useEffect(() => {
    if (authorId == null) {
      setShowRouteSkeleton(false);
      return;
    }

    setShowRouteSkeleton(true);
    const timer = setTimeout(() => {
      setShowRouteSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [authorId]);

  const shouldShowProfileSkeleton =
    authorId != null && (showRouteSkeleton || showLoadingProfile);

  const showNotFound =
    authorId != null &&
    !showRouteSkeleton &&
    !loading &&
    !error &&
    !nftsLoading &&
    !nftsError &&
    !seller &&
    nftItems.length === 0;

  const showExploreError =
    authorId != null &&
    !showRouteSkeleton &&
    !loading &&
    !error &&
    !seller &&
    !nftsLoading &&
    Boolean(nftsError);

  const showProfile =
    authorId != null &&
    Boolean(resolvedAuthor) &&
    !showRouteSkeleton &&
    !loading &&
    (seller ? true : !nftsLoading);

  const showNoId = authorId == null;

  const profileUsername = resolvedAuthor
    ? formatAuthorHandle(resolvedAuthor.authorName)
    : "";
  const apiWallet = normalizeEthereumAddress(
    resolvedAuthor?.authorWallet ?? ""
  );
  const profileWallet =
    authorId != null
      ? apiWallet || formatPseudoWallet(authorId)
      : "";
  const likesSum = nftItems.reduce((s, i) => s + (Number(i.likes) || 0), 0);
  const profileFollowerText = nftsLoading
    ? "…"
    : nftsError
      ? "—"
      : `${likesSum.toLocaleString()} followers`;

  const copyWallet = () => {
    if (!profileWallet) return;
    void navigator.clipboard?.writeText(profileWallet);
  };

  const displayedNftItems = useMemo(() => {
    if (authorId == null) return [];

    const ownItems = nftItems.map((item) => ({
      ...item,
      isRecommended: false,
    }));
    if (ownItems.length >= targetItemCount) {
      return ownItems.slice(0, targetItemCount);
    }

    const ownNftIds = new Set(ownItems.map((item) => String(item.nftId || item.id)));
    const authorSeed = String(authorId)
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

    const fallbackItems = allExploreItems
      .filter(
        (item) =>
          String(item.authorId) !== String(authorId) &&
          !ownNftIds.has(String(item.nftId || item.id))
      )
      .slice()
      .sort((a, b) => {
        const aKey = ((Number(a.nftId) || 0) * 37 + authorSeed) % 9973;
        const bKey = ((Number(b.nftId) || 0) * 37 + authorSeed) % 9973;
        if (aKey !== bKey) return aKey - bKey;
        return (Number(a.nftId) || 0) - (Number(b.nftId) || 0);
      })
      .slice(0, Math.max(0, targetItemCount - ownItems.length))
      .map((item) => ({
        ...item,
        isRecommended: true,
      }));

    return [...ownItems, ...fallbackItems].slice(0, targetItemCount);
  }, [authorId, nftItems, allExploreItems]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

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
                {showNoId && (
                  <div className="py-5 text-center">
                    <p>Choose an author from Top Sellers on the home page.</p>
                    <Link to="/" className="btn-main">
                      Back to home
                    </Link>
                  </div>
                )}

                {authorId != null && !showRouteSkeleton && error && !loading && (
                  <div className="py-5 text-center">
                    <p>{error}</p>
                    <Link to="/" className="btn-main">
                      Back to home
                    </Link>
                  </div>
                )}

                {showExploreError && (
                  <div className="py-5 text-center">
                    <p>{nftsError}</p>
                    <Link to="/" className="btn-main">
                      Back to home
                    </Link>
                  </div>
                )}

                {shouldShowProfileSkeleton && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                        <div className="profile_name mt-3">
                          <Skeleton width="180px" height="20px" borderRadius="4px" />
                          <div className="mt-2">
                            <Skeleton width="140px" height="16px" borderRadius="4px" />
                          </div>
                          <div className="mt-2">
                            <Skeleton width="120px" height="16px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width="120px" height="16px" borderRadius="4px" />
                        </div>
                        <div className="mt-2">
                          <Skeleton width="90px" height="38px" borderRadius="4px" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showNotFound && (
                  <div className="py-5 text-center">
                    <p>Author not found.</p>
                    <Link to="/" className="btn-main">
                      Back to home
                    </Link>
                  </div>
                )}

                {showProfile && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <ImageWithFallback
                          src={resolvedAuthor.authorImage}
                          fallbackSrc={AuthorImage}
                          alt={resolvedAuthor.authorName}
                        />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {resolvedAuthor.authorName}
                            <span className="profile_username">
                              {profileUsername}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {profileWallet}
                            </span>
                            <button
                              id="btn_copy"
                              type="button"
                              title="Copy wallet"
                              onClick={copyWallet}
                            >
                              Copy
                            </button>
                          </h4>
                          <span className="d-block mt-2">
                            {resolvedAuthor.price} ETH
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {profileFollowerText}
                        </div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {showProfile && (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={displayedNftItems}
                      loading={nftsLoading}
                      error={nftsError}
                      profileAuthorImage={resolvedAuthor?.authorImage || ""}
                      profileAuthorName={resolvedAuthor?.authorName || "Creator"}
                    />
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
