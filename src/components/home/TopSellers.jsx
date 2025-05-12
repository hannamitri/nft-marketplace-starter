import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopSellersLoading.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching top sellers:", error);
      } finally {
        setIsLoading(false);
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
              {isLoading && <li>Loading top sellers...</li>}
              {error && <li>Error: {error.message}</li>}
              {!isLoading && !error && sellers.length === 0 && (
                <li>No top sellers found.</li>
              )}
              {!isLoading &&
                !error &&
                sellers.map((seller) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;