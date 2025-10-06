import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers?t=${Date.now()}`
        );
        
        console.log("TopSellers API response:", response.data);
        
        // Process and enhance the seller data
        const processedSellers = response.data.map((seller, index) => ({
          id: seller.id || seller.authorId || index + 1,
          authorId: seller.authorId || seller.id,
          name: seller.authorName || seller.name || `Seller ${index + 1}`,
          authorName: seller.authorName || seller.name || `Seller ${index + 1}`,
          image: seller.authorImage || seller.image || seller.avatar || AuthorImage,
          authorImage: seller.authorImage || seller.image || seller.avatar || AuthorImage,
          price: seller.price || 0,
          totalSales: seller.price || seller.totalSales || seller.sales || 0,
          rank: index + 1
        }));
        
        setSellers(processedSellers);
        setError(null);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setError(error.message || "Failed to load top sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const SkeletonLoader = () => (
    <ol className="author_list">
      {new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
          </div>
          <div className="author_list_info">
            <Skeleton width="120px" height="16px" borderRadius="4px" />
            <Skeleton width="60px" height="14px" borderRadius="4px" />
          </div>
        </li>
      ))}
    </ol>
  );

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
              <SkeletonLoader />
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
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12 text-center" style={{ padding: "40px 0" }}>
              <div style={{ 
                background: "#f8f9fa", 
                padding: "20px", 
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <i className="fa fa-exclamation-triangle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Connection Issue</h4>
                <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up">
            <ol className="author_list">
              {sellers && sellers.length > 0 ? sellers.map((seller, index) => (
                <li key={seller.id || seller.authorId || index} data-aos="fade-up">
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.image || seller.authorImage || AuthorImage}
                        alt={seller.name || seller.authorName || 'Seller'}
                        onError={(e) => {
                          e.target.src = AuthorImage;
                        }}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.name || seller.authorName || 'Unknown Seller'}
                    </Link>
                    <span>{seller.totalSales || seller.price || 0} ETH</span>
                  </div>
                </li>
              )) : (
                <div className="col-md-12 text-center" style={{ padding: "40px 0" }}>
                  <div style={{ 
                    background: "#f8f9fa", 
                    padding: "20px", 
                    borderRadius: "8px",
                    border: "1px solid #e9ecef"
                  }}>
                    <i className="fa fa-info-circle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                    <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>No Sellers Found</h4>
                    <p style={{ color: "#6c757d", marginBottom: "16px" }}>Unable to load top sellers data.</p>
                  </div>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
