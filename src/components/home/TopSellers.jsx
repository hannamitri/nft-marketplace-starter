import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setSellers(response.data);
      } catch(error) {
        console.error("Error fetching top sellers:", error);
        setError("Unable to load top sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return(
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
              {loading && new Array(12).fill(0).map((_,index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton width="45px" height="45px" borderRadius="50%" />
                  </div>

                  <div className="author_list_info">
                    <Skeleton width="110px" height="16px" />
                    <br />
                    <Skeleton width="65px" height="14px" />
                  </div>
                </li>
              ))}

              {error && (
                <li className="text-center">
                  <p>{error}</p>
                </li>
              )}

              {!loading && !error && sellers.length === 0 && (
                <li className="text-center">
                  <p>No sellers available right now.</p>
                </li>
              )}

              {!loading && !error && sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`} title={`View ${seller.authorName}'s profile`}>
                      <img className="lazy pp-author" src={seller.authorImage} alt={seller.authorName} />
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