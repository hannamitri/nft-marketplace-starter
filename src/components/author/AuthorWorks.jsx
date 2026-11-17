import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../home/marketplaceApi";

const sources = [
  { key: "items", label: "New items", url: NEW_ITEMS_URL },
  { key: "collections", label: "Collections", url: HOT_COLLECTIONS_URL },
  { key: "explore", label: "Explore NFTs", url: EXPLORE_URL },
];

const AuthorWorks = ({ authorId }) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const loadSource = async (source) => {
      try {
        const response = await fetch(source.url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`${source.label} request failed (${response.status})`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error(`${source.label} response was not a list`);
        }
        if (!controller.signal.aborted) {
          setResults((previous) => ({
            ...previous,
            [source.key]: {
              authorId,
              status: "success",
              items: data.filter((item) => String(item.authorId) === String(authorId)),
            },
          }));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(`Failed to load author ${source.label.toLowerCase()}:`, error);
          setResults((previous) => ({
            ...previous,
            [source.key]: { authorId, status: "error" },
          }));
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
      items: result?.authorId === authorId && result.status === "success"
        ? result.items
        : [],
    };
  });
  const isEmpty = sourceResults.every(
    (source) => source.status === "success" && source.items.length === 0
  );
  const seenNftIds = new Set();
  const uniqueResults = sourceResults.map((source) => ({
    ...source,
    items: source.items.filter((item) => {
      if (item.nftId == null) return true;
      const nftId = String(item.nftId);
      if (seenNftIds.has(nftId)) return false;
      seenNftIds.add(nftId);
      return true;
    }),
  }));

  return (
    <div className="author-works">
      {sourceResults.map((source) => source.status === "error" && (
        <div role="alert" key={source.key}>{source.label} could not be loaded.</div>
      ))}
      {isEmpty && <p>No NFTs found for this author.</p>}
      <div className="row">
        {uniqueResults.map((source) => (
          <React.Fragment key={source.key}>
            {source.status === "loading" && (
              <>
                <span className="visually-hidden" role="status">
                  Loading {source.label.toLowerCase()}...
                </span>
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="col-lg-3 col-md-6 col-12 mb-4" key={index} aria-hidden="true">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                  </div>
                ))}
              </>
            )}
            {source.items.map((item) => (
              <div className="col-lg-3 col-md-6 col-12 mb-4" key={item.id}>
                <Link
                  className="author-works__image"
                  to={source.key === "items"
                    ? `/item-details/new/${item.id}`
                    : source.key === "explore"
                      ? `/item-details/explore/${item.id}`
                      : `/item-details/${item.id}`}
                >
                  <img src={item.nftImage} alt={item.title} />
                </Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AuthorWorks;
