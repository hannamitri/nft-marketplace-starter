import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import "./TopSellers.css";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

function extractAuthors(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.authors)) return payload.authors;
  if (Array.isArray(payload?.data?.authors)) return payload.data.authors;
  if (Array.isArray(payload?.topSellers)) return payload.topSellers;
  if (Array.isArray(payload?.data?.topSellers)) return payload.data.topSellers;
  return [];
}

function getAuthorId(author) {
  return author.authorId ?? author.authorID ?? author.authorid ?? author.id;
}

function getAuthorKey(author) {
  const authorId = getAuthorId(author);
  return authorId == null
    ? (author.authorName ?? author.name ?? author.username ?? "").toLowerCase()
    : String(authorId);
}

function getDistinctAuthors(authors) {
  const seen = new Set();
  return authors
    .filter((author) => {
      const key = getAuthorKey(author);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

const TopSellers = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTopSellers() {
      try {
        const response = await axios.get(TOP_SELLERS_URL, {
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setAuthors(getDistinctAuthors(extractAuthors(response.data)));
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load top sellers. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadTopSellers();
    return () => controller.abort();
  }, []);

  return (
    <section id="section-popular" className="pb-5 top-sellers">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
              <ol className="author_list" aria-label="Loading top sellers">
                {Array.from({ length: 12 }, (_, index) => (
                  <li
                    className="ts-skeleton-row"
                    key={index}
                    aria-hidden="true"
                  >
                    <div className="ts-shimmer ts-skeleton-avatar" />
                    <div className="ts-skeleton-info">
                      <div className="ts-shimmer ts-skeleton-name" />
                      <div className="ts-shimmer ts-skeleton-price" />
                    </div>
                  </li>
                ))}
              </ol>
            ) : error ? (
              <p className="ts-status" role="alert">
                {error}
              </p>
            ) : authors.length === 0 ? (
              <p className="ts-status">No top sellers available.</p>
            ) : (
              <ol className="author_list">
                {authors.map((author, index) => {
                  const authorId = getAuthorId(author);
                  const authorName =
                    author.authorName ??
                    author.name ??
                    author.username ??
                    "Creator";
                  const authorImage =
                    author.authorImage ??
                    author.authorimage ??
                    author.image ??
                    AuthorImage;
                  const value =
                    author.price ?? author.ethPrice ?? author.volume;
                  const authorPath =
                    authorId == null
                      ? "/author"
                      : `/author/${encodeURIComponent(authorId)}`;

                  return (
                    <li key={getAuthorKey(author) || index}>
                      <div className="author_list_pp">
                        <Link to={authorPath} aria-label={`View ${authorName}`}>
                          <img
                            className="lazy pp-author"
                            src={authorImage}
                            alt={`${authorName} avatar`}
                            loading="lazy"
                          />
                          <i className="fa fa-check" aria-hidden="true" />
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={authorPath}>{authorName}</Link>
                        <span>{value == null ? "" : `${value} ETH`}</span>
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
