import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const SkeletonList = ({ count = 12 }) => (
  <>
    <style>{`
      .ts-sk-block {
        background: linear-gradient(90deg, #dcdce2 25%, #f0f0f4 50%, #dcdce2 75%);
        background-size: 300% 100%;
        animation: ts-sk-shine 1.2s linear infinite;
      }
      @keyframes ts-sk-shine {
        0% { background-position: 100% 50%; }
        100% { background-position: 0 50%; }
      }
    `}</style>
    <ol className="author_list">
      {Array.from({ length: count }).map((_, i) => {
        const delay = { animationDelay: `${i * 0.1}s` };
        return (
          <li key={i}>
            <div className="author_list_pp">
              <div
                className="ts-sk-block"
                style={{ width: 50, height: 50, borderRadius: "50%", ...delay }}
              />
            </div>
            <div
              className="author_list_info"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <div
                className="ts-sk-block"
                style={{ width: 120, height: 14, borderRadius: 4, ...delay }}
              />
              <div
                className="ts-sk-block"
                style={{ width: 60, height: 12, borderRadius: 4, ...delay }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  </>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await axios.get(TOP_SELLERS_URL);
        if (!cancelled) {
          setSellers(data);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load top sellers:", err);
        if (!cancelled) setStatus("error");
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
              <p className="text-center">Couldn't load top sellers.</p>
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
