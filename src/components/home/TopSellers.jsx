import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const PROD_BASE = "https://nft-marketplacee.web.app";

const TopSellers = () => {

const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("topSellerss fetch failed:", e);
      setSellers([]);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  }

  useEffect(() => {
    fetchTopSellers();
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
              {loading
                ? 
                  new Array(12).fill(0).map((_, idx) => (
                    <li key={`skeleton-${idx}`}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                          }}
                        />
                        <i className="fa fa-check" />
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton"
                          style={{
                            width: 120,
                            height: 16,
                            borderRadius: 6,
                            marginBottom: 6,
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: 60, height: 14, borderRadius: 6 }}
                        />
                      </div>
                    </li>
                  ))
                : 
                  sellers.map((seller, idx) => {
                    const name =
                      seller.name ||
                      seller.authorName ||
                      seller.sellerName ||
                      "Unknown";
                    const amount =
                      seller.totalSales ?? seller.price ?? seller.amount ?? null;
                    const img = seller.authorImage || AuthorImage;
                    const authorId = seller.authorId;

                    return (
                      <li key={authorId ?? idx}>
                        <div className="author_list_pp">
                          <a
                            href={`${PROD_BASE}/author/${authorId}`}
                            title={`Creator: ${name}`}
                          >
                            <img className="lazy pp-author" src={img} alt={name} />
                            <i className="fa fa-check"></i>
                          </a>
                        </div>
                        <div className="author_list_info">
                          <a href={`${PROD_BASE}/author/${authorId}`}>{name}</a>
                          <span>
                            {typeof amount === "number" ? `${amount} ETH` : "—"}
                          </span>
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
