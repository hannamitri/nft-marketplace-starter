import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ItemDetails.css";

const ITEM_DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

function DetailsSkeleton() {
  return (
    <div className="nd-layout" role="status" aria-label="Loading NFT details">
      <div className="nd-shimmer nd-image-placeholder" aria-hidden="true" />
      <div className="nd-skeleton-info" aria-hidden="true">
        <div className="nd-shimmer nd-line nd-line-long" />
        <div className="nd-shimmer nd-line nd-line-short" />
        <div className="nd-shimmer nd-line nd-line-medium" />
        <div className="nd-shimmer nd-avatar" />
        <div className="nd-shimmer nd-line nd-line-short" />
      </div>
    </div>
  );
}

export default function ItemDetails() {
  const { nftId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setItem(null);
    setError("");
    async function load() {
      const started = Date.now();
      try {
        if (!nftId) {
          setError("No NFT was selected. Choose a card from Hot Collections.");
          return;
        }
        const response = await axios.get(ITEM_DETAILS_URL, {
          params: { nftId },
          signal: controller.signal,
        });
        const details = response.data?.data ?? response.data;
        if (active) {
          if (details && (details.nftId != null || details.id != null))
            setItem(details);
          else setError("This NFT could not be found.");
        }
      } catch (err) {
        if (active && err.code !== "ERR_CANCELED")
          setError("Unable to load NFT details. Please try again.");
      } finally {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.max(0, 2000 - (Date.now() - started))),
        );
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [nftId]);

  function goBack() {
    // Browser history includes the previous route when navigating from a card.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  }

  const image = item?.nftImage ?? item?.nftimage ?? item?.image;
  const creatorImage = item?.creatorImage ?? item?.authorImage;
  const ownerId = item?.ownerId;
  const creatorId = item?.creatorId ?? item?.authorId;
  const ownerPath = `/author/${encodeURIComponent(ownerId)}`;
  const creatorPath = `/author/${encodeURIComponent(creatorId)}`;
  const tag = item?.tag ?? item?.id;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="NFT details" className="mt90 sm-mt-0 nd-section">
          <div className="container">
            <button
              className="nd-back"
              type="button"
              onClick={goBack}
              aria-label="Go back to previous page"
            >
              <span aria-hidden="true">←</span> Back
            </button>
            {loading ? (
              <DetailsSkeleton />
            ) : error ? (
              <div role="alert" className="nd-message">
                <p>{error}</p>
                <Link to="/">Return to Home</Link>
              </div>
            ) : item ? (
              <div className="nd-layout">
                <div className="nd-image-column">
                  {image ? (
                    <img
                      className="img-fluid img-rounded nd-image"
                      src={image}
                      alt={item.title || "NFT artwork"}
                    />
                  ) : (
                    <div className="nd-image-placeholder nd-empty-image">
                      Image unavailable
                    </div>
                  )}
                </div>
                <div className="item_info nd-info">
                  <h2 className="nd-title-row">
                    {item.title || item.name || "Untitled NFT"}
                    {tag != null && <span className="nd-tag"> #{tag}</span>}
                  </h2>
                  <div className="nd-stats" aria-label="NFT activity">
                    <div
                      className="nd-stat"
                      aria-label={`${item.views ?? 0} views`}
                    >
                      <i className="fa fa-eye" aria-hidden="true" />
                      <span>{item.views ?? 0}</span>
                    </div>
                    <div
                      className="nd-stat"
                      aria-label={`${item.likes ?? 0} likes`}
                    >
                      <i className="fa fa-heart" aria-hidden="true" />
                      <span>{item.likes ?? 0}</span>
                    </div>
                  </div>
                  <p className="nd-description">
                    <strong>Description:</strong>{" "}
                    {item.description || "No description available."}
                  </p>
                  {ownerId != null && (
                    <div className="nd-creator">
                      {item.ownerImage && (
                        <Link to={ownerPath} aria-label="View owner profile">
                          <img
                            src={item.ownerImage}
                            alt="Owner avatar"
                            className="nd-creator-image"
                          />
                        </Link>
                      )}
                      <div>
                        <h6>Owner</h6>
                        <span className="nd-creator-name">
                          {item.ownerName || String(ownerId)}
                        </span>
                      </div>
                    </div>
                  )}
                  {creatorId != null && (
                    <div className="nd-creator">
                      {creatorImage && (
                        <Link
                          to={creatorPath}
                          aria-label="View creator profile"
                        >
                          <img
                            src={creatorImage}
                            alt="Creator avatar"
                            className="nd-creator-image"
                          />
                        </Link>
                      )}
                      <div>
                        <h6>Creator</h6>
                        <span className="nd-creator-name">
                          {item.creatorName || String(creatorId)}
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="nd-price">
                    <strong>Price:</strong>{" "}
                    <span className="nd-price-value">
                      {item.price != null ? `${item.price} ETH` : "Unavailable"}
                    </span>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
