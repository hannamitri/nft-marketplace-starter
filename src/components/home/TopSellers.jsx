import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const TopSellers = () => {
  const [sellers, setSellers] = React.useState([]);

  React.useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }  
    };

    fetchSellers();
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

              {sellers.map((item) => (
                <li key={item.Id || item.authorId}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author" id={`${item.authorName}`}>
                      {item.authorName}
                    </Link>
                    <span>{item.price} ETH</span>
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
