import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("TopSellers fetch error:", err);
        setLoading(false);
      });
  }, []);

  const skeletons = Array(12).fill(null); // Match visual grid count

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          {/* Header */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Seller List */}
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? skeletons.map((_, index) => (
                    <li key={index} className="animate-pulse">
                      <div className="author_list_pp">
                        <div
                          className="bg-gray-300 rounded-full"
                          style={{
                            height: "40px",
                            width: "40px",
                            margin: "0 auto 8px",
                          }}
                        />
                      </div>
                      <div className="author_list_info">
                        <div
                          className="bg-gray-300 rounded"
                          style={{ height: "20px", width: "75%", margin: "0 auto 6px" }}
                        />
                        <div
                          className="bg-gray-300 rounded"
                          style={{ height: "16px", width: "50%", margin: "0 auto" }}
                        />
                      </div>
                    </li>
                  ))
                : sellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
