import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TopSellers.css"; 

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setTimeout(() => setLoading(false), 500); // Delay for smoother skeleton
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
              {(loading ? Array.from({ length: 12 }) : sellers).map(
                (seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      {loading ? (
                        <div className="skeleton-circle" />
                      ) : (
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      )}
                    </div>

                    <div className="author_list_info">
                      {loading ? (
                        <>
                          <div className="skeleton-line short" />
                          <div className="skeleton-line thin" />
                        </>
                      ) : (
                        <>
                          <Link to={`/author/${seller.authorId}`}>
  <img src={seller.authorImage} alt={seller.authorName} />
</Link>
                          <span>{seller.price} ETH</span>
                        </>
                      )}
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
