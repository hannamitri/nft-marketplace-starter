import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

export const HOT_COLLECTIONS_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

// Handles both a plain array and common wrapped API responses.
export function extractCollections(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.collections)) return payload.collections;
  if (Array.isArray(payload?.data?.collections)) return payload.data.collections;
  return [];
}

export function getNftId(collection) {
  return collection.nftId ?? collection.nftid;
}

function CollectionCard({ collection }) {
  const nftId = getNftId(collection);
  const authorId = collection.authorId ?? collection.authorid;
  const authorImage = collection.authorImage ?? collection.authorimage;
  const nftImage = collection.nftImage ?? collection.nftimage;
  const code = collection.code ?? collection.ercCode ?? collection.erc;
  const title = collection.title ?? "Untitled collection";
  const detailsPath = nftId == null ? "/item-details" : `/item-details/${encodeURIComponent(nftId)}`;

  return (
    <article className="hc-card nft_coll">
      <div className="nft_wrap hc-card__image">
        <Link to={detailsPath} aria-label={`View ${title} details`}>
          <img src={nftImage} className="lazy img-fluid" alt={title} loading="lazy" />
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to={authorId == null ? "/author" : `/author?authorId=${encodeURIComponent(authorId)}`} aria-label={`View creator of ${title}`}>
          <img className="lazy pp-coll" src={authorImage} alt={`${title} creator`} loading="lazy" />
        </Link>
        <i className="fa fa-check" aria-hidden="true" />
      </div>
      <div className="nft_coll_info">
        <Link to={detailsPath}><h4>{title}</h4></Link>
        <span>{code}</span>
      </div>
    </article>
  );
}

export default function HotCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const started = Date.now();
      try {
        const response = await axios.get(HOT_COLLECTIONS_URL, { signal: controller.signal });
        setCollections(extractCollections(response.data).slice(0, 6));
      } catch (err) {
        if (err.code !== "ERR_CANCELED") setError("Unable to load collections. Please try again later.");
      } finally {
        const remaining = Math.max(0, 2000 - (Date.now() - started));
        await new Promise((resolve) => setTimeout(resolve, remaining));
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  const settings = {
    dots: false,
    infinite: collections.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, infinite: collections.length > 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1, infinite: collections.length > 1 } },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom hot-collections">
      <div className="container">
        <div className="row"><div className="col-lg-12"><div className="text-center">
          <h2>Hot Collections</h2><div className="small-border bg-color-2" />
        </div></div></div>
        {loading && (
          <div className="hc-skeleton-grid" role="status" aria-label="Loading Hot Collections">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="hc-skeleton-card" key={index} aria-hidden="true">
                <div className="hc-shimmer hc-skeleton-image" />
                <div className="hc-shimmer hc-skeleton-avatar" />
                <div className="hc-shimmer hc-skeleton-title" />
                <div className="hc-shimmer hc-skeleton-code" />
              </div>
            ))}
          </div>
        )}
        {error && <p role="alert" className="hc-status">{error}</p>}
        {!loading && !error && collections.length === 0 && <p className="hc-status">No collections available.</p>}
        {!loading && !error && collections.length > 0 && (
          <div className="hc-slider">
            <Slider {...settings}>
              {collections.map((collection) => (
                <div key={collection.id} className="hc-slide">
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
