import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TOP_SELLERS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSellers() {
      try {
        const { data } = await axios.get(TOP_SELLERS_URL, {
          signal: controller.signal,
          timeout: 15000,
        });
        if (!Array.isArray(data)) throw new Error("Unexpected top sellers response");
        if (!controller.signal.aborted) setSellers(data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load top sellers. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchSellers();
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
            {loading && <p role="status">Loading top sellers...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && sellers.length === 0 && <p>No top sellers available.</p>}
            {!loading && !error && sellers.length > 0 && (
              <ol className="author_list">
              {sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/${seller.authorId}/author`} title={`View ${seller.authorName}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/${seller.authorId}/author`}>{seller.authorName}</Link>
                    <span>{Number(seller.price).toFixed(1)} ETH</span>
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
