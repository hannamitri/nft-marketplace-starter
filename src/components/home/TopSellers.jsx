import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";


const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTopSellers = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching top sellers", error);
      return null;
    }
  };
  useEffect(() => {
    const loadTopSellers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      const data = await fetchTopSellers();
      if (data) {
        setTopSellers(data);
        setLoading(false);
      }
    };
    loadTopSellers();
  }, []);
  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
      <li key={index} className="skeleton-wrapper">
        <div className="author_list_pp">
          <div className="skeleton skeleton-img-circle"></div>
        </div>
        <div className="author_list_info">
          <div className="skeleton skeleton-text name"></div>
          <div className="skeleton skeleton-text eth"></div>
        </div>
      </li>
    ));
  };
  
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
              {loading 
              ? renderSkeletons()
              : topSellers.map((topSeller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author?author=${topSeller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={topSeller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author?author=${topSeller.authorId}`}>{topSeller.authorName}</Link>
                    <span>{topSeller.price} ETH</span>
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
