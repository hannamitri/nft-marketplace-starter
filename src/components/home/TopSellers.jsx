import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("TopSellers fetch failed:", e);
        setSellers([]);
      } finally {
        setLoading(false);
      }
    })();
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
            <ol className="author_list">
              {(loading ? new Array(12).fill(null) : sellers.slice(0, 12)).map(
                (seller, index) =>
                  loading ? (
                    <li key={`sk-${index}`}>
                      <div className="author_list_pp">
                        <div
                          className="lazy pp-author"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            background: "#eee",
                          }}
                        />
                      </div>
                      <div className="author_list_info">
                        <span>Loading…</span>
                      </div>
                    </li>
                  ) : (
                    <li key={seller.authorId ?? index}>
                      <div className="author_list_pp">
                        <Link to={`/author?authorId=${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={
                              seller.authorImage || "/images/author_thumbnail.jpg"
                            } 
                            alt={seller.authorName || "Author"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author?authorId=${seller.authorId}`}>
                          {seller.authorName || seller.name || "Unknown"}
                        </Link>
                        <span>
                          {(seller.totalSales ??
                            seller.sales ??
                            seller.price ??
                            0) + " ETH"}
                        </span>
                      </div>
                    </li>
                  )
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
