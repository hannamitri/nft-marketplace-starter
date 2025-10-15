import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setSellers(Array.isArray(res.data) ? res.data : []))
      .catch(() => setSellers([]))
      .finally(() => setLoading(false));
  }, []);

  const data = loading ? new Array(12).fill(null) : sellers;

  return (
    <section id="section-popular" className="pb-5">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #e9ecef 0%, #f8f9fa 40%, #e9ecef 80%);
          background-size: 200% 100%;
          animation: shimmer 1.2s linear infinite;
          border-radius: 8px;
        }
        .author-id {
          display:block;
          font-size:12px;
          color:#6c757d;
          margin-top:2px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {data.map((seller, index) => {
                const isSkeleton = !seller;

                const id = seller?.id;
                const authorId = seller?.authorId;
                const name = seller?.authorName;
                const img = seller?.authorImage || AuthorImage;
                const price = typeof seller?.price === "number" ? `${seller.price} ETH` : "—";

                return (
                  <li key={id ?? index}>
                    <div className="author_list_pp">
                      {isSkeleton ? (
                        <div className="skeleton" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                      ) : (
                        <Link to="/author" title={name} state={{ authorId }}>
                          <img className="lazy pp-author" src={img} alt={name || "Author avatar"} />
                          <i className="fa fa-check"></i>
                        </Link>
                      )}
                    </div>

                    <div className="author_list_info">
                      {isSkeleton ? (
                        <>
                          <div className="skeleton" style={{ width: 120, height: 16, marginBottom: 6 }} />
                          <div className="skeleton" style={{ width: 70, height: 12 }} />
                        </>
                      ) : (
                        <>
                          <Link to="/author" state={{ authorId }}>
                            {name || `Author #${index + 1}`}
                          </Link>
                          <span>{price}</span>
                          {authorId ? <small className="author-id">ID: {authorId}</small> : null}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;