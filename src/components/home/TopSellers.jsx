import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const TopSellers = () => {
  // State to store fetched top sellers
  const [topSellers, setTopSellers] = useState([]);
  // State to manage loading and error status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      setIsLoading(true); // Start loading
      try {
        // Adjusted URL to the correct one for topSellers
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setTopSellers(response.data); // Assuming the API returns an array of top sellers
        setIsLoading(false); // Stop loading on success
      } catch (error) {
        console.error("Error fetching top sellers: ", error);
        setError(error); // Set error state
        setIsLoading(false); // Stop loading on error
      }
    };

    fetchTopSellers();
  }, []); // Dependency array left empty to run only once at component mount

  if (isLoading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error fetching data!</p>; // Error state

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
              {topSellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage} 
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
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
