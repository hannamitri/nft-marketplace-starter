import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletonStyle = {
    background:
      "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s ease infinite",
  };
  useEffect(() => {
    axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      });
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
            ? Array.from({ length: 12 }).map((_, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center" }}>
                <div className="author_list_pp">
                <div style={{ ...skeletonStyle, height: "50px", width: "50px", borderRadius: "50%", margin: "8px auto" }} />
                </div>
                <div className="author_list_info">
                 <div style={{ ...skeletonStyle, height: "21px", width: "128.7px", margin: "8px auto" }} />
                <div style={{ ...skeletonStyle, height: "16.7px", width: "50px", margin: "8px auto" }} />
              </div>
           </li>
          ))
          : items.map((seller) => (
          <li key={seller.id}>
          <div className="author_list_pp">
                <Link to="/author">
                  <img className="lazy pp-author" src={seller.authorImage} alt="" />
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
