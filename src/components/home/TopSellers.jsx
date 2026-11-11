import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const MIN_LOADING_MS = 800;

const SkeletonList = ({ count = 12 }) => (
  <>
    <style>{`
      .ts-sk-shimmer {
        background: linear-gradient(
          90deg,
          #e2e2e7 25%,
          #f5f5f8 50%,
          #e2e2e7 75%
        );
        background-size: 200% 100%;
        animation: ts-sk-shimmer 1.5s ease-in-out infinite;
      }

      .ts-sk-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .ts-sk-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ts-sk-name {
        width: 120px;
        max-width: 100%;
        height: 14px;
        border-radius: 4px;
      }

      .ts-sk-price {
        width: 60px;
        max-width: 100%;
        height: 12px;
        border-radius: 4px;
      }

      @keyframes ts-sk-shine {
        from {
          background-position: -200% 0;
        }
        to {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ts-sk-shimmer {
          animation: none;
        }
      }
    `}</style>

    <ol className="author_list" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <div className="ts-sk-avatar ts-sk-shimmer" />
          </div>
          <div className="author_list_info ts-sk-info">
            <div className="ts-sk-name ts-sk-shimmer" />
            <div className="ts-sk-price ts-sk-shimmer" />
          </div>
        </li>
      ))}
    </ol>
  </>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");

      try {
        const minDelay = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS)
        );

        const [{ data }] = await Promise.all([
          axios.get(TOP_SELLERS_URL),
          minDelay,
        ]);

        if (!cancelled) {
          setSellers(data);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load top sellers:", err);

        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

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
            {status === "loading" && <SkeletonList />}

            {status === "error" && (
              <p className="text-center">
                Couldn't load top sellers.
              </p>
            )}

            {status === "ready" && (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;


