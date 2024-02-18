import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      setIsLoading(true); // Start loading before the request
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setTopSellers(response.data);
        setIsLoading(false); // Set loading to false after the data is fetched
      } catch (error) {
        console.error('Error fetching top sellers:', error);
        setError(error);
        setIsLoading(false); // Set loading to false also in case of error
      }
    };
  
    fetchTopSellers();
  }, []);

  if (error) return <p>Error fetching data!</p>;

  if (isLoading) return <SkeletonLoader />;

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

const SkeletonLoader = () => (
  <div className="shimmer_wrapper-topSeller"> {/* Ensure this matches the CSS class */}
    {Array.from({ length: 8 }).map((_, index) => (
      <div className="skeleton" key={index}>
        <div className="skeleton-circle shimmer"></div>
        <div className="skeleton-line shimmer" style={{ width: '70%', marginTop: '0.5rem' }}></div>
        <div className="skeleton-line shimmer" style={{ width: '60%', marginBottom: '0.5rem' }}></div>
      </div>
    ))}
  </div>
);

export default TopSellers;
