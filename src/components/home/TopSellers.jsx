import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load top sellers");
        return res.json();
      })
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
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
            {loading && <div>Loading top sellers…</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading && !error && (
              <ol className="author_list">
                {sellers.map((s) => (
                  <li key={s.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${s.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={s.authorImage}
                          alt={s.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${s.authorId}`}>{s.authorName}</Link>
                      <span>{s.price} ETH</span>
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
