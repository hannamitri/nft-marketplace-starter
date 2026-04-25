import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopSellerRowSkeleton from "../common/TopSellerRowSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";
import { buildAuthorsUrl } from "../../constants/api";

const TOP_SELLERS_COUNT = 12;

const TopSellers = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();
  const [authorNamesById, setAuthorNamesById] = useState({});

  const topAuthors = useMemo(() => {
    const byAuthor = new Map();
    for (const item of uniqueItems) {
      const authorId = item.authorId;
      if (authorId === undefined || authorId === null) {
        continue;
      }
      if (!byAuthor.has(authorId)) {
        byAuthor.set(authorId, {
          authorId,
          authorImage: item.authorImage,
          totalEth: 0,
        });
      }
      const row = byAuthor.get(authorId);
      row.totalEth += Number(item.price) || 0;
    }
    return Array.from(byAuthor.values())
      .sort((a, b) => b.totalEth - a.totalEth)
      .slice(0, TOP_SELLERS_COUNT);
  }, [uniqueItems]);

  const topAuthorIdsKey = useMemo(
    () =>
      topAuthors
        .map((author) => author.authorId)
        .filter((id) => id !== undefined && id !== null)
        .join(","),
    [topAuthors]
  );

  useEffect(() => {
    if (loading || error || topAuthors.length === 0) {
      setAuthorNamesById({});
      return undefined;
    }

    let cancelled = false;

    const loadAuthorNames = async () => {
      const pairs = await Promise.all(
        topAuthors.map(async (author) => {
          try {
            const response = await fetch(buildAuthorsUrl(author.authorId));
            if (!response.ok) {
              return [author.authorId, null];
            }
            const data = await response.json();
            const name =
              typeof data.authorName === "string" && data.authorName.trim()
                ? data.authorName.trim()
                : null;
            return [author.authorId, name];
          } catch {
            return [author.authorId, null];
          }
        })
      );

      if (cancelled) {
        return;
      }

      const next = {};
      pairs.forEach(([authorId, name]) => {
        if (name) {
          next[authorId] = name;
        }
      });
      setAuthorNamesById(next);
    };

    loadAuthorNames();

    return () => {
      cancelled = true;
    };
  }, [loading, error, topAuthorIdsKey, topAuthors]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading && (
              <ol className="author_list">
                {Array.from({ length: TOP_SELLERS_COUNT }, (_, index) => (
                  <TopSellerRowSkeleton key={`top-seller-skeleton-${index}`} />
                ))}
              </ol>
            )}
            {error && (
              <div className="text-center">
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && (
              <ol className="author_list">
                {topAuthors.map((author) => {
                  const displayName =
                    authorNamesById[author.authorId] ??
                    `Creator #${String(author.authorId).slice(-6)}`;
                  return (
                  <li key={author.authorId}>
                    <div className="author_list_pp">
                      <Link to={`/author/${author.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={author.authorImage}
                          alt={displayName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${author.authorId}`}>
                        {displayName}
                      </Link>
                      <span>{author.totalEth.toFixed(2)} ETH</span>
                    </div>
                  </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
