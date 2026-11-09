import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ItemDetails.css";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

function getCollections(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.collections)) return payload.collections;
  if (Array.isArray(payload?.data?.collections)) return payload.data.collections;
  return [];
}

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
        const response = await axios.get(API_URL, { signal: controller.signal });
        const matching = getCollections(response.data).find(
          (record) => String(record.nftId ?? record.nftid) === String(nftId)
        );
        if (active) {
          if (matching) setItem(matching);
          else setError("This NFT was not found in Hot Collections.");
        }
      } catch (err) {
        if (active && err.code !== "ERR_CANCELED") setError("Unable to load NFT details. Please try again.");
      } finally {
        await new Promise((resolve) => setTimeout(resolve, Math.max(0, 2000 - (Date.now() - started))));
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; controller.abort(); };
  }, [nftId]);

  function goBack() {
    // Browser history includes the previous route when navigating from a card.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  }

  const image = item?.nftImage ?? item?.nftimage;
  const authorImage = item?.authorImage ?? item?.authorimage;
  const authorId = item?.authorId ?? item?.authorid;
  const ercCode = item?.code ?? item?.ercCode ?? item?.erc;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="NFT details" className="mt90 sm-mt-0 nd-section">
          <div className="container">
            <button className="nd-back" type="button" onClick={goBack} aria-label="Go back to previous page">
              <span aria-hidden="true">←</span> Back
            </button>
            {loading ? <DetailsSkeleton /> : error ? (
              <div role="alert" className="nd-message"><p>{error}</p><Link to="/">Return to Home</Link></div>
            ) : item ? (
              <div className="nd-layout">
                <div className="nd-image-column">
                  {image ? <img className="img-fluid img-rounded nd-image" src={image} alt={item.title || "NFT artwork"} /> : <div className="nd-image-placeholder nd-empty-image">Image unavailable</div>}
                </div>
                <div className="item_info nd-info">
                  <h2>{item.title || "Untitled NFT"}</h2>
                  <p><strong>NFT ID:</strong> {String(nftId)}</p>
                  {ercCode && <p><strong>ERC code:</strong> {ercCode}</p>}
                  {authorId != null && <div className="nd-creator">
                    {authorImage && <img src={authorImage} alt="Creator avatar" className="nd-creator-image" />}
                    <div><h6>Creator</h6><Link to={`/author?authorId=${encodeURIComponent(authorId)}`}>{String(authorId)}</Link></div>
                  </div>}
                  <p className="nd-note">Additional information such as price, description, and ownership requires a separate NFT details data source.</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
