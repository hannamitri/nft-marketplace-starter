import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./TopSellers.css";


const TopSellers = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      async function fetchCollections() {
        try {
          setLoading(true);
  
          const response = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
          );
  
          const data = await response.json();
  
          setCollections(data);
        } catch (error) {
          console.error("Error fetching collections:", error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchCollections();
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
  {loading
    ? Array(8)
        .fill(0)
        .map((_, index) => (
          <li key={index} className="author_list__skeleton">
            <div className="author_list_pp">
              <div className="skeleton skeleton__image"></div>
            </div>

            <div className="author_list_info">
              <div className="skeleton skeleton__name"></div>
              <div className="skeleton skeleton__price"></div>
            </div>
          </li>
        ))
    : collections.map((data, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <Link to="/author">
              <img
                className="lazy pp-author"
                src={data.authorImage}
                alt={data.authorName}
              />
              <i className="fa fa-check"></i>
            </Link>
          </div>

          <div className="author_list_info">
            <Link to="/author">{data.authorName}</Link>
            <span>{data.price} ETH</span>
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
