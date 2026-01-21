import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await response.json();
        console.log("Top Sellers data:", data);
        setSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false);
      }
    };

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
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="author_list_info">
                      <div
                        style={{
                          height: "20px",
                          width: "120px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "4px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <div
                        style={{
                          height: "16px",
                          width: "60px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "4px",
                        }}
                      ></div>
                    </div>
                  </li>
                ))
              ) : (
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
