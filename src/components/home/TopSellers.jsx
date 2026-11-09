import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopSellers.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const SkeletonRow = () => (
  <li className="ts-skeleton">
    <div className="ts-skeleton__avatar" />
    <div className="ts-skeleton__text">
      <span className="ts-skeleton__line" />
      <span className="ts-skeleton__line ts-skeleton__line--short" />
    </div>
  </li>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            {error ? (
              <p className="text-center ts-error">
                Top sellers didn’t load. Refresh the page to try again.
              </p>
            ) : (
              <ol className="author_list">
                {loading
                  ? Array.from({ length: 12 }, (_, i) => <SkeletonRow key={i} />)
                  : sellers.map((seller, index) => (
                      <li
                        key={seller.id}
                        data-aos="fade-up"
                        data-aos-delay={(index % 6) * 80}
                      >
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt={seller.authorName}
                              loading="lazy"
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
