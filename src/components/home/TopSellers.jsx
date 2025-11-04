import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then(res => res.json())
      .then(data => {
        setSellers(data);
        setLoading(false);
        console.log("Fetched Top Sellers:", data);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const renderSkeletons = () =>
    new Array(12).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
        <div className="top_seller skeleton d-flex align-items-center">
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ccc",
            marginRight: "15px"
          }} />
          <div>
            <div style={{ height: "20px", width: "100px", background: "#eee", marginBottom: "5px" }} />
            <div style={{ height: "15px", width: "60px", background: "#eee" }} />
          </div>
        </div>
      </div>
    ));

  return (
    <section id="section-top-sellers" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Top Sellers</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <div className="row">
          {loading
            ? renderSkeletons()
            : sellers.map((seller, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="top_seller d-flex align-items-center">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        src={seller.authorImage}
                        alt={seller.authorName}
                        className="rounded-circle"
                        style={{ width: "60px", height: "60px", marginRight: "15px" }}
                      />
                    </Link>
                    <div>
                      <h5 className="mb-1">{seller.authorName}</h5>
                      <span className="text-muted">{seller.price} ETH</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;