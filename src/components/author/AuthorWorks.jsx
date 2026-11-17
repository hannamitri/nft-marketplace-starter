import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../home/marketplaceApi";

const sources = [
  { key: "new", label: "New items", url: NEW_ITEMS_URL },
  { key: "collection", label: "Hot collections", url: HOT_COLLECTIONS_URL },
  { key: "explore", label: "Explore NFTs", url: EXPLORE_URL },
];

const AuthorWorks = ({ authorId, authorImage, authorName, items, loading = false }) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const loadSource = async (source) => {
      try {
        const response = await fetch(source.url, { signal: controller.signal });
        if (!response.ok) throw new Error(`${source.label} request failed (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error(`${source.label} response was not a list`);
        if (!controller.signal.aborted) {
          setResults((previous) => ({
            ...previous,
            [source.key]: { authorId, status: "success", items: data.filter((item) => String(item.authorId) === String(authorId)) },
          }));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(`Failed to load ${source.label.toLowerCase()}:`, error);
          setResults((previous) => ({ ...previous, [source.key]: { authorId, status: "error" } }));
        }
      }
    };
    sources.forEach(loadSource);
    return () => controller.abort();
  }, [authorId]);

  const sourceResults = sources.map((source) => {
    const result = results[source.key];
    return {
      ...source,
      status: result?.authorId === authorId ? result.status : "loading",
      items: result?.authorId === authorId && result.status === "success" ? result.items : [],
    };
  });
  const seen = new Set();
  const artworks = [
    ...items.map((item) => ({
      item,
      key: `author:${item.id}`,
      path: item.nftId == null
        ? `/item-details/author/${encodeURIComponent(authorId)}/${encodeURIComponent(item.id)}`
        : `/item-details/nft/${encodeURIComponent(item.nftId)}`,
    })),
    ...sourceResults.flatMap((source) => source.items.map((item) => ({
      item,
      key: `${source.key}:${item.id}`,
      path: item.nftId == null
        ? (source.key === "collection" ? `/item-details/${item.id}` : `/item-details/${source.key}/${item.id}`)
        : `/item-details/nft/${encodeURIComponent(item.nftId)}`,
    }))),
  ].filter(({ item }) => {
    if (item.nftId == null) return true;
    const key = String(item.nftId);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const fetching = loading || sourceResults.some((source) => source.status === "loading");
  const hasErrors = sourceResults.some((source) => source.status === "error");

  return (
  <div className="author-works" role="region" aria-label="Author NFT gallery">
    {sourceResults.map((source) => source.status === "error" && (
      <div role="alert" key={source.key}>{source.label} could not be loaded.</div>
    ))}
    {!loading && artworks.length > 0 && (
      <div className="row">
        {artworks.map(({ item, key, path }) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={key} data-aos="fade-up">
            <div className="author-works__thumbnail">
              <Link className="author-works__image" to={path}>
                <img src={item.nftImage} alt={item.title} />
              </Link>
              {authorImage && (
                <Link
                  className="author-works__avatar"
                  to={`/author/${encodeURIComponent(authorId)}`}
                  aria-label={`${authorName} profile`}
                >
                  <img src={authorImage} alt="" />
                  <i className="fa fa-check author-works__badge" aria-hidden="true"></i>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
    {fetching && (
      <div role="status">
        <span className="visually-hidden">Loading NFTs...</span>
        <div className="row" aria-hidden="true">
          {Array.from({ length: loading ? 8 : 4 }, (_, index) => (
            <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
              <Skeleton width="100%" height="200px" borderRadius="8px" />
            </div>
          ))}
        </div>
      </div>
    )}
    {!fetching && !hasErrors && artworks.length === 0 && <p>No NFTs found for this author.</p>}
  </div>
  );
};

export default AuthorWorks;
