import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        setSellers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.message || "Failed to load top sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
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
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="lazy pp-author" style={{ background: "#ddd" }} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <span style={{ display: "block", background: "#ddd", height: "18px", width: "100px" }} />
                      <span style={{ display: "block", marginTop: "6px", background: "#eee", height: "14px", width: "70px" }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

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
              {sellers.map((seller) => (
                <li key={seller.id || seller.authorId || seller.name}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage || AuthorImage}
                        alt={seller.authorName || seller.name || "Seller"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.authorName || seller.name || "Unknown Seller"}
                    </Link>
                    <span>{seller.price ? `${seller.price} ETH` : "New seller"}</span>
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
