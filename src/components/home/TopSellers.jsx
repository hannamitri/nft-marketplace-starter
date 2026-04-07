import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const TopSellers = () => {
const [sellers, setSellers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    .then((response) => {
      setTimeout(() => {
        setSellers(response.data);
        setLoading(false);
      }, 2000); // 
    })
    .catch((error) => {
      console.error(error);
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
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton-circle"></div>
                      </div>

                      <div className="author_list_info">
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text small"></div>
                      </div>
                    </li>
                  ))
                : sellers.slice(0, 12).map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
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
